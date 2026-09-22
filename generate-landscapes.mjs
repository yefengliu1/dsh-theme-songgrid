// 生成两张「宋律」极简山水背景 SVG（增强对比度版）。
// 山体更实、颜色更纯，仍保留留白与云雾层次。
import { writeFileSync, mkdirSync } from "node:fs";

const W = 1920, H = 1080;

function ridge(seed, baseY, amp) {
  const pts = [];
  const steps = 96;
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * W;
    const t = x / W;
    const y =
      baseY -
      amp *
        (0.55 +
          0.45 *
            Math.sin(t * 6.0 + seed * 2.1) *
            Math.sin(t * 11.0 + seed * 3.7) *
            (0.6 + 0.4 * Math.sin(t * 23.0 + seed)));
    pts.push([x, y]);
  }
  const sm = [];
  for (let i = 0; i < pts.length; i++) {
    const a = pts[Math.max(0, i - 1)], b = pts[i], c = pts[Math.min(pts.length - 1, i + 1)];
    sm.push([b[0], (a[1] + b[1] * 2 + c[1]) / 4]);
  }
  return sm;
}

function mountainPath(pts) {
  let d = `M ${pts[0][0]} ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) d += ` L ${pts[i][0]} ${pts[i][1].toFixed(1)}`;
  d += ` L ${W} ${H} L 0 ${H} Z`;
  return d;
}

function mist(cx, cy, rx, ry, color, opacity, blur) {
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${color}" fill-opacity="${opacity}" filter="url(#soft${blur})"/>`;
}

// 青绿山水（浅色）：石青/石绿，山体更实
function celadon() {
  const layers = [
    { baseY: 520, amp: 260, seed: 1.3, from: "#8FB4B8", op: 0.8 },
    { baseY: 640, amp: 300, seed: 2.7, from: "#5F949C", op: 0.85 },
    { baseY: 780, amp: 340, seed: 4.1, from: "#3E7A8C", op: 0.9 },
  ];
  let defs = `<filter id="soft40"><feGaussianBlur stdDeviation="40"/></filter><filter id="soft70"><feGaussianBlur stdDeviation="70"/></filter>`;
  for (let i = 0; i < layers.length; i++) {
    defs += `<linearGradient id="cg${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${layers[i].from}" stop-opacity="${layers[i].op}"/><stop offset="0.55" stop-color="${layers[i].from}" stop-opacity="${layers[i].op * 0.55}"/><stop offset="1" stop-color="${layers[i].from}" stop-opacity="0"/></linearGradient>`;
  }
  let body = "";
  body += mist(480, 460, 700, 90, "#FFFFFF", 0.32, 70);
  body += mist(1400, 400, 620, 80, "#FFFFFF", 0.28, 70);
  for (let i = 0; i < layers.length; i++) {
    const pts = ridge(layers[i].seed, layers[i].baseY, layers[i].amp);
    body += `<path d="${mountainPath(pts)}" fill="url(#cg${i})"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice"><defs>${defs}</defs>${body}</svg>`;
}

// 水墨山水（深色）：月下灰白层次，在深墨背景上清晰可辨
function ink() {
  const layers = [
    { baseY: 580, amp: 210, seed: 0.8, from: "#9A958A", op: 0.75 },
    { baseY: 710, amp: 270, seed: 2.2, from: "#6E6A5E", op: 0.8 },
    { baseY: 860, amp: 310, seed: 3.5, from: "#464238", op: 0.85 },
  ];
  let defs = `<filter id="soft40"><feGaussianBlur stdDeviation="40"/></filter><filter id="soft70"><feGaussianBlur stdDeviation="70"/></filter>`;
  for (let i = 0; i < layers.length; i++) {
    defs += `<linearGradient id="ik${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${layers[i].from}" stop-opacity="${layers[i].op}"/><stop offset="0.55" stop-color="${layers[i].from}" stop-opacity="${layers[i].op * 0.55}"/><stop offset="1" stop-color="${layers[i].from}" stop-opacity="0"/></linearGradient>`;
  }
  let body = "";
  body += mist(420, 500, 720, 100, "#E8E3D6", 0.08, 70);
  body += mist(1450, 430, 580, 90, "#E8E3D6", 0.07, 70);
  for (let i = 0; i < layers.length; i++) {
    const pts = ridge(layers[i].seed, layers[i].baseY, layers[i].amp);
    body += `<path d="${mountainPath(pts)}" fill="url(#ik${i})"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice"><defs>${defs}</defs>${body}</svg>`;
}

const dir = new URL("./assets/", import.meta.url);
mkdirSync(dir, { recursive: true });
const cel = celadon(), inkS = ink();
writeFileSync(new URL("celadon.svg", dir), cel);
writeFileSync(new URL("ink.svg", dir), inkS);
writeFileSync(new URL("celadon.uri.txt", dir), "data:image/svg+xml," + encodeURIComponent(cel));
writeFileSync(new URL("ink.uri.txt", dir), "data:image/svg+xml," + encodeURIComponent(inkS));
console.log("celadon dataURI:", Buffer.byteLength("data:image/svg+xml," + encodeURIComponent(cel)), "B");
console.log("ink dataURI:", Buffer.byteLength("data:image/svg+xml," + encodeURIComponent(inkS)), "B");
console.log("done");
