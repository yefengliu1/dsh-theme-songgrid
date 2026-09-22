// 把山水背景的选择器从 body 改为主框架 .pI_x6G_frame（body 被它 100% 遮住）。
import { readFileSync, writeFileSync } from "node:fs";

const clientPath = new URL("./lib/client.js", import.meta.url);
let src = readFileSync(clientPath, "utf8");

const before = src;

// 1. 浅色背景选择器：body -> .pI_x6G_frame
src = src.replace(
  "body {\n  background-image: url(\"data:image/svg+xml,",
  ".pI_x6G_frame {\n  background-image: url(\"data:image/svg+xml,"
);

// 2. 深色背景选择器：body[data-ds-dark-theme] -> body[data-ds-dark-theme] .pI_x6G_frame
src = src.replace(
  "body[data-ds-dark-theme] {\n  background-image: url(\"data:image/svg+xml,",
  "body[data-ds-dark-theme] .pI_x6G_frame {\n  background-image: url(\"data:image/svg+xml,"
);

// 3. background-attachment: fixed 改为默认（frame 是滚动容器，fixed 无益）
src = src.replace("  background-attachment: fixed;\n", "");

if (src === before) throw new Error("未发生替换，选择器可能已变化");
writeFileSync(clientPath, src);
console.log("selector fixed OK, bytes:", Buffer.byteLength(src));
