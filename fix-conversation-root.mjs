// 修复对话区背景：删掉错修的 _root_4qrvp_1（代码块），改为 wSkVaW_root（对话区根容器）半透明。
import { readFileSync, writeFileSync } from "node:fs";

const clientPath = new URL("./lib/client.js", import.meta.url);
let src = readFileSync(clientPath, "utf8");

// 1. 删除错修的 _root_4qrvp_1 覆盖块
const wrong = `
/* 聊天区主容器半透明，透出山水（消息气泡保持不透明） */
._root_4qrvp_1 {
  background: rgba(251, 250, 246, 0.82);
}
body[data-ds-dark-theme] ._root_4qrvp_1 {
  background: rgba(30, 28, 21, 0.82);
}`;
if (!src.includes(wrong)) throw new Error("错修块未找到");
src = src.replace(wrong, "");

// 2. 在 BACKGROUND_CSS 末尾（`; 前）加入 wSkVaW_root 半透明覆盖
const start = src.indexOf("const BACKGROUND_CSS = `");
const end = src.indexOf("\n`;", start);
const insert = `

/* 对话区根容器半透明，透出山水（消息气泡保持不透明） */
.wSkVaW_root {
  background: rgba(247, 245, 239, 0.85);
}
body[data-ds-dark-theme] .wSkVaW_root {
  background: rgba(23, 21, 15, 0.85);
}`;
src = src.slice(0, end) + insert + src.slice(end);

writeFileSync(clientPath, src);
console.log("wSkVaW_root 修复 OK, bytes:", Buffer.byteLength(src));
