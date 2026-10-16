/**
 * 主题契约测试 —— 把「今天修过的三类失败」变成可执行断言。
 *
 * 为什么需要（2026-10-16，同一个插件一天里被三类问题咬了三次）：
 *   1. 持久化链断：`Config` 少了 `.volatile()` → settings 根本不服务这个命名空间，
 *      选择只能落 localStorage；命名空间名还一度写成自造的 "songgrid"，而宿主按
 *      **条目 id** 服务（`song-grid-theme`）。两个错都静默 —— 界面照常能点。
 *   2. 文字太暗：宿主把正文/工具/时间戳/占位符都画在 `label-tertiary` 上，
 *      而夜墨把它压到 4.0:1、宣纸压到 3.35:1。
 *   3. 侧栏不透明 / 半应用态：侧栏填充接近全不透明，且山水背景**无条件注入** ——
 *      主题没选中时只剩背景没有配色。
 *
 * 这些都不是"逻辑错"，是**数值与契约**错，所以能被断言住。改动视觉/配色前先跑它。
 *
 * 跑法：node tests/contract.mjs
 */
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const repo = process.env.THEME_ROOT ?? join(here, "..");   // 可指向副本，供 mutation 验证
const CLIENT = readFileSync(join(repo, "lib", "client.js"), "utf8");
const INDEX = readFileSync(join(repo, "lib", "index.js"), "utf8");
const PATCH = readFileSync(join(repo, "cordis.patch.yml"), "utf8");

let failures = 0;
let checks = 0;
function check(name, ok, detail = "") {
	checks += 1;
	if (ok) { console.log("  ✓ " + name); return; }
	failures += 1;
	console.log("  ✗ " + name + (detail ? "  —— " + detail : ""));
}
function section(t) { console.log("\n" + t); }

// ---- WCAG ----------------------------------------------------------------
const channel = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
const luminance = (rgb) => 0.2126 * channel(rgb[0]) + 0.7152 * channel(rgb[1]) + 0.0722 * channel(rgb[2]);
function parseColor(value) {
	const hex = /^#([0-9a-f]{6})$/i.exec(value.trim());
	if (hex !== null) {
		const n = parseInt(hex[1], 16);
		return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
	}
	const rgba = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i.exec(value);
	if (rgba !== null) return [Number(rgba[1]), Number(rgba[2]), Number(rgba[3])];
	return undefined;
}
function contrast(a, b) {
	const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m);
	return (x + 0.05) / (y + 0.05);
}
/** 取调色板里的一个 token（区域已切成浅/深两段，同名 token 不会串）。 */
function token(region, name) {
	const m = new RegExp('"' + name + '":\\s*"([^"]+)"').exec(region);
	return m === null ? undefined : m[1];
}

const darkAt = CLIENT.indexOf("const dark = Object.freeze(");
const LIGHT_REGION = CLIENT.slice(0, darkAt);
const DARK_REGION = CLIENT.slice(darkAt);
check("切出浅色 / 深色两段调色板（切点存在）", darkAt > 0);

// ---- 1. 持久化链 ---------------------------------------------------------
section("1 持久化链（选择能不能落服务端 / 跨浏览器）");
{
	// 1a 命名空间名必须等于 cordis.patch.yml 里的条目 id（宿主按条目 id 服务）
	const entryId = /id:\s*([A-Za-z0-9_-]+)/.exec(PATCH)?.[1];
	const nsConst = /const THEMES_NAMESPACE = "([^"]+)"/.exec(CLIENT)?.[1];
	check("cordis.patch.yml 里有条目 id", entryId !== undefined, PATCH.trim().split("\n").pop());
	check("客户端命名空间 = 条目 id（宿主按条目 id 服务）",
		entryId !== undefined && nsConst === entryId, `namespace=${nsConst} entryId=${entryId}`);

	// 1b 宿主面必须声明 Config，且至少一个字段标 .volatile()
	check("宿主面 export const Config", /export const Config = z\.object\(/.test(INDEX));
	check("Config 的 theme 字段标了 .volatile()（否则 settings 不服务该命名空间）",
		/z\.string\(\)\.default\("system"\)\.volatile\(\)/.test(INDEX), "见 dsh-settings 的 volatileForm()");

	// 1c 不得再用 0.1.x 的运行时注册（rc.2 上登记不进去）
	check("宿主面不再调用运行时 settings.register(...)",
		!/settingsCtx\.settings\.register\(|settings\.register\(THEMES_NAMESPACE/.test(INDEX));
	check("宿主面声明了「不要自动生成设置页」", /configure\(\{\s*auto:\s*false\s*\}/.test(INDEX));
}

// ---- 2. 文字对比度 -------------------------------------------------------
section("2 文字对比度（宿主把正文画在 tertiary 上）");
for (const [label, region] of [["宣纸(浅)", LIGHT_REGION], ["夜墨(深)", DARK_REGION]]) {
	const bg = parseColor(token(region, "--dsw-alias-bg-base") ?? "");
	check(`${label}: 取到 bg-base`, bg !== undefined, token(region, "--dsw-alias-bg-base"));
	for (const [tier, min] of [["primary", 7], ["secondary", 6], ["tertiary", 4.5], ["caption", 4.5]]) {
		const value = token(region, "--dsw-alias-label-" + tier);
		const fg = parseColor(value ?? "");
		const ratio = fg === undefined || bg === undefined ? 0 : contrast(fg, bg);
		check(`${label}: ${tier} ≥ ${min}:1`, ratio >= min, `${value} → ${ratio.toFixed(2)}:1`);
	}
}

// ---- 3. 表面透明度 / 半应用态 -------------------------------------------
section("3 侧栏与对话区必须透（不然看不到山水）");
// 深浅阈值不同是有意的：深色场景本身很暗，填充再靠近 0.7 在真机上就读成"不透明侧栏"
// （用户原话）。0.65 是"还看得见山水"的上限，别为了省事把两边都放到 0.7。
for (const [label, region, maxAlpha] of [["宣纸(浅)", LIGHT_REGION, 0.70], ["夜墨(深)", DARK_REGION, 0.65]]) {
	const fill = token(region, "--dsw-specific-sidebar-fill");
	const alpha = fill === undefined ? 1 : Number(/rgba\([^)]*,\s*([\d.]+)\s*\)/.exec(fill)?.[1] ?? 1);
	check(`${label}: sidebar-fill 透明度 ≤ ${maxAlpha}`, alpha <= maxAlpha, fill);
}
{
	const conv = [...CLIENT.matchAll(/background:\s*rgba\([^)]*?([\d.]+)\)\s*!important/g)].map((m) => Number(m[1]));
	check("对话区根容器仍是半透明（< 0.9）", conv.length >= 2 && conv.every((a) => a < 0.9), JSON.stringify(conv));

	// 背景层与排版/强调层都必须挂在「宋律开着」这个开关下 —— 否则就是半应用态
	const bgBlock = CLIENT.slice(CLIENT.indexOf("const BACKGROUND_CSS"), CLIENT.indexOf("function injectStyles"));
	const gated = (bgBlock.match(/html\[data-songgrid-theme="on"\]/g) ?? []).length;
	check("背景层 4 条选择器全部挂在 html[data-songgrid-theme=on] 下", gated >= 4, `找到 ${gated} 处`);
	check("客户端会切换该开关", /dataset\.songgridTheme\s*=\s*"on"/.test(CLIENT) && /delete document\.documentElement\.dataset\.songgridTheme/.test(CLIENT));
	check("排版层（正文宋体）也在开关下", /html\[data-songgrid-theme="on"\] body \{/.test(CLIENT));
	check("引用块强调也在开关下", /html\[data-songgrid-theme="on"\] \[class\*="_markdown_"\] blockquote/.test(CLIENT));
}

// ---- 4. 选择来源优先级 ---------------------------------------------------
section("4 选择来源（本地优先，服务端兜底，失败不静默）");
{
	check("写选择时同时写 localStorage", /const writeLocal = \(value\) =>/.test(CLIENT) && /writeLocal\(localValue\)/.test(CLIENT));
	check("恢复时本地值优先于服务端值", /const local = readLocal\(\);\s*\n\s*if \(local !== void 0\)/.test(CLIENT));
	check("写入失败不静默（有 console.warn 分支）", (CLIENT.match(/console\.warn\("\[songgrid\]/g) ?? []).length >= 2);
	// 回归守卫：theme/change 不得把「当前方案」回写成变体记忆 —— 否则启动时会抢占
	// 用户记住的变体（实测：写入 xuanzhi 刷新后被写成 yemo，界面停在深色）。
	check("theme/change 不回写变体记忆（防启动抢占）", !/writeLocal\(variant\)/.test(CLIENT));
	check("恢复时只在「跟随系统」下才替官方偏好决定方案", /current\.preference === "system"/.test(CLIENT));
	check("README(zh) 写清了入口要求", /localhost/.test(readFileSync(join(repo, "README.zh.md"), "utf8")));
	check("README(en) 写清了入口要求", /localhost/.test(readFileSync(join(repo, "README.md"), "utf8")));
}

// ---- 5. 资产齐全 ---------------------------------------------------------
section("5 构建资产齐全（背景 data URI 与生成器一致）");
{
	for (const f of ["assets/celadon.uri.txt", "assets/ink-night.uri.txt"]) {
		check(`${f} 存在`, existsSync(join(repo, f)));
	}
	const ink = readFileSync(join(repo, "assets", "ink-night.uri.txt"), "utf8").trim();
	check("client.js 内嵌的是 ink-night（远山孤舟明月），不是历史遗留的 ink",
		CLIENT.includes(ink), "跑 node replace-uris.mjs 重新注入");
}

console.log(failures === 0 ? `\ntheme contract: 全部通过（${checks} 项）` : `\ntheme contract: ${failures}/${checks} 项失败`);
process.exit(failures === 0 ? 0 : 1);
