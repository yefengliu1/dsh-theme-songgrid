// 把新生成的山水 data URI 同步进 lib/client.js 的两条背景规则。
//
// 两条规则各管一个变体，**按选择器定位，不按出现顺序**：
//   · 夜墨 → html[data-songgrid-theme="on"] body::before
//   · 宣纸 → html[data-songgrid-theme="on"] body:not([data-ds-dark-theme])::before
//
// 历史：上一版按「先浅后深」的顺序替换，且正则写的是 `background-image: url(...)`。
// 伪元素那一版把背景改成「scrim 渐变 + url」两层之后，两处都对不上了 ——
// 正则命中 0 处、顺序也反了（文件里夜墨在前），脚本会直接抛错或换错图。
// 所以现在：选择器锚点 + 每块必须恰好命中 1 个 url + 数量不符立刻报错。

import { readFileSync, writeFileSync } from "node:fs";

const base = new URL("./", import.meta.url);
const clientPath = new URL("./lib/client.js", base);
const celadon = readFileSync(new URL("./assets/celadon.uri.txt", base), "utf8").trim();
const inkNight = readFileSync(new URL("./assets/ink-night.uri.txt", base), "utf8").trim();

/** 取出以 selector 开头的那条规则块（到最近的 `\n}` 为止）。 */
function ruleBlock(src, selector) {
	const start = src.indexOf(selector);
	if (start < 0) throw new Error(`找不到规则：${selector}`);
	const end = src.indexOf("\n}", start);
	if (end < 0) throw new Error(`规则没有闭合：${selector}`);
	return { start, end: end + 2, text: src.slice(start, end + 2) };
}

/** 把一块规则里唯一的 data-uri url 换成 next，返回新的整块文本。 */
function swapUrl(block, next, label) {
	const hits = [...block.matchAll(/url\("(data:image\/svg\+xml,[^"]*)"\)/g)];
	if (hits.length !== 1) {
		throw new Error(`${label}：期望恰好 1 个 data-uri 背景，实际 ${hits.length} 个`);
	}
	return block.replace(hits[0][0], `url("${next}")`);
}

let src = readFileSync(clientPath, "utf8");

// 锚点自检：两条规则各自的 scrim 色不同，写错顺序会立刻暴露
const night = ruleBlock(src, 'html[data-songgrid-theme="on"] body::before {');
const paper = ruleBlock(src, 'html[data-songgrid-theme="on"] body:not([data-ds-dark-theme])::before {');
if (!night.text.includes("rgba(10, 14, 19")) throw new Error("夜墨规则里没找到墨色 scrim，结构可能变了");
if (!paper.text.includes("rgba(250, 248, 242")) throw new Error("宣纸规则里没找到宣纸 scrim，结构可能变了");

const nightText = swapUrl(night.text, inkNight, "夜墨");
const paperText = swapUrl(paper.text, celadon, "宣纸");

// 先替换靠后的那块，避免前面的长度变化影响后面的下标
const edits = [
	{ ...night, text: nightText },
	{ ...paper, text: paperText },
].sort((a, b) => b.start - a.start);
for (const e of edits) src = src.slice(0, e.start) + e.text + src.slice(e.end);

writeFileSync(clientPath, src);
console.log(
	`ok  replace-uris: 夜墨 ${Buffer.byteLength(inkNight)}B · 宣纸 ${Buffer.byteLength(celadon)}B`,
);
