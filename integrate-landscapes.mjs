// 用增强版山水 data URI 替换 client.js 里的旧背景，并调整 bg-base/sidebar-fill 透明度。
import { readFileSync, writeFileSync } from "node:fs";

const base = new URL("./", import.meta.url);
const clientPath = new URL("./lib/client.js", base);
const cel = readFileSync(new URL("./assets/celadon.uri.txt", base), "utf8").trim();
const ink = readFileSync(new URL("./assets/ink.uri.txt", base), "utf8").trim();

let src = readFileSync(clientPath, "utf8");

// 1. 删除旧 BACKGROUND_CSS 块（// ---- 山水背景 CSS ---- 到 "`;"）
const blockRe = /[ \t]*\/\/ ---- 山水背景 CSS ----[\s\S]*?\n`;\n/;
if (!blockRe.test(src)) throw new Error("旧背景块未找到");
src = src.replace(blockRe, "");

// 2. 注入新 BACKGROUND_CSS（增强版山水）
const newBlock = `\t\t// ---- 山水背景 CSS（增强对比度版）----
\t\tconst BACKGROUND_CSS = \`
/* 宋律 Songgrid 山水背景层：浅色=青绿山水，深色=水墨山水 */
body {
  background-image: url("${cel}");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
body[data-ds-dark-theme] {
  background-image: url("${ink}");
}
\`;\n`;
// 在 function injectStyles 前插入
src = src.replace("\n\t\tfunction injectStyles(", newBlock + "\n\t\tfunction injectStyles(");

// 3. 调整透明度（山水更明显透出）
const re = [
  ['"--dsw-alias-bg-base": "rgba(247, 245, 239, 0.88)"', '"--dsw-alias-bg-base": "rgba(247, 245, 239, 0.78)"'],
  ['"--dsw-specific-sidebar-fill": "rgba(242, 239, 231, 0.78)"', '"--dsw-specific-sidebar-fill": "rgba(242, 239, 231, 0.66)"'],
  ['"--dsw-alias-bg-base": "rgba(23, 21, 15, 0.88)"', '"--dsw-alias-bg-base": "rgba(23, 21, 15, 0.80)"'],
  ['"--dsw-specific-sidebar-fill": "rgba(30, 28, 21, 0.80)"', '"--dsw-specific-sidebar-fill": "rgba(30, 28, 21, 0.70)"'],
];
for (const [from, to] of re) {
  if (!src.includes(from)) throw new Error("token 未找到: " + from);
  src = src.replace(from, to);
}

writeFileSync(clientPath, src);
console.log("reintegrated OK, client.js bytes:", Buffer.byteLength(src));
