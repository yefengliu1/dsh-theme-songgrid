// 让聊天区主容器 _root_4qrvp_1 半透明，透出 frame 的山水背景。
import { readFileSync, writeFileSync } from "node:fs";

const clientPath = new URL("./lib/client.js", import.meta.url);
let src = readFileSync(clientPath, "utf8");

const start = src.indexOf("const BACKGROUND_CSS = `");
if (start === -1) throw new Error("BACKGROUND_CSS 未找到");
const end = src.indexOf("\n`;", start);
if (end === -1) throw new Error("BACKGROUND_CSS 结束未找到");

const insert = `

/* 聊天区主容器半透明，透出山水（消息气泡保持不透明） */
._root_4qrvp_1 {
  background: rgba(251, 250, 246, 0.82);
}
body[data-ds-dark-theme] ._root_4qrvp_1 {
  background: rgba(30, 28, 21, 0.82);
}`;

src = src.slice(0, end) + insert + src.slice(end);
writeFileSync(clientPath, src);
console.log("chat bg transparent OK, bytes:", Buffer.byteLength(src));
