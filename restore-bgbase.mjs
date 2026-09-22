// 恢复 bg-base 不透明（山水已直接在主框架上），侧边栏保持半透明透出山水。
import { readFileSync, writeFileSync } from "node:fs";

const clientPath = new URL("./lib/client.js", import.meta.url);
let src = readFileSync(clientPath, "utf8");

const re = [
  ['"--dsw-alias-bg-base": "rgba(247, 245, 239, 0.78)"', '"--dsw-alias-bg-base": "#F7F5EF"'],
  ['"--dsw-alias-bg-base": "rgba(23, 21, 15, 0.80)"', '"--dsw-alias-bg-base": "#17150F"'],
];
for (const [from, to] of re) {
  if (!src.includes(from)) throw new Error("token 未找到: " + from);
  src = src.replace(from, to);
}

writeFileSync(clientPath, src);
console.log("bg-base restored OK");
