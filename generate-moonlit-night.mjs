// 「宋律·夜墨」深色山水：远山孤舟明月。
//
// 与 generate-landscapes.mjs 的区别：那张 ink.svg 只是把浅色青绿山水去饱和成
// 灰褐色（三条柔脊 + 两层几乎不可见的雾），既无月色也无水面，深色底又偏暖，
// 于是整张背景读起来像「调暗的浅色主题」。这里按夜景重画：
//   月（带光晕）→ 三层远近山影（越远越淡、冷灰）→ 水面 → 碎月水痕 → 孤舟。
// 单色系（月白 #D8E4E6 + 墨蓝 #0B0F14）保持素石式克制；暖赭只出现在船灯与
// 月影的最深处，作为画面唯一的暖点。所有元素都压在中低对比，因为主题会在它
// 上面覆一层 85% 不透明的对话区。
import { writeFileSync, mkdirSync } from "node:fs";

const W = 1920, H = 1200;
const ASSETS = new URL("./assets/", import.meta.url);

// 月：位置对齐画面右侧三分线，落在 16:10 / 16:9 视口的可视范围内（更宽的视口
// 会被 slice 从两侧裁掉，故不放到最右）。r=46 在全宽下约占 2.4% 画面宽度。
const MOON = { cx: 1490, cy: 302, r: 46, glowR: 215, glowRy: 195 };
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
    { dy: 6, n: 1, rx: 22, op: 0.52, off: 0 },
    { dy: 24, n: 2, rx: 20, op: 0.44, off: 5 },
    { dy: 48, n: 3, rx: 23, op: 0.36, off: 11 },
    { dy: 78, n: 4, rx: 27, op: 0.29, off: 8 },
    { dy: 114, n: 5, rx: 31, op: 0.23, off: 15 },
    { dy: 156, n: 6, rx: 35, op: 0.175, off: 10 },
    { dy: 204, n: 7, rx: 39, op: 0.13, off: 17 },
    { dy: 258, n: 7, rx: 43, op: 0.095, off: 12 },
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

const L1 = landmass(ridge(1.1, 520, 250));
const L2 = landmass(ridge(3.3, 748, 205));
const L3 = landmass(ridge(5.7, WATER_Y, 210));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice"><defs>
<filter id="haze"><feGaussianBlur stdDeviation="22"/></filter>
<radialGradient id="moonglow"><stop offset="0" stop-color="#E6EFF1" stop-opacity="0.42"/><stop offset="0.45" stop-color="#D8E4E6" stop-opacity="0.15"/><stop offset="1" stop-color="#D8E4E6" stop-opacity="0"/></radialGradient>
<linearGradient id="m0" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8496A2" stop-opacity="0.60"/><stop offset="1" stop-color="#3C4F5D" stop-opacity="0.36"/></linearGradient>
<linearGradient id="m1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3E5160" stop-opacity="0.72"/><stop offset="1" stop-color="#1A252D" stop-opacity="0.46"/></linearGradient>
<linearGradient id="m2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2C3A46"/><stop offset="1" stop-color="#070A0D"/></linearGradient>
<linearGradient id="water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0A1015"/><stop offset="1" stop-color="#070A0D"/></linearGradient>
<linearGradient id="shaft" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#DCE7E9" stop-opacity="0.26"/><stop offset="1" stop-color="#8FA6AA" stop-opacity="0"/></linearGradient>
</defs>
<rect width="${W}" height="${H}" fill="#0B0F14"/>
<ellipse cx="${MOON.cx}" cy="${MOON.cy}" rx="${MOON.glowR}" ry="${MOON.glowRy}" fill="url(#moonglow)"/>
<circle cx="${MOON.cx}" cy="${MOON.cy}" r="${MOON.r}" fill="#E4EDEF" fill-opacity="0.92"/>
<path d="${L1}" fill="url(#m0)" opacity="0.85"/>
<ellipse cx="960" cy="612" rx="900" ry="62" fill="#E4EDF0" fill-opacity="0.10" filter="url(#haze)"/>
<path d="${L2}" fill="url(#m1)"/>
<ellipse cx="950" cy="800" rx="860" ry="56" fill="#E4EDF0" fill-opacity="0.085" filter="url(#haze)"/>
<path d="${L3}" fill="url(#m2)"/>
<rect x="0" y="${WATER_Y}" width="${W}" height="${H - WATER_Y}" fill="url(#water)"/>
<ellipse cx="960" cy="${WATER_Y + 6}" rx="980" ry="30" fill="#E4EDF0" opacity="0.055" filter="url(#haze)"/>
<path d="M ${MOON.cx - 34} ${WATER_Y} L ${MOON.cx + 34} ${WATER_Y} L ${MOON.cx + 58} ${H} L ${MOON.cx - 58} ${H} Z" fill="url(#shaft)" opacity="0.6"/>
${glitter(MOON.cx, WATER_Y + 6, 150)}
<rect x="${MOON.cx - 66}" y="${WATER_Y + 228}" width="132" height="9" rx="4" fill="#C9A46A" opacity="0.08" filter="url(#haze)"/>
<rect x="266" y="${WATER_Y + 44}" width="96" height="2" rx="1" fill="#C6D2D6" opacity="0.13"/>
<rect x="470" y="${WATER_Y + 92}" width="140" height="2" rx="1" fill="#C6D2D6" opacity="0.09"/>
<ellipse cx="${BOAT.cx}" cy="${BOAT.cy + 18}" rx="92" ry="22" fill="#E4EDF0" opacity="0.10" filter="url(#haze)"/>
<g fill="#04070A">
  <path d="M ${BOAT.cx - BOAT.w / 2} ${BOAT.cy} Q ${BOAT.cx} ${BOAT.cy + 26} ${BOAT.cx + BOAT.w / 2} ${BOAT.cy} Z"/>
  <rect x="${BOAT.cx - 22}" y="${BOAT.cy - 72}" width="2.6" height="72"/>
  <path d="M ${BOAT.cx - 19} ${BOAT.cy - 68} L ${BOAT.cx - 19} ${BOAT.cy - 20} L ${BOAT.cx + 26} ${BOAT.cy - 20} Z"/>
</g>
<ellipse cx="${BOAT.cx}" cy="${BOAT.cy + 15}" rx="52" ry="5" fill="#04070A" opacity="0.55" filter="url(#haze)"/>
<circle cx="${BOAT.cx - 22}" cy="${BOAT.cy - 78}" r="7" fill="#D8B374" fill-opacity="0.85"/>
<ellipse cx="${BOAT.cx - 22}" cy="${BOAT.cy - 78}" rx="26" ry="22" fill="#C9A46A" opacity="0.16" filter="url(#haze)"/>
</svg>`;

mkdirSync(ASSETS, { recursive: true });
writeFileSync(new URL("ink-night.svg", ASSETS), svg);
writeFileSync(new URL("ink-night.uri.txt", ASSETS), "data:image/svg+xml," + encodeURIComponent(svg));
console.log("svg bytes:", Buffer.byteLength(svg), "uri bytes:", Buffer.byteLength("data:image/svg+xml," + encodeURIComponent(svg)));
