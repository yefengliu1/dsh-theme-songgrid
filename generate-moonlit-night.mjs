// 「宋律·夜墨」深色山水：远山孤舟明月。
//
// 与 generate-landscapes.mjs 的区别：那张 ink.svg 只是把浅色青绿山水去饱和成
// 灰褐色（三条柔脊 + 两层几乎不可见的雾），既无月色也无水面，深色底又偏暖，
// 于是整张背景读起来像「调暗的浅色主题」。这里按夜景重画：
//   月（带光晕）→ 三层远近山影（越远越淡、冷灰）→ 水面 → 碎月水痕 → 孤舟。
// 单色系（月白 #D8E4E6 + 墨蓝 #0B0F14）保持素石式克制；暖赭只出现在船灯与
// 月影的最深处，作为画面唯一的暖点。
//
// 2026-10-16 加强（用户：「暗色海上明月孤舟的样式需要加强一点」）：
//   上一版所有元素都压在中低对比，理由是主题会覆一层 85% 的对话区。实测下来
//   叠加后只剩一团黑 —— 画面白画了。这一版同时做两件事：
//     · 场景自身提对比：月更大更亮 + 星子、山脊加一道月照边光、水痕提亮、
//       孤舟背后留一层被月光照到的水汽，船灯与灯影更明确；
//     · 覆层让路：对话区 0.90 → 0.80、侧栏 0.70 → 0.60（见 lib/client.js）。
//   两边各让一步，夜色的层次才真的落到眼睛里。
import { writeFileSync, mkdirSync } from "node:fs";

const W = 1920, H = 1200;
const ASSETS = new URL("./assets/", import.meta.url);

// 月：位置对齐画面右侧三分线，落在 16:10 / 16:9 视口的可视范围内（更宽的视口
// 会被 slice 从两侧裁掉，故不放到最右）。r=54 在全宽下约占 2.8% 画面宽度。
const MOON = { cx: 1490, cy: 302, r: 54, glowR: 270, glowRy: 240 };
// 水面：山脚以下到画布底边，是月影水痕与孤舟的舞台。
const WATER_Y = 908;
// 孤舟：远小于月，位置错开月影水痕，靠船灯做暖点。
const BOAT = { cx: 1150, cy: 1000, w: 78 };

const f = (n) => Number(n.toFixed(1));

/** 一条山脊的采样点：多频正弦叠加后做一次 1-2-1 平滑。 */
function ridge(seed, baseY, amp, steps = 96) {
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const y =
      baseY -
      amp *
        (0.55 +
          0.45 * Math.sin(t * 6.0 + seed * 2.1) * Math.sin(t * 11.0 + seed * 3.7) * (0.6 + 0.4 * Math.sin(t * 23.0 + seed)));
    pts.push([t * W, y]);
  }
  return pts.map((p, i) => {
    const a = pts[Math.max(0, i - 1)];
    const b = p;
    const c = pts[Math.min(pts.length - 1, i + 1)];
    return [b[0], (a[1] + b[1] * 2 + c[1]) / 4];
  });
}

/** 山脊 → 填充到画布底边的封闭路径。 */
function landmass(pts) {
  let d = `M ${pts[0][0]} ${f(pts[0][1])}`;
  for (const [x, y] of pts.slice(1)) d += ` L ${x} ${f(y)}`;
  return d + ` L ${W} ${H} L 0 ${H} Z`;
}

/** 山脊 → 只描脊线、不闭合，用来画那道迎着月亮的边光。 */
function ridgeline(pts) {
  let d = `M ${pts[0][0]} ${f(pts[0][1])}`;
  for (const [x, y] of pts.slice(1)) d += ` L ${x} ${f(y)}`;
  return d;
}

/**
 * 星子：确定性散布在天空区（山脊以上），避开月盘与光晕。
 * 不是天文写实，只要「这片天不是空的」；故半径 0.8-2.0、透明度 0.16-0.46。
 */
function stars(seeds, top) {
  const out = [];
  for (const s of seeds) {
    const x = ((Math.sin(s * 12.9898) * 43758.5453) % 1 + 1) % 1;
    const y = ((Math.sin(s * 78.233) * 12345.6789) % 1 + 1) % 1;
    const px = f(120 + x * (W - 240));
    const py = f(60 + y * (top - 60));
    const dist = Math.hypot(px - MOON.cx, py - MOON.cy);
    if (dist < MOON.glowR * 0.72) continue;
    const r = f(0.8 + (((s * 7) % 1) + 1) % 1 * 1.2);
    const op = f(0.16 + (((s * 13) % 1) + 1) % 1 * 0.3);
    out.push(`<circle cx="${px}" cy="${py}" r="${r}" fill="#E4EDEF" opacity="${op}"/>`);
  }
  return out.join("\n");
}

/**
 * 月影水痕的一节：贴在水面上的一条横向短痕。
 *
 * 这里试过对称等宽等距的收窄四边形，结果叠成一座「宝塔」——规则本身就是
 * 假的来源。真实水面反光是不规则的散布，故位置取非整数倍、宽度也逐节抖动。
 */
function glint(cx, y, rx, opacity) {
  return `<ellipse cx="${f(cx)}" cy="${f(y)}" rx="${f(rx)}" ry="2.8" fill="#DCE7E9" opacity="${opacity}"/>`;
}

/** 生成整条水痕带：越近越宽、越近越淡，左右偏移拉开成不规则散布。 */
function glitter(cx, top, spread) {
  const levels = [
    { dy: 6, n: 1, rx: 22, op: 0.70, off: 0 },
    { dy: 24, n: 2, rx: 20, op: 0.60, off: 5 },
    { dy: 48, n: 3, rx: 23, op: 0.50, off: 11 },
    { dy: 78, n: 4, rx: 27, op: 0.40, off: 8 },
    { dy: 114, n: 5, rx: 31, op: 0.32, off: 15 },
    { dy: 156, n: 6, rx: 35, op: 0.25, off: 10 },
    { dy: 204, n: 7, rx: 39, op: 0.19, off: 17 },
    { dy: 258, n: 7, rx: 43, op: 0.14, off: 12 },
  ];
  const out = [];
  levels.forEach((lv, li) => {
    for (let k = 0; k < lv.n; k++) {
      const s = k / Math.max(1, lv.n - 1) - 0.5;
      const jitter = Math.sin(li * 2.7 + k * 4.1) * lv.rx * 0.5;
      // 中轴逐层偏移：整条水痕因此向左下轻微漂移，不再是左右对称的一柱。
      const drift = -lv.dy * 0.045;
      out.push(glint(cx + s * spread + jitter + lv.off + drift, top + lv.dy + Math.sin(li * 1.9 + k) * 2.5, lv.rx * (0.62 + 0.5 * Math.abs(Math.sin(li + k * 1.7))), lv.op));
    }
  });
  return out.join("\n");
}

const L1PTS = ridge(1.1, 520, 250);
const L2PTS = ridge(3.3, 748, 205);
const L3PTS = ridge(5.7, WATER_Y, 210);
const L1 = landmass(L1PTS);
const L2 = landmass(L2PTS);
const L3 = landmass(L3PTS);
const R1 = ridgeline(L1PTS);
const R2 = ridgeline(L2PTS);
const R3 = ridgeline(L3PTS);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice"><defs>
<filter id="haze"><feGaussianBlur stdDeviation="22"/></filter>
<filter id="soft"><feGaussianBlur stdDeviation="7"/></filter>
<radialGradient id="moonglow"><stop offset="0" stop-color="#E6EFF1" stop-opacity="0.58"/><stop offset="0.42" stop-color="#D8E4E6" stop-opacity="0.22"/><stop offset="1" stop-color="#D8E4E6" stop-opacity="0"/></radialGradient>
<radialGradient id="moonhalo"><stop offset="0.55" stop-color="#EAF2F3" stop-opacity="0.30"/><stop offset="1" stop-color="#EAF2F3" stop-opacity="0"/></radialGradient>
<linearGradient id="m0" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8FA3B0" stop-opacity="0.74"/><stop offset="1" stop-color="#3C4F5D" stop-opacity="0.44"/></linearGradient>
<linearGradient id="m1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#43566A" stop-opacity="0.86"/><stop offset="1" stop-color="#18222A" stop-opacity="0.56"/></linearGradient>
<linearGradient id="m2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#33424F"/><stop offset="1" stop-color="#06080B"/></linearGradient>
<linearGradient id="water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0C141A"/><stop offset="1" stop-color="#06080B"/></linearGradient>
<linearGradient id="shaft" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E2EDEF" stop-opacity="0.38"/><stop offset="1" stop-color="#8FA6AA" stop-opacity="0"/></linearGradient>
</defs>
<rect width="${W}" height="${H}" fill="#0B0F14"/>
${stars([1.7, 2.3, 3.1, 4.9, 5.5, 6.7, 7.3, 8.1, 9.4, 10.6, 11.2, 12.8, 13.5, 14.1, 15.9, 16.4, 17.2, 18.8, 19.3, 20.7, 21.5, 22.2, 23.6, 24.4, 25.1, 26.9, 27.3, 28.5, 29.2, 30.8, 31.4, 32.6, 33.1, 34.7, 35.2, 36.9], 430)}
<ellipse cx="${MOON.cx}" cy="${MOON.cy}" rx="${MOON.glowR}" ry="${MOON.glowRy}" fill="url(#moonglow)"/>
<circle cx="${MOON.cx}" cy="${MOON.cy}" r="${MOON.r * 2.1}" fill="url(#moonhalo)"/>
<circle cx="${MOON.cx}" cy="${MOON.cy}" r="${MOON.r}" fill="#EAF3F4" fill-opacity="0.97"/>
<circle cx="${MOON.cx}" cy="${MOON.cy}" r="${f(MOON.r * 1.16)}" fill="none" stroke="#E4EDEF" stroke-opacity="0.20" stroke-width="1.4"/>
<path d="${L1}" fill="url(#m0)" opacity="0.9"/>
<path d="${R1}" fill="none" stroke="#AFC3C9" stroke-opacity="0.16" stroke-width="1.6"/>
<ellipse cx="960" cy="612" rx="900" ry="62" fill="#E4EDF0" fill-opacity="0.13" filter="url(#haze)"/>
<path d="${L2}" fill="url(#m1)"/>
<path d="${R2}" fill="none" stroke="#B6C8CE" stroke-opacity="0.20" stroke-width="1.6"/>
<ellipse cx="950" cy="800" rx="860" ry="56" fill="#E4EDF0" fill-opacity="0.11" filter="url(#haze)"/>
<path d="${L3}" fill="url(#m2)"/>
<path d="${R3}" fill="none" stroke="#C2D2D6" stroke-opacity="0.26" stroke-width="1.8"/>
<rect x="0" y="${WATER_Y}" width="${W}" height="${H - WATER_Y}" fill="url(#water)"/>
<ellipse cx="960" cy="${WATER_Y + 6}" rx="980" ry="30" fill="#E4EDF0" opacity="0.09" filter="url(#haze)"/>
<path d="M ${MOON.cx - 40} ${WATER_Y} L ${MOON.cx + 40} ${WATER_Y} L ${MOON.cx + 66} ${H} L ${MOON.cx - 66} ${H} Z" fill="url(#shaft)" opacity="0.78"/>
${glitter(MOON.cx, WATER_Y + 6, 150)}
<rect x="${MOON.cx - 66}" y="${WATER_Y + 228}" width="132" height="9" rx="4" fill="#C9A46A" opacity="0.10" filter="url(#haze)"/>
<rect x="266" y="${WATER_Y + 44}" width="96" height="2" rx="1" fill="#C6D2D6" opacity="0.18"/>
<rect x="470" y="${WATER_Y + 92}" width="140" height="2" rx="1" fill="#C6D2D6" opacity="0.13"/>
<rect x="742" y="${WATER_Y + 138}" width="188" height="2" rx="1" fill="#C6D2D6" opacity="0.10"/>
<rect x="1408" y="${WATER_Y + 178}" width="164" height="2" rx="1" fill="#C6D2D6" opacity="0.09"/>
<!-- 孤舟：船体本来就是近黑，压在近黑水面上等于隐形。先在它背后铺一层被月照到的
     水汽（原来 0.10 太淡），再用船灯与灯影把船的位置交代清楚。 -->
<ellipse cx="${BOAT.cx}" cy="${BOAT.cy + 18}" rx="126" ry="26" fill="#E4EDF0" opacity="0.17" filter="url(#haze)"/>
<ellipse cx="${BOAT.cx}" cy="${BOAT.cy + 10}" rx="86" ry="14" fill="#DDE9EB" opacity="0.10" filter="url(#soft)"/>
<g fill="#04070A">
  <path d="M ${BOAT.cx - BOAT.w / 2} ${BOAT.cy} Q ${BOAT.cx} ${BOAT.cy + 26} ${BOAT.cx + BOAT.w / 2} ${BOAT.cy} Z"/>
  <rect x="${BOAT.cx - 22}" y="${BOAT.cy - 72}" width="2.6" height="72"/>
  <path d="M ${BOAT.cx - 19} ${BOAT.cy - 68} L ${BOAT.cx - 19} ${BOAT.cy - 20} L ${BOAT.cx + 26} ${BOAT.cy - 20} Z"/>
</g>
<ellipse cx="${BOAT.cx}" cy="${BOAT.cy + 15}" rx="56" ry="5" fill="#04070A" opacity="0.5" filter="url(#haze)"/>
<ellipse cx="${BOAT.cx - 22}" cy="${BOAT.cy - 78}" rx="38" ry="32" fill="#C9A46A" opacity="0.30" filter="url(#haze)"/>
<circle cx="${BOAT.cx - 22}" cy="${BOAT.cy - 78}" r="8.5" fill="#E8C489" fill-opacity="1"/>
<circle cx="${BOAT.cx - 22}" cy="${BOAT.cy - 78}" r="15" fill="none" stroke="#D8B374" stroke-opacity="0.32" stroke-width="1.2" filter="url(#soft)"/>
<ellipse cx="${BOAT.cx - 26}" cy="${BOAT.cy + 26}" rx="16" ry="2.6" fill="#D8B374" opacity="0.30"/>
<ellipse cx="${BOAT.cx - 18}" cy="${BOAT.cy + 46}" rx="22" ry="2.6" fill="#C9A46A" opacity="0.20"/>
<ellipse cx="${BOAT.cx - 30}" cy="${BOAT.cy + 70}" rx="28" ry="2.6" fill="#C9A46A" opacity="0.12"/>
</svg>`;

mkdirSync(ASSETS, { recursive: true });
writeFileSync(new URL("ink-night.svg", ASSETS), svg);
writeFileSync(new URL("ink-night.uri.txt", ASSETS), "data:image/svg+xml," + encodeURIComponent(svg));
console.log("svg bytes:", Buffer.byteLength(svg), "uri bytes:", Buffer.byteLength("data:image/svg+xml," + encodeURIComponent(svg)));
