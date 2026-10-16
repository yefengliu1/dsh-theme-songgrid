// 用新生成的山水 data URI 替换 client.js 里的两个背景 url（浅色+深色）。
// 深色槽用 ink-night（远山孤舟明月），不是 ink（去饱和的浅色山水）——
// 后者只是历史遗留，client.js 自 0.1.0 起浅色槽 = celadon、深色槽 = ink-night。
import { readFileSync, writeFileSync } from "node:fs";

const base = new URL("./", import.meta.url);
const clientPath = new URL("./lib/client.js", base);
const cel = readFileSync(new URL("./assets/celadon.uri.txt", base), "utf8").trim();
const ink = readFileSync(new URL("./assets/ink-night.uri.txt", base), "utf8").trim();

let src = readFileSync(clientPath, "utf8");

// 替换两个 background-image url（按出现顺序：先浅色青绿，后深色夜墨）
const urls = [...src.matchAll(/background-image: url\("(data:image\/svg\+xml,[^"]*)"\)/g)];
if (urls.length < 2) throw new Error("未找到两个背景 url，实际: " + urls.length);

src = src.replace(urls[0][1], cel);
src = src.replace(urls[1][1], ink);

writeFileSync(clientPath, src);
console.log("data URIs replaced OK, bytes:", Buffer.byteLength(src));
