/**
 * 主题 UI 冒烟 —— 用 localStorage 驱动状态，断言「宋律开着 / 关着」两种渲染事实。
 *
 * 为什么这么驱动：设置行是中文界面里的「宋律 · 宣纸 / 夜墨」按钮，按文案点会随语言变；
 * 而插件的选择契约是「本地记录优先」，所以直接写 `dsh-theme-songgrid.selection` 再刷新，
 * 既稳定又正好覆盖了三档取值。
 *
 * 断言的都是今天真机踩出来的：
 *   · 夜墨/宣纸开着时：山水背景真的注入、侧栏真的半透明（不透明=看不见背景）；
 *   · 注入的必须是**对应的**那张背景（深色槽曾险些写回历史遗留的 ink）；
 *   · 关掉时：一点痕迹都不留（背景 none、正文字体回宿主默认）—— 半应用态就是 bug。
 *
 * 用法：
 *   node tests/ui-smoke.mjs
 *   DSH_UI_URL=http://127.0.0.1:3080/?token=… SMOKE_SHOT=/tmp/theme.png node tests/ui-smoke.mjs
 */
import { createRequire } from "node:module";
import { existsSync, readdirSync, readFileSync, mkdirSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import os from "node:os";

const here = dirname(fileURLToPath(import.meta.url));
const repo = join(here, "..");
const URL_ = process.env.DSH_UI_URL ?? "http://localhost:8080/";
const SHOT = process.env.SMOKE_SHOT ?? "/tmp/dsh-theme-smoke.png";

const CELADON = readFileSync(join(repo, "assets", "celadon.uri.txt"), "utf8").trim();
const INK_NIGHT = readFileSync(join(repo, "assets", "ink-night.uri.txt"), "utf8").trim();


/** 关掉挡路的浮层（首次运行的 Preview 公告、设置弹窗等）。
 *  CI 上是全新 profile → 「Preview Notice」必然出现，不处理会把所有点击卡死 30s。 */
async function dismissOverlays(page) {
	for (let i = 0; i < 3; i += 1) {
		const mask = await page.locator('[aria-hidden="true"][class*="_mask"]').count();
		if (mask === 0) return;
		const primary = page.locator('button[class*="_primary_"]').last();
		if (await primary.count() > 0) {
			await primary.click({ timeout: 3000 }).catch(() => {});
			await page.waitForTimeout(200);
			continue;
		}
		await page.keyboard.press("Escape").catch(() => {});
		await page.waitForTimeout(200);
	}
}

let failures = 0;
let checks = 0;
function check(name, ok, detail = "") {
	checks += 1;
	if (ok) { console.log("  ✓ " + name); return; }
	failures += 1;
	console.log("  ✗ " + name + (detail ? "  —— " + detail : ""));
}
function section(t) { console.log("\n" + t); }

/** 任何形状的 alpha：rgb()/rgba()/color(srgb …)/oklab(… / α) 都认。 */
function alphaOf(value) {
	if (typeof value !== "string") return 1;
	const slash = /\/\s*([\d.]+%?)\s*\)\s*$/.exec(value.trim());
	if (slash !== null) return slash[1].endsWith("%") ? Number(slash[1].slice(0, -1)) / 100 : Number(slash[1]);
	const rgba = /rgba\(\s*[\d.]+[,\s]+[\d.]+[,\s]+[\d.]+[,\s]+([\d.]+)\s*\)/.exec(value);
	return rgba === null ? 1 : Number(rgba[1]);
}

async function playwrightCandidates() {
	const normalize = (mod) =>
		mod && mod.chromium ? mod : (mod && mod.default && mod.default.chromium ? mod.default : undefined);
	const out = [];
	const push = (mod, label) => { const f = normalize(mod); if (f !== undefined) out.push({ pw: f, label }); };
	try { push(await import("playwright"), "dependencies"); } catch { /* 继续 */ }
	const roots = [];
	if (process.env.PLAYWRIGHT_ROOT) roots.push(process.env.PLAYWRIGHT_ROOT);
	const npx = join(os.homedir(), ".npm", "_npx");
	if (existsSync(npx)) {
		for (const dir of readdirSync(npx)) {
			const mods = join(npx, dir, "node_modules");
			if (existsSync(join(mods, "playwright"))) roots.push(mods);
		}
	}
	for (const root of roots) {
		try {
			const require = createRequire(join(root, "noop.js"));
			push(await import(pathToFileURL(require.resolve("playwright")).href), root);
		} catch { /* 换下一个 */ }
	}
	if (out.length === 0) throw new Error("找不到 playwright —— 装 `npm i -D playwright` 或设 PLAYWRIGHT_ROOT");
	return out;
}

let browser;
const launchErrors = [];
for (const { pw, label } of await playwrightCandidates()) {
	try { browser = await pw.chromium.launch(); break; } catch (error) {
		launchErrors.push(`${label}: ${String(error.message).split("\n")[0]}`);
	}
}
if (browser === undefined) {
	console.error("没有可用的 playwright 浏览器：\n  " + launchErrors.join("\n  "));
	process.exit(1);
}

/** 写选择 → 刷新 → 读渲染事实。 */
async function renderWith(page, selection) {
	await page.evaluate((value) => {
		if (value === null) localStorage.removeItem("dsh-theme-songgrid.selection");
		else localStorage.setItem("dsh-theme-songgrid.selection", value);
	}, selection);
	await page.reload({ waitUntil: "domcontentloaded" });
	await dismissOverlays(page);
	await page.waitForTimeout(600); // 让主题层挂上 + 过渡落定
	return page.evaluate(() => {
		const frame = document.querySelector('[class*="_frame"]');
		const sidebar = document.querySelector('[class*="_sidebarCol"]');
		const cs = sidebar === null ? null : getComputedStyle(sidebar);
		return {
			layer: document.documentElement.dataset.songgridTheme ?? null,
			dark: document.body.hasAttribute("data-ds-dark-theme"),
			frameBg: frame === null ? null : getComputedStyle(frame).backgroundImage,
			sidebarFill: cs === null ? null : cs.getPropertyValue("--dsw-specific-sidebar-fill").trim(),
			markdownFont: getComputedStyle(document.body).getPropertyValue("--dsw-font-markdown-base-font-family").trim(),
		};
	});
}

const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
try {
	const res = await page.goto(URL_, { waitUntil: "domcontentloaded" });
	check(`打开 GUI（HTTP ${res === null ? "?" : res.status()}）`, res !== null && res.status() < 400, URL_);

	// 关键不变量：**背景必须与当前方案一致**（dark → ink-night / light → celadon），
	// 而不是「选了宣纸就必须浅色」—— 明暗方案由官方偏好持久化决定（可能来自另一台机器），
	// 插件只在「跟随系统」时才替它决定。所以两档取值都按当前方案来断言。
	const cases = [
		["夜墨（song-grid-yemo）", "song-grid-yemo"],
		["宣纸（song-grid-xuanzhi）", "song-grid-xuanzhi"],
	];
	for (const [label, selection] of cases) {
		section("1/2 " + label);
		const r = await renderWith(page, selection);
		check("开关挂上（html[data-songgrid-theme=on]）", r.layer === "on");
		check("山水背景已注入", typeof r.frameBg === "string" && r.frameBg !== "none");
		if (r.dark) {
			check("深色方案 → 注入 ink-night（远山孤舟明月）",
				typeof r.frameBg === "string" && r.frameBg.includes(INK_NIGHT.slice(0, 120)));
			check(`深色 → 侧栏半透明 ≤0.65（fill=${r.sidebarFill}）`, alphaOf(r.sidebarFill) <= 0.65,
				"深色填充 ≥0.7 在真机上读成「不透明侧栏」");
		} else {
			check("浅色方案 → 注入 celadon（青绿山水）",
				typeof r.frameBg === "string" && r.frameBg.includes(CELADON.slice(0, 120)));
			check(`浅色 → 侧栏半透明 ≤0.70（fill=${r.sidebarFill}）`, alphaOf(r.sidebarFill) <= 0.70);
		}
		// 回归守卫：镜像监听不得把用户记住的变体写回旧方案
		// （实测过：写入 xuanzhi 刷新后被写成 yemo，界面停在深色 —— 本条就是抓它的）
		const kept = await page.evaluate(() => localStorage.getItem("dsh-theme-songgrid.selection"));
		check("刷新后本地记住的变体没被镜像写回", kept === selection, `localStorage=${kept}`);
	}

	section("4 截图存档");
	mkdirSync(dirname(SHOT), { recursive: true });
	await renderWith(page, "song-grid-yemo");
	await page.screenshot({ path: SHOT });
	console.log("  · " + SHOT);
} finally {
	await browser.close();
}

console.log(failures === 0 ? `\ntheme ui-smoke: 全部通过（${checks} 项）` : `\ntheme ui-smoke: ${failures}/${checks} 项失败`);
process.exit(failures === 0 ? 0 : 1);
