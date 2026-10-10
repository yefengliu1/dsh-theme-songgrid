/**
 * 宋律 Songgrid 主题插件 —— browser face。
 * 结构对齐官方 @dshthemes/ui 的 lib/client.js：
 *   window.__ModuleLoader__.load + exports.apply/inject；
 *   ctx.theme.register() 注册主题 + settings.general.item slot 挂载主题选择器。
 */
window.__ModuleLoader__.load({
	id: "dsh-theme-songgrid",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react_jsx_runtime = require("react/jsx-runtime");
		let _deepseek_ai_dsh_client_store = require("@deepseek-ai/dsh-client-store");

		// ---- 主题定义 -------------------------------------------------------
		// 「宋律·宣纸」浅色：宣纸暖白 × 汝窑天青 × 朱砂
		const light = Object.freeze({
			id: "song-grid-xuanzhi",
			colorScheme: "light",
			tokens: Object.freeze({
				"--dsw-alias-bg-base": "#F7F5EF",
				"--dsw-alias-bg-layer-1": "#FBFAF6",
				"--dsw-alias-bg-layer-2": "#F0EDE4",
				"--dsw-alias-bg-layer-3": "#E7E3D8",
				"--dsw-alias-bg-overlay": "#DDD8CB",
				"--dsw-alias-label-primary": "#26221C",
				"--dsw-alias-label-secondary": "#5C554A",
				"--dsw-alias-label-tertiary": "#8B8478",
				"--dsw-alias-brand-primary": "#3A7284",
				"--dsw-alias-state-business-primary": "#3A7284",
				"--dsw-alias-state-success-primary": "#4E7A5A",
				"--dsw-alias-state-warn-primary": "#B0823A",
				"--dsw-alias-state-error-primary": "#B5453C",
				"--dsw-alias-border-l1": "rgba(38, 34, 28, 0.06)",
				"--dsw-alias-border-l2": "rgba(38, 34, 28, 0.12)",
				"--dsw-alias-interactive-bg-hover": "rgba(38, 34, 28, 0.06)",
				"--dsw-alias-interactive-bg-active": "rgba(38, 34, 28, 0.12)",
				"--dsw-alias-button-primary-fill": "#26221C",
				"--dsw-alias-button-primary-hover": "#3D3830",
				"--dsw-alias-markdown-code-block": "#F2EFE7",
				"--dsw-alias-markdown-code-block-banner": "#F2EFE7",
				"--dsw-alias-markdown-inline-code": "#F0EDE4",
				"--dsw-alias-markdown-tag": "#E7E3D8",
				"--dsw-alias-scrollbar-bg-l1": "#E7E3D8",
				"--dsw-alias-scrollbar-hover-l1": "#DDD8CB",
				"--dsw-alias-tooltip-bg": "#26221C",
				"--dsw-specific-bubble": "#E8F0F2",
				"--dsw-specific-bubble-highlight": "#D9E8EC",
				"--dsw-specific-sidebar-fill": "rgba(242, 239, 231, 0.66)",
				"--dsw-specific-sidebar-nav-item-active": "#E7E3D8",
				"--dsw-alias-bg-mask-1": "rgba(38, 34, 28, 0.24)",
				"--dsw-alias-bg-mask-2": "rgba(38, 34, 28, 0.12)",
				"--dsw-alias-bg-mask-3": "rgba(38, 34, 28, 0.48)",
				"--dsw-alias-bg-module-platform": "#FBFAF6",
				"--dsw-alias-bg-multi-select": "#F0EDE4",
				"--dsw-alias-bg-skeleton": "rgba(38, 34, 28, 0.08)",
				"--dsw-alias-border-l3": "rgba(38, 34, 28, 0.18)",
				"--dsw-alias-border-l4": "rgba(38, 34, 28, 0.24)",
				"--dsw-alias-border-inverted": "rgba(38, 34, 28, 0)",
				"--dsw-alias-button-info-fill": "#3A7284",
				"--dsw-alias-button-info-hover": "#327084",
				"--dsw-alias-button-elevated-fill": "#FBFAF6",
				"--dsw-alias-button-floating-fill": "#FBFAF6",
				"--dsw-alias-button-floating-hover": "#F0EDE4",
				"--dsw-alias-interactive-bg-hover-solid": "#F0EDE4",
				"--dsw-alias-interactive-bg-hover-danger": "rgba(181, 69, 60, 0.08)",
				"--dsw-alias-interactive-bg-hover-accent": "rgba(58, 114, 132, 0.12)",
				"--dsw-alias-label-caption": "#8B8478",
				"--dsw-alias-label-primary-inverted": "#FBFAF6",
				"--dsw-alias-label-primary-dimmed": "#26221C",
				"--dsw-alias-label-dimmed": "#E7E3D8",
				"--dsw-alias-markdown-citation": "#F0EDE4",
				"--dsw-alias-markdown-code-segment-selected": "#FBFAF6",
				"--dsw-alias-markdown-code-segment-unselected": "#F0EDE4",
				"--dsw-alias-markdown-placeholder": "#E7E3D8",
				"--dsw-alias-scrollbar-bg-l2": "#E7E3D8",
				"--dsw-alias-scrollbar-hover-l2": "#DDD8CB",
				"--dsw-alias-state-success-secondary": "#6C9A7A",
				"--dsw-alias-state-warn-secondary": "#C49A5C",
				"--dsw-alias-state-error-secondary": "#C96A62",
				"--dsw-alias-state-success-tertiary": "#E9F0EA",
				"--dsw-alias-state-warn-tertiary": "#F4EEE0",
				"--dsw-alias-state-business-tertiary": "#E8F0F2",
				"--dsw-alias-toast-bg": "#3D3830",
				"--dsw-specific-input-major": "#FBFAF6",
				"--dsw-specific-login-input": "#F2EFE7",
				"--dsw-specific-menu": "#FBFAF6",
				"--dsw-specific-selector": "#F2EFE7",
				"--dsw-specific-sidebar-nav-item-hover": "#F0EDE4",
				"--dsw-specific-tip": "#E8F0F2"
			})
		});

		// 「宋律·夜墨」深色：玄墨暖黑 × 浅天青 × 朱砂
		const dark = Object.freeze({
			id: "song-grid-yemo",
			colorScheme: "dark",
			tokens: Object.freeze({
				"--dsw-alias-bg-base": "#10151A",
				"--dsw-alias-bg-layer-1": "#191F26",
				"--dsw-alias-bg-layer-2": "#1D242B",
				"--dsw-alias-bg-layer-3": "#232B33",
				"--dsw-alias-bg-overlay": "#2C353E",
				"--dsw-alias-label-primary": "#E8E3D6",
				"--dsw-alias-label-secondary": "#A8A193",
				"--dsw-alias-label-tertiary": "#7A7468",
				"--dsw-alias-brand-primary": "#7FB4C4",
				"--dsw-alias-state-business-primary": "#7FB4C4",
				"--dsw-alias-state-success-primary": "#8FB99B",
				"--dsw-alias-state-warn-primary": "#D2A85F",
				"--dsw-alias-state-error-primary": "#D07A70",
				"--dsw-alias-border-l1": "rgba(232, 227, 214, 0.08)",
				"--dsw-alias-border-l2": "rgba(232, 227, 214, 0.14)",
				"--dsw-alias-interactive-bg-hover": "rgba(232, 227, 214, 0.07)",
				"--dsw-alias-interactive-bg-active": "rgba(232, 227, 214, 0.12)",
				"--dsw-alias-button-primary-fill": "#E8E3D6",
				"--dsw-alias-button-primary-hover": "#D8D2C3",
				"--dsw-alias-markdown-code-block": "#191F26",
				"--dsw-alias-markdown-code-block-banner": "#191F26",
				"--dsw-alias-markdown-inline-code": "#1D242B",
				"--dsw-alias-markdown-tag": "#1D242B",
				"--dsw-alias-scrollbar-bg-l1": "#2C353E",
				"--dsw-alias-scrollbar-hover-l1": "#3A444E",
				"--dsw-alias-tooltip-bg": "#2C353E",
				"--dsw-specific-bubble": "#24343A",
				"--dsw-specific-bubble-highlight": "#2C4047",
				"--dsw-specific-sidebar-fill": "rgba(25, 31, 38, 0.70)",
				"--dsw-specific-sidebar-nav-item-active": "#1D242B",
				"--dsw-alias-bg-mask-1": "rgba(0, 0, 0, 0.5)",
				"--dsw-alias-bg-mask-2": "rgba(0, 0, 0, 0.2)",
				"--dsw-alias-bg-mask-3": "rgba(0, 0, 0, 0.48)",
				"--dsw-alias-bg-module-platform": "#191F26",
				"--dsw-alias-bg-multi-select": "#1D242B",
				"--dsw-alias-bg-skeleton": "rgba(232, 227, 214, 0.08)",
				"--dsw-alias-border-l3": "rgba(232, 227, 214, 0.22)",
				"--dsw-alias-border-l4": "rgba(232, 227, 214, 0.28)",
				"--dsw-alias-border-inverted": "rgba(232, 227, 214, 0.10)",
				"--dsw-alias-button-info-fill": "#7FB4C4",
				"--dsw-alias-button-info-hover": "#96C2D0",
				"--dsw-alias-button-elevated-fill": "#191F26",
				"--dsw-alias-button-floating-fill": "#1D242B",
				"--dsw-alias-button-floating-hover": "#232B33",
				"--dsw-alias-interactive-bg-hover-solid": "#232B33",
				"--dsw-alias-interactive-bg-hover-danger": "rgba(208, 122, 112, 0.18)",
				"--dsw-alias-interactive-bg-hover-accent": "rgba(127, 180, 196, 0.24)",
				"--dsw-alias-label-caption": "#7A7468",
				"--dsw-alias-label-primary-inverted": "#10151A",
				"--dsw-alias-label-primary-dimmed": "#A8A193",
				"--dsw-alias-label-dimmed": "#232B33",
				"--dsw-alias-markdown-citation": "#1D242B",
				"--dsw-alias-markdown-code-segment-selected": "#232B33",
				"--dsw-alias-markdown-code-segment-unselected": "#191F26",
				"--dsw-alias-markdown-placeholder": "#232B33",
				"--dsw-alias-scrollbar-bg-l2": "#2C353E",
				"--dsw-alias-scrollbar-hover-l2": "#3A444E",
				"--dsw-alias-state-success-secondary": "#A8C9B2",
				"--dsw-alias-state-warn-secondary": "#DCBA7E",
				"--dsw-alias-state-error-secondary": "#DA948C",
				"--dsw-alias-state-success-tertiary": "#22301F",
				"--dsw-alias-state-warn-tertiary": "#332A1C",
				"--dsw-alias-state-business-tertiary": "#24343A",
				"--dsw-alias-toast-bg": "#2C353E",
				"--dsw-specific-input-major": "#1D242B",
				"--dsw-specific-login-input": "#191F26",
				"--dsw-specific-menu": "#1D242B",
				"--dsw-specific-selector": "#1D242B",
				"--dsw-specific-sidebar-nav-item-hover": "#1D242B",
				"--dsw-specific-tip": "#24343A"
			})
		});

		// ---- 排版层 CSS -----------------------------------------------------
		const TYPO_CSS = `
/* 宋律 Songgrid 排版层 */
:root {
  --songgrid-body-font: 'Noto Serif SC', -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
}
@font-face {
  font-family: 'Noto Serif SC';
  font-style: normal;
  font-display: swap;
  font-weight: 400;
  src: url(https://registry.npmmirror.com/@fontsource/noto-serif-sc/5.2.8/files/noto-serif-sc-chinese-simplified-400-normal.woff2) format('woff2');
  unicode-range: U+3000-303F, U+3400-4DBF, U+4E00-9FFF, U+F900-FAFF, U+FE30-FE4F, U+FF00-FFEF, U+20000-2A6DF;
}
body {
  --dsw-font-markdown-base-font-family: var(--songgrid-body-font);
  --dsw-font-markdown-base-strong-font-family: var(--songgrid-body-font);
  --dsw-font-markdown-base-italic-font-family: var(--songgrid-body-font);
  --dsw-font-markdown-base-strong-italic-font-family: var(--songgrid-body-font);
  --dsw-font-markdown-small-font-family: var(--songgrid-body-font);
  --dsw-font-markdown-small-strong-font-family: var(--songgrid-body-font);
  --dsw-font-markdown-small-italic-font-family: var(--songgrid-body-font);
  --dsw-font-markdown-small-strong-italic-font-family: var(--songgrid-body-font);
  --dsw-font-markdown-table-font-family: var(--songgrid-body-font);
  --dsw-font-markdown-table-head-font-family: var(--songgrid-body-font);
}
`;

		// ---- 结构层 CSS（素石尺度语汇）---------------------------------------
		const STRUCTURE_CSS = `
/* 宋律 Songgrid 结构层 —— 素石 Plain Stone 的尺度语汇
   ------------------------------------------------------------------
   只定义「尺度与约束」：间距 / 圆角 / 行高 / 动效 / 焦点环 / 图标尺寸。
   刻意不含任何颜色与字体 —— 颜色归 --dsw-alias-*，字体归 TYPO_CSS。
   命名空间 --sg-*，与宿主 --dsw-* / --dsl-* 互不干扰。

   为什么需要这一层：宋律此前的 CSS 里散落着 gap:8px / padding:6px 10px /
   border-radius:5px·6px·8px / transition:.12s —— 同一件事每次重新取值。
   这里把它们收敛成一把梯子，之后所有新样式按角色取用，不再写裸值。

   值来自素石 ~/.agents/skills/plain-stone-design-system（v2.4.0）。 */
:root {
  /* 间距 · 4pt grid（素石 --s-1..12） */
  --sg-space-1: 4px;   --sg-space-2: 8px;   --sg-space-3: 12px;
  --sg-space-4: 16px;  --sg-space-5: 20px;  --sg-space-6: 24px;
  --sg-space-7: 28px;  --sg-space-8: 32px;  --sg-space-9: 40px;
  --sg-space-10: 48px; --sg-space-11: 64px; --sg-space-12: 80px;
  /* 间距别名 · 按用途取用，不按数值 */
  --sg-gap-tight: var(--sg-space-2);
  --sg-gap-inline: var(--sg-space-3);
  --sg-gap-default: var(--sg-space-4);
  --sg-gap-block: var(--sg-space-6);
  --sg-gap-section: var(--sg-space-9);

  /* 圆角 · 素石只有两档（2 / 4px） */
  --sg-radius-sm: 2px;
  --sg-radius-md: 4px;

  /* 行高 · 四档（素石 --lh-*） */
  --sg-lh-tight: 1.12;
  --sg-lh-snug: 1.5;
  --sg-lh-base: 1.65;
  --sg-lh-loose: 1.8;

  /* 动效 · 时长与曲线（素石 --dur-* / --ease-*） */
  --sg-dur-instant: 80ms;
  --sg-dur-fast: 120ms;
  --sg-dur-base: 150ms;
  --sg-dur-slow: 250ms;
  --sg-dur-slower: 400ms;
  --sg-ease-out: cubic-bezier(0.2, 0.7, 0.2, 1);
  --sg-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --sg-ease-emphasized: cubic-bezier(0.2, 0.7, 0.2, 1);

  /* 焦点环 · 只绑定既有 brand token，不新增颜色 */
  --sg-focus-width: 2px;
  --sg-focus-offset: 3px;
  --sg-focus-color: var(--dsw-alias-brand-primary);

  /* 图标尺寸 */
  --sg-icon-sm: 14px;
  --sg-icon-md: 16px;
  --sg-icon-lg: 20px;
  --sg-icon-xl: 24px;
}
`;

		// ---- 图标层 CSS（素石 mask 图标）-------------------------------------
		const ICON_CSS = `
/* 宋律 Songgrid 图标层 —— 素石的 mask 图标系统（46 个 Lucide 字形）
   ------------------------------------------------------------------
   用法：<span class="sg-icon sg-icon-check"></span>
         <span class="sg-icon lg sg-icon-search"></span>
   走 mask + currentColor，所以图标自动跟随父级文字颜色，且零外部依赖。
   宋律此前完全没有图标语汇，这一层是新增能力。 */
.sg-icon {
  display: inline-block;
  width: var(--sg-icon-size, var(--sg-icon-md));
  height: var(--sg-icon-size, var(--sg-icon-md));
  vertical-align: -2px;
  background-color: currentColor;
  -webkit-mask: var(--sg-icon-glyph) center / contain no-repeat;
          mask: var(--sg-icon-glyph) center / contain no-repeat;
  flex-shrink: 0;
}
.sg-icon.sm { --sg-icon-size: var(--sg-icon-sm); }
.sg-icon.lg { --sg-icon-size: var(--sg-icon-lg); }
.sg-icon.xl { --sg-icon-size: var(--sg-icon-xl); }
.sg-icon-check { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.75' stroke-linecap='round' stroke-linejoin='round'><polyline points='20 6 9 17 4 12'/></svg>"); }
.sg-icon-x { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.75' stroke-linecap='round' stroke-linejoin='round'><line x1='18' y1='6' x2='6' y2='18'/><line x1='6' y1='6' x2='18' y2='18'/></svg>"); }
.sg-icon-arrow-right { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><line x1='5' y1='12' x2='19' y2='12'/><polyline points='12 5 19 12 12 19'/></svg>"); }
.sg-icon-chevron-right { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='9 6 15 12 9 18'/></svg>"); }
.sg-icon-search { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><circle cx='11' cy='11' r='8'/><line x1='21' y1='21' x2='16.65' y2='16.65'/></svg>"); }
.sg-icon-plus { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round'><line x1='12' y1='5' x2='12' y2='19'/><line x1='5' y1='12' x2='19' y2='12'/></svg>"); }
.sg-icon-alert-triangle { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.75' stroke-linecap='round' stroke-linejoin='round'><path d='M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z'/><line x1='12' y1='9' x2='12' y2='13'/><line x1='12' y1='17' x2='12.01' y2='17'/></svg>"); }
.sg-icon-alert-circle { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='10'/><line x1='12' y1='8' x2='12' y2='12'/><line x1='12' y1='16' x2='12.01' y2='16'/></svg>"); }
.sg-icon-info { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='10'/><line x1='12' y1='16' x2='12' y2='12'/><line x1='12' y1='8' x2='12.01' y2='8'/></svg>"); }
.sg-icon-help-circle { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='10'/><path d='M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3'/><line x1='12' y1='17' x2='12.01' y2='17'/></svg>"); }
.sg-icon-lightbulb { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M9 18h6'/><path d='M10 22h4'/><path d='M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1.49.39 2.5 1.5 3.5.76.76 1.23 1.52 1.41 2.5'/></svg>"); }
.sg-icon-check-circle { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M22 11.08V12a10 10 0 1 1-5.93-9.14'/><polyline points='22 4 12 14.01 9 11.01'/></svg>"); }
.sg-icon-x-circle { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='10'/><line x1='15' y1='9' x2='9' y2='15'/><line x1='9' y1='9' x2='15' y2='15'/></svg>"); }
.sg-icon-zap { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><polygon points='13 2 3 14 12 14 11 22 21 10 12 10 13 2'/></svg>"); }
.sg-icon-pencil { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M12 20h9'/><path d='M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z'/></svg>"); }
.sg-icon-file-text { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'/><polyline points='14 2 14 8 20 8'/><line x1='16' y1='13' x2='8' y2='13'/><line x1='16' y1='17' x2='8' y2='17'/><polyline points='10 9 9 9 8 9'/></svg>"); }
.sg-icon-book { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M4 19.5A2.5 2.5 0 0 1 6.5 17H20'/><path d='M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z'/></svg>"); }
.sg-icon-bookmark { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z'/></svg>"); }
.sg-icon-tag { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z'/><line x1='7' y1='7' x2='7.01' y2='7'/></svg>"); }
.sg-icon-quote { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z'/><path d='M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z'/></svg>"); }
.sg-icon-bar-chart { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><line x1='12' y1='20' x2='12' y2='10'/><line x1='18' y1='20' x2='18' y2='4'/><line x1='6' y1='20' x2='6' y2='16'/></svg>"); }
.sg-icon-line-chart { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M3 3v18h18'/><path d='m19 9-5 5-4-4-3 3'/></svg>"); }
.sg-icon-pie-chart { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M21.21 15.89A10 10 0 1 1 8 2.83'/><path d='M22 12A10 10 0 0 0 12 2v10z'/></svg>"); }
.sg-icon-target { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='10'/><circle cx='12' cy='12' r='6'/><circle cx='12' cy='12' r='2'/></svg>"); }
.sg-icon-home { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'/><polyline points='9 22 9 12 15 12 15 22'/></svg>"); }
.sg-icon-settings { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z'/><circle cx='12' cy='12' r='3'/></svg>"); }
.sg-icon-menu { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><line x1='3' y1='6' x2='21' y2='6'/><line x1='3' y1='12' x2='21' y2='12'/><line x1='3' y1='18' x2='21' y2='18'/></svg>"); }
.sg-icon-more-horizontal { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='1'/><circle cx='19' cy='12' r='1'/><circle cx='5' cy='12' r='1'/></svg>"); }
.sg-icon-clock { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><circle cx='12' cy='12' r='10'/><polyline points='12 6 12 12 16 14'/></svg>"); }
.sg-icon-calendar { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><rect x='3' y='4' width='18' height='18' rx='2' ry='2'/><line x1='16' y1='2' x2='16' y2='6'/><line x1='8' y1='2' x2='8' y2='6'/><line x1='3' y1='10' x2='21' y2='10'/></svg>"); }
.sg-icon-history { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8'/><path d='M3 3v5h5'/><path d='M12 7v5l4 2'/></svg>"); }
.sg-icon-folder { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z'/></svg>"); }
.sg-icon-download { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'/><polyline points='7 10 12 15 17 10'/><line x1='12' y1='15' x2='12' y2='3'/></svg>"); }
.sg-icon-upload { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'/><polyline points='17 8 12 3 7 8'/><line x1='12' y1='3' x2='12' y2='15'/></svg>"); }
.sg-icon-paperclip { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48'/></svg>"); }
.sg-icon-mail { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'/><polyline points='22,6 12,13 2,6'/></svg>"); }
.sg-icon-message-circle { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z'/></svg>"); }
.sg-icon-bell { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9'/><path d='M10.3 21a1.94 1.94 0 0 0 3.4 0'/></svg>"); }
.sg-icon-share { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><circle cx='18' cy='5' r='3'/><circle cx='6' cy='12' r='3'/><circle cx='18' cy='19' r='3'/><line x1='8.59' y1='13.51' x2='15.42' y2='17.49'/><line x1='15.41' y1='6.51' x2='8.59' y2='10.49'/></svg>"); }
.sg-icon-star { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'/></svg>"); }
.sg-icon-flame { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'/></svg>"); }
.sg-icon-rocket { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z'/><path d='M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z'/><path d='M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0'/><path d='M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5'/></svg>"); }
.sg-icon-link { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71'/><path d='M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'/></svg>"); }
.sg-icon-external-link { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6'/><polyline points='15 3 21 3 21 9'/><line x1='10' y1='14' x2='21' y2='3'/></svg>"); }
.sg-icon-eye { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'/><circle cx='12' cy='12' r='3'/></svg>"); }
.sg-icon-eye-off { --sg-icon-glyph: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><path d='M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24'/><line x1='1' y1='1' x2='23' y2='23'/></svg>"); }
`;

		// ---- 语义强调层 CSS（素石的第二个强调角色）---------------------------
		const SEMANTIC_CSS = `
/* 宋律 Songgrid 语义强调层 —— 素石带来的第二个强调角色
   ------------------------------------------------------------------
   宋律此前只有「功能色」（天青），没有「编辑性强调色」。素石带窑铜来补这位。
   两者角色不同、色相相隔 174°，各管各的，不冲突：

     功能色   --sg-accent-functional   能不能点 / 选没选中（按钮·焦点·选中·链接）
     编辑性   --sg-accent-editorial    值不值得看（引用·标记·关键强调）

   素石自己的分工也是这样：accent 面积 ≤5%，只用于 § 标记、赢家行、hover、
   印章 —— 从不用在大面积表面上。所以窑铜不进按钮，只进「值得多看一眼」的位置。

   这是宋律主题里唯一新增的颜色角色；中性色与功能色仍归 --dsw-alias-*。 */
:root {
  --sg-accent-functional: var(--dsw-alias-brand-primary);
  --sg-accent-editorial: #9A6B50;
}
body[data-ds-dark-theme] {
  /* 素石深色把窑铜提亮两档，否则在暖黑上读不出来 */
  --sg-accent-editorial: #C9956E;
}

/* 引用块是宿主 markdown 里唯一的「编辑性强调」位：它现在用
   --dsw-alias-label-caption 的灰线画左边框，等于没有强调。
   只改颜色不改宽度 —— 2px 是宿主的所有权。 */
[class*="_markdown_"] blockquote {
  border-left-color: var(--sg-accent-editorial);
}
`;

		// ---- 选择器行 CSS ---------------------------------------------------
		const PICKER_CSS = `
/* 选择器行 —— 全部按结构层 token 取用，不再出现裸 px / ms。
   改动说明：6px 10px 这类不在 4pt grid 上的 padding 收进 grid；
   圆角从 5/6/8px 三个随手值收敛到 --sg-radius-sm/md 两档。 */
.songgrid-group{flex-direction:column;gap:var(--sg-gap-tight);display:flex}
.songgrid-title{color:var(--dsw-alias-label-primary);font-size:14px;line-height:var(--sg-lh-snug)}
.songgrid-cubeRow{gap:var(--sg-gap-tight);display:flex}
.songgrid-themeList{grid-template-columns:repeat(auto-fill,minmax(132px,1fr));gap:var(--sg-gap-tight);margin-top:var(--sg-gap-tight);display:grid}
.songgrid-themeCube,.songgrid-themeItem{background:var(--dsw-alias-button-elevated-fill);color:var(--dsw-alias-label-secondary);border:1px solid var(--dsw-alias-border-l1);cursor:pointer;transition:background-color var(--sg-dur-fast) var(--sg-ease-out),border-color var(--sg-dur-fast) var(--sg-ease-out),color var(--sg-dur-fast) var(--sg-ease-out)}
.songgrid-themeCube:hover,.songgrid-themeItem:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}
.songgrid-themeCube:focus-visible,.songgrid-themeItem:focus-visible{outline:var(--sg-focus-width) solid var(--sg-focus-color);outline-offset:var(--sg-focus-offset)}
.songgrid-themeCube.songgrid-selected,.songgrid-themeItem.songgrid-selected{background:var(--dsw-alias-interactive-bg-active);border-color:var(--dsw-alias-brand-primary);color:var(--dsw-alias-label-primary)}
.songgrid-themeCube{border-radius:var(--sg-radius-md);flex:1;padding:var(--sg-space-2) var(--sg-space-3);font-size:13px;line-height:var(--sg-lh-snug)}
.songgrid-themeItem{text-align:left;border-radius:var(--sg-radius-md);align-items:center;gap:var(--sg-gap-tight);padding:var(--sg-space-2) var(--sg-space-3);font-size:12px;line-height:var(--sg-lh-snug);display:flex}
.songgrid-swatch{width:20px;height:20px;box-shadow:inset 0 0 0 1px var(--dsw-alias-border-l2);border-radius:var(--sg-radius-sm);flex:none;align-items:flex-end;display:flex;overflow:hidden}
.songgrid-swatchAccent{width:100%;height:6px;display:block}
.songgrid-themeName{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}
.songgrid-tick{background:var(--dsw-alias-brand-primary);opacity:0;border-radius:50%;flex:none;width:var(--sg-space-1);height:var(--sg-space-1);margin-left:auto}
.songgrid-themeItem.songgrid-selected .songgrid-tick{opacity:1}
`;

		// ---- 山水背景 CSS（增强对比度版）----
		const BACKGROUND_CSS = `
/* 宋律 Songgrid 山水背景层：浅色=青绿山水，深色=远山孤舟明月（见 generate-moonlit-night.mjs） */
.pI_x6G_frame {
  background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201920%201080%22%20preserveAspectRatio%3D%22xMidYMid%20slice%22%3E%3Cdefs%3E%3Cfilter%20id%3D%22soft40%22%3E%3CfeGaussianBlur%20stdDeviation%3D%2240%22%2F%3E%3C%2Ffilter%3E%3Cfilter%20id%3D%22soft70%22%3E%3CfeGaussianBlur%20stdDeviation%3D%2270%22%2F%3E%3C%2Ffilter%3E%3ClinearGradient%20id%3D%22cg0%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%238FB4B8%22%20stop-opacity%3D%220.8%22%2F%3E%3Cstop%20offset%3D%220.55%22%20stop-color%3D%22%238FB4B8%22%20stop-opacity%3D%220.44000000000000006%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%238FB4B8%22%20stop-opacity%3D%220%22%2F%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22cg1%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%235F949C%22%20stop-opacity%3D%220.85%22%2F%3E%3Cstop%20offset%3D%220.55%22%20stop-color%3D%22%235F949C%22%20stop-opacity%3D%220.4675%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%235F949C%22%20stop-opacity%3D%220%22%2F%3E%3C%2FlinearGradient%3E%3ClinearGradient%20id%3D%22cg2%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%233E7A8C%22%20stop-opacity%3D%220.9%22%2F%3E%3Cstop%20offset%3D%220.55%22%20stop-color%3D%22%233E7A8C%22%20stop-opacity%3D%220.49500000000000005%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%233E7A8C%22%20stop-opacity%3D%220%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Cellipse%20cx%3D%22480%22%20cy%3D%22460%22%20rx%3D%22700%22%20ry%3D%2290%22%20fill%3D%22%23FFFFFF%22%20fill-opacity%3D%220.32%22%20filter%3D%22url(%23soft70)%22%2F%3E%3Cellipse%20cx%3D%221400%22%20cy%3D%22400%22%20rx%3D%22620%22%20ry%3D%2280%22%20fill%3D%22%23FFFFFF%22%20fill-opacity%3D%220.28%22%20filter%3D%22url(%23soft70)%22%2F%3E%3Cpath%20d%3D%22M%200%20421.2%20L%2020%20415.8%20L%2040%20408.0%20L%2060%20399.7%20L%2080%20391.8%20L%20100%20385.0%20L%20120%20379.7%20L%20140%20376.2%20L%20160%20374.2%20L%20180%20373.7%20L%20200%20374.0%20L%20220%20374.9%20L%20240%20376.0%20L%20260%20377.2%20L%20280%20378.5%20L%20300%20380.2%20L%20320%20382.7%20L%20340%20386.7%20L%20360%20392.5%20L%20380%20400.5%20L%20400%20410.8%20L%20420%20423.0%20L%20440%20436.5%20L%20460%20450.4%20L%20480%20463.6%20L%20500.00000000000006%20474.8%20L%20520%20483.1%20L%20540%20487.5%20L%20560%20487.7%20L%20580%20483.5%20L%20600%20475.3%20L%20620%20464.0%20L%20640%20450.6%20L%20660%20436.4%20L%20680%20422.5%20L%20700%20409.9%20L%20720%20399.3%20L%20740%20391.0%20L%20760%20384.9%20L%20780%20380.7%20L%20800%20377.8%20L%20820%20375.3%20L%20840%20372.6%20L%20860%20369.3%20L%20880%20365.1%20L%20900%20360.0%20L%20920%20354.5%20L%20940%20349.1%20L%20960%20344.4%20L%20979.9999999999999%20341.2%20L%201000.0000000000001%20340.0%20L%201020%20341.1%20L%201040%20344.4%20L%201060%20349.8%20L%201080%20356.5%20L%201100%20363.9%20L%201120%20371.1%20L%201140%20377.5%20L%201160%20382.5%20L%201180%20385.9%20L%201200%20387.4%20L%201220%20387.5%20L%201240%20386.4%20L%201260%20384.7%20L%201280%20382.9%20L%201300%20381.1%20L%201320%20379.5%20L%201340%20378.0%20L%201360%20376.2%20L%201380%20373.5%20L%201400%20369.3%20L%201420%20363.2%20L%201440%20354.7%20L%201460%20343.9%20L%201480%20331.0%20L%201500%20316.8%20L%201520%20302.2%20L%201540%20288.5%20L%201560%20276.8%20L%201580%20268.2%20L%201600%20263.6%20L%201620%20263.4%20L%201640%20267.6%20L%201660%20275.8%20L%201680%20287.1%20L%201700%20300.5%20L%201720%20314.7%20L%201740%20328.6%20L%201760%20341.1%20L%201780%20351.6%20L%201800%20359.8%20L%201820%20365.7%20L%201840%20369.7%20L%201860%20372.5%20L%201880%20374.7%20L%201900%20376.9%20L%201920%20378.7%20L%201920%201080%20L%200%201080%20Z%22%20fill%3D%22url(%23cg0)%22%2F%3E%3Cpath%20d%3D%22M%200%20443.4%20L%2020%20445.3%20L%2040%20448.8%20L%2060%20453.5%20L%2080%20458.4%20L%20100%20463.0%20L%20120%20466.8%20L%20140%20469.7%20L%20160%20471.8%20L%20180%20473.6%20L%20200%20475.5%20L%20220%20477.9%20L%20240%20481.1%20L%20260%20485.1%20L%20280%20489.7%20L%20300%20494.5%20L%20320%20498.7%20L%20340%20501.6%20L%20360%20502.5%20L%20380%20500.8%20L%20400%20496.3%20L%20420%20489.1%20L%20440%20479.8%20L%20460%20469.2%20L%20480%20458.4%20L%20500.00000000000006%20448.4%20L%20520%20440.2%20L%20540%20434.6%20L%20560%20431.8%20L%20580%20431.9%20L%20600%20434.3%20L%20620%20438.1%20L%20640%20442.3%20L%20660%20445.8%20L%20680%20447.7%20L%20700%20447.4%20L%20720%20444.6%20L%20740%20439.5%20L%20760%20432.8%20L%20780%20425.5%20L%20800%20418.6%20L%20820%20413.4%20L%20840%20410.7%20L%20860%20411.2%20L%20880%20415.2%20L%20900%20422.3%20L%20920%20432.0%20L%20940%20443.2%20L%20960%20454.8%20L%20979.9999999999999%20465.8%20L%201000.0000000000001%20475.2%20L%201020%20482.4%20L%201040%20486.9%20L%201060%20488.9%20L%201080%20488.8%20L%201100%20487.2%20L%201120%20484.6%20L%201140%20481.8%20L%201160%20479.2%20L%201180%20477.0%20L%201200%20475.2%20L%201220%20473.4%20L%201240%20471.4%20L%201260%20468.5%20L%201280%20464.6%20L%201300%20459.3%20L%201320%20452.8%20L%201340%20445.6%20L%201360%20438.3%20L%201380%20431.8%20L%201400%20427.0%20L%201420%20424.8%20L%201440%20425.7%20L%201460%20430.0%20L%201480%20437.3%20L%201500%20447.3%20L%201520%20458.9%20L%201540%20471.0%20L%201560%20482.4%20L%201580%20492.1%20L%201600%20499.4%20L%201620%20503.9%20L%201640%20505.6%20L%201660%20505.1%20L%201680%20503.2%20L%201700%20501.0%20L%201720%20499.5%20L%201740%20499.6%20L%201760%20501.8%20L%201780%20506.4%20L%201800%20513.1%20L%201820%20521.1%20L%201840%20529.5%20L%201860%20537.3%20L%201880%20543.2%20L%201900%20546.5%20L%201920%20547.4%20L%201920%201080%20L%200%201080%20Z%22%20fill%3D%22url(%23cg1)%22%2F%3E%3Cpath%20d%3D%22M%200%20578.9%20L%2020%20582.7%20L%2040%20586.7%20L%2060%20589.4%20L%2080%20591.6%20L%20100%20593.8%20L%20120%20596.3%20L%20140%20599.0%20L%20160%20601.5%20L%20180%20603.3%20L%20200%20603.8%20L%20220%20602.4%20L%20240%20598.7%20L%20260%20592.8%20L%20280%20584.9%20L%20300%20575.7%20L%20320%20566.1%20L%20340%20557.1%20L%20360%20549.8%20L%20380%20544.9%20L%20400%20542.8%20L%20420%20543.7%20L%20440%20547.2%20L%20460%20552.7%20L%20480%20559.3%20L%20500.00000000000006%20566.1%20L%20520%20572.3%20L%20540%20577.4%20L%20560%20581.1%20L%20580%20583.9%20L%20600%20586.2%20L%20620%20588.9%20L%20640%20593.0%20L%20660%20599.5%20L%20680%20608.9%20L%20700%20621.4%20L%20720%20636.9%20L%20740%20654.5%20L%20760%20673.0%20L%20780%20690.9%20L%20800%20706.7%20L%20820%20718.8%20L%20840%20726.2%20L%20860%20728.2%20L%20880%20724.6%20L%20900%20715.9%20L%20920%20703.2%20L%20940%20687.7%20L%20960%20671.0%20L%20979.9999999999999%20654.4%20L%201000.0000000000001%20639.2%20L%201020%20626.4%20L%201040%20616.3%20L%201060%20608.9%20L%201080%20604.0%20L%201100%20600.8%20L%201120%20598.7%20L%201140%20597.1%20L%201160%20595.6%20L%201180%20593.9%20L%201200%20592.3%20L%201220%20591.2%20L%201240%20591.2%20L%201260%20592.7%20L%201280%20596.3%20L%201300%20602.0%20L%201320%20609.9%20L%201340%20619.3%20L%201360%20629.5%20L%201380%20639.4%20L%201400%20648.1%20L%201420%20654.5%20L%201440%20657.9%20L%201460%20658.1%20L%201480%20655.1%20L%201500%20649.5%20L%201520%20642.1%20L%201540%20633.9%20L%201560%20625.9%20L%201580%20619.1%20L%201600%20614.0%20L%201620%20610.7%20L%201640%20608.8%20L%201660%20607.8%20L%201680%20606.6%20L%201700%20604.1%20L%201720%20599.3%20L%201740%20591.7%20L%201760%20580.8%20L%201780%20567.0%20L%201800%20550.9%20L%201820%20533.7%20L%201840%20516.9%20L%201860%20501.9%20L%201880%20490.3%20L%201900%20483.0%20L%201920%20479.9%20L%201920%201080%20L%200%201080%20Z%22%20fill%3D%22url(%23cg2)%22%2F%3E%3C%2Fsvg%3E");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
body[data-ds-dark-theme] .pI_x6G_frame {
  background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201920%201200%22%20preserveAspectRatio%3D%22xMidYMid%20slice%22%3E%3Cdefs%3E%0A%3Cfilter%20id%3D%22haze%22%3E%3CfeGaussianBlur%20stdDeviation%3D%2222%22%2F%3E%3C%2Ffilter%3E%0A%3CradialGradient%20id%3D%22moonglow%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23E6EFF1%22%20stop-opacity%3D%220.42%22%2F%3E%3Cstop%20offset%3D%220.45%22%20stop-color%3D%22%23D8E4E6%22%20stop-opacity%3D%220.15%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23D8E4E6%22%20stop-opacity%3D%220%22%2F%3E%3C%2FradialGradient%3E%0A%3ClinearGradient%20id%3D%22m0%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%238496A2%22%20stop-opacity%3D%220.60%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%233C4F5D%22%20stop-opacity%3D%220.36%22%2F%3E%3C%2FlinearGradient%3E%0A%3ClinearGradient%20id%3D%22m1%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%233E5160%22%20stop-opacity%3D%220.72%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231A252D%22%20stop-opacity%3D%220.46%22%2F%3E%3C%2FlinearGradient%3E%0A%3ClinearGradient%20id%3D%22m2%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%232C3A46%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23070A0D%22%2F%3E%3C%2FlinearGradient%3E%0A%3ClinearGradient%20id%3D%22water%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%230A1015%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23070A0D%22%2F%3E%3C%2FlinearGradient%3E%0A%3ClinearGradient%20id%3D%22shaft%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23DCE7E9%22%20stop-opacity%3D%220.26%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%238FA6AA%22%20stop-opacity%3D%220%22%2F%3E%3C%2FlinearGradient%3E%0A%3C%2Fdefs%3E%0A%3Crect%20width%3D%221920%22%20height%3D%221200%22%20fill%3D%22%230B0F14%22%2F%3E%0A%3Cellipse%20cx%3D%221490%22%20cy%3D%22302%22%20rx%3D%22215%22%20ry%3D%22195%22%20fill%3D%22url(%23moonglow)%22%2F%3E%0A%3Ccircle%20cx%3D%221490%22%20cy%3D%22302%22%20r%3D%2246%22%20fill%3D%22%23E4EDEF%22%20fill-opacity%3D%220.92%22%2F%3E%0A%3Cpath%20d%3D%22M%200%20447%20L%2020%20448.6%20L%2040%20448.6%20L%2060%20445.6%20L%2080%20439.9%20L%20100%20432.3%20L%20120%20423.4%20L%20140%20414.3%20L%20160%20405.7%20L%20180%20398.2%20L%20200%20392.2%20L%20220%20387.8%20L%20240%20384.9%20L%20260%20383%20L%20280%20382%20L%20300%20381.4%20L%20320%20381.1%20L%20340%20381%20L%20360%20381.2%20L%20380%20382.3%20L%20400%20384.5%20L%20420%20388.4%20L%20440%20394.2%20L%20460%20402.1%20L%20480%20411.9%20L%20500.00000000000006%20423.1%20L%20520%20435%20L%20540%20446.6%20L%20560%20456.9%20L%20580%20464.8%20L%20600%20469.6%20L%20620%20470.9%20L%20640%20468.5%20L%20660%20462.7%20L%20680%20454.2%20L%20700%20444%20L%20720%20433.1%20L%20740%20422.5%20L%20760%20413.2%20L%20780%20405.6%20L%20800%20400.1%20L%20820%20396.5%20L%20840%20394.3%20L%20860%20392.9%20L%20880%20391.4%20L%20900%20389.2%20L%20920%20385.7%20L%20940%20380.6%20L%20960%20373.9%20L%20979.9999999999999%20366.2%20L%201000.0000000000001%20358%20L%201020%20350.2%20L%201040%20343.5%20L%201060%20338.7%20L%201080%20336.4%20L%201100%20336.7%20L%201120%20339.5%20L%201140%20344.5%20L%201160%20350.9%20L%201180%20358%20L%201200%20365.1%20L%201220%20371.5%20L%201240%20376.7%20L%201260%20380.6%20L%201280%20383.2%20L%201300%20384.7%20L%201320%20385.5%20L%201340%20386.1%20L%201360%20386.6%20L%201380%20387.2%20L%201400%20387.8%20L%201420%20388.2%20L%201440%20387.8%20L%201460%20386.1%20L%201480%20382.6%20L%201500%20377%20L%201520%20369.1%20L%201540%20359.1%20L%201560%20347.5%20L%201580%20335.3%20L%201600%20323.3%20L%201620%20312.7%20L%201640%20304.5%20L%201660%20299.5%20L%201680%20298.1%20L%201700%20300.3%20L%201720%20305.9%20L%201740%20314%20L%201760%20323.8%20L%201780%20334.1%20L%201800%20343.9%20L%201820%20352.4%20L%201840%20358.9%20L%201860%20363.4%20L%201880%20365.8%20L%201900%20366.8%20L%201920%20367.1%20L%201920%201200%20L%200%201200%20Z%22%20fill%3D%22url(%23m0)%22%20opacity%3D%220.85%22%2F%3E%0A%3Cellipse%20cx%3D%22960%22%20cy%3D%22612%22%20rx%3D%22900%22%20ry%3D%2262%22%20fill%3D%22%23E4EDF0%22%20fill-opacity%3D%220.10%22%20filter%3D%22url(%23haze)%22%2F%3E%0A%3Cpath%20d%3D%22M%200%20644.7%20L%2020%20641.8%20L%2040%20638.4%20L%2060%20635.7%20L%2080%20633.6%20L%20100%20631.8%20L%20120%20630%20L%20140%20627.4%20L%20160%20623.7%20L%20180%20618.3%20L%20200%20611.1%20L%20220%20602.2%20L%20240%20592%20L%20260%20581.1%20L%20280%20570.4%20L%20300%20560.9%20L%20320%20553.5%20L%20340%20548.9%20L%20360%20547.6%20L%20380%20549.8%20L%20400%20555.2%20L%20420%20563.4%20L%20440%20573.5%20L%20460%20584.6%20L%20480%20595.8%20L%20500.00000000000006%20606.2%20L%20520%20615.3%20L%20540%20622.6%20L%20560%20628%20L%20580%20631.8%20L%20600%20634.2%20L%20620%20635.7%20L%20640%20636.7%20L%20660%20637.5%20L%20680%20638.4%20L%20700%20639.2%20L%20720%20639.9%20L%20740%20640.1%20L%20760%20639.4%20L%20780%20637.7%20L%20800%20634.6%20L%20820%20630.2%20L%20840%20624.8%20L%20860%20618.7%20L%20880%20612.5%20L%20900%20606.9%20L%20920%20602.4%20L%20940%20599.5%20L%20960%20598.6%20L%20979.9999999999999%20599.8%20L%201000.0000000000001%20602.7%20L%201020%20607%20L%201040%20612.2%20L%201060%20617.6%20L%201080%20622.7%20L%201100%20627.1%20L%201120%20630.5%20L%201140%20633.2%20L%201160%20635.4%20L%201180%20637.5%20L%201200%20640.3%20L%201220%20644.2%20L%201240%20649.7%20L%201260%20656.9%20L%201280%20665.9%20L%201300%20676.1%20L%201320%20686.9%20L%201340%20697.5%20L%201360%20706.8%20L%201380%20714.1%20L%201400%20718.6%20L%201420%20719.9%20L%201440%20717.8%20L%201460%20712.6%20L%201480%20704.8%20L%201500%20695.1%20L%201520%20684.6%20L%201540%20674%20L%201560%20664.2%20L%201580%20655.7%20L%201600%20648.9%20L%201620%20643.8%20L%201640%20640.2%20L%201660%20637.9%20L%201680%20636.5%20L%201700%20635.6%20L%201720%20634.9%20L%201740%20634.4%20L%201760%20634.1%20L%201780%20634.3%20L%201800%20635.3%20L%201820%20637.2%20L%201840%20640.5%20L%201860%20645.2%20L%201880%20651.1%20L%201900%20657.8%20L%201920%20663.2%20L%201920%201200%20L%200%201200%20Z%22%20fill%3D%22url(%23m1)%22%2F%3E%0A%3Cellipse%20cx%3D%22950%22%20cy%3D%22800%22%20rx%3D%22860%22%20ry%3D%2256%22%20fill%3D%22%23E4EDF0%22%20fill-opacity%3D%220.085%22%20filter%3D%22url(%23haze)%22%2F%3E%0A%3Cpath%20d%3D%22M%200%20808.3%20L%2020%20808.1%20L%2040%20807.2%20L%2060%20805.3%20L%2080%20802.7%20L%20100%20799.6%20L%20120%20796.6%20L%20140%20794.2%20L%20160%20792.7%20L%20180%20792.4%20L%20200%20793.4%20L%20220%20795.6%20L%20240%20798.5%20L%20260%20801.8%20L%20280%20804.9%20L%20300%20807.3%20L%20320%20808.8%20L%20340%20809.3%20L%20360%20808.9%20L%20380%20807.9%20L%20400%20806.7%20L%20420%20806%20L%20440%20806.1%20L%20460%20807.4%20L%20480%20810%20L%20500.00000000000006%20813.7%20L%20520%20818.1%20L%20540%20822.7%20L%20560%20826.5%20L%20580%20828.9%20L%20600%20829.2%20L%20620%20827.1%20L%20640%20822.2%20L%20660%20815%20L%20680%20805.8%20L%20700%20795.5%20L%20720%20785%20L%20740%20775.3%20L%20760%20767.2%20L%20780%20761.3%20L%20800%20758%20L%20820%20757.3%20L%20840%20758.8%20L%20860%20762%20L%20880%20766.2%20L%20900%20770.7%20L%20920%20774.6%20L%20940%20777.6%20L%20960%20779.5%20L%20979.9999999999999%20780.1%20L%201000.0000000000001%20779.9%20L%201020%20779.1%20L%201040%20778.2%20L%201060%20777.8%20L%201080%20778.2%20L%201100%20779.5%20L%201120%20781.8%20L%201140%20784.6%20L%201160%20787.7%20L%201180%20790.5%20L%201200%20792.6%20L%201220%20793.5%20L%201240%20793.2%20L%201260%20791.6%20L%201280%20789%20L%201300%20785.7%20L%201320%20782.3%20L%201340%20779.2%20L%201360%20776.9%20L%201380%20775.6%20L%201400%20775.4%20L%201420%20775.9%20L%201440%20776.9%20L%201460%20777.7%20L%201480%20777.8%20L%201500%20776.8%20L%201520%20774.2%20L%201540%20770%20L%201560%20764.6%20L%201580%20758.3%20L%201600%20751.9%20L%201620%20746.2%20L%201640%20742.1%20L%201660%20740.3%20L%201680%20741.2%20L%201700%20745%20L%201720%20751.6%20L%201740%20760.3%20L%201760%20770.4%20L%201780%20780.9%20L%201800%20791%20L%201820%20799.8%20L%201840%20806.6%20L%201860%20811.1%20L%201880%20813.3%20L%201900%20813.4%20L%201920%20812.7%20L%201920%201200%20L%200%201200%20Z%22%20fill%3D%22url(%23m2)%22%2F%3E%0A%3Crect%20x%3D%220%22%20y%3D%22908%22%20width%3D%221920%22%20height%3D%22292%22%20fill%3D%22url(%23water)%22%2F%3E%0A%3Cellipse%20cx%3D%22960%22%20cy%3D%22914%22%20rx%3D%22980%22%20ry%3D%2230%22%20fill%3D%22%23E4EDF0%22%20opacity%3D%220.055%22%20filter%3D%22url(%23haze)%22%2F%3E%0A%3Cpath%20d%3D%22M%201456%20908%20L%201524%20908%20L%201548%201200%20L%201432%201200%20Z%22%20fill%3D%22url(%23shaft)%22%20opacity%3D%220.6%22%2F%3E%0A%3Cellipse%20cx%3D%221414.7%22%20cy%3D%22920%22%20rx%3D%2213.6%22%20ry%3D%222.8%22%20fill%3D%22%23DCE7E9%22%20opacity%3D%220.52%22%2F%3E%0A%3Cellipse%20cx%3D%221423.2%22%20cy%3D%22940.4%22%20rx%3D%2220.8%22%20ry%3D%222.8%22%20fill%3D%22%23DCE7E9%22%20opacity%3D%220.44%22%2F%3E%0A%3Cellipse%20cx%3D%221573.9%22%20cy%3D%22938.6%22%20rx%3D%2216.7%22%20ry%3D%222.8%22%20fill%3D%22%23DCE7E9%22%20opacity%3D%220.44%22%2F%3E%0A%3Cellipse%20cx%3D%221415%22%20cy%3D%22960.5%22%20rx%3D%2224.7%22%20ry%3D%222.8%22%20fill%3D%22%23DCE7E9%22%20opacity%3D%220.36%22%2F%3E%0A%3Cellipse%20cx%3D%221498%22%20cy%3D%22959.5%22%20rx%3D%2220.4%22%20ry%3D%222.8%22%20fill%3D%22%23DCE7E9%22%20opacity%3D%220.36%22%2F%3E%0A%3Cellipse%20cx%3D%221583.7%22%20cy%3D%22960.8%22%20rx%3D%2223.1%22%20ry%3D%222.8%22%20fill%3D%22%23DCE7E9%22%20opacity%3D%220.36%22%2F%3E%0A%3Cellipse%20cx%3D%221432.6%22%20cy%3D%22990.6%22%20rx%3D%2218.6%22%20ry%3D%222.8%22%20fill%3D%22%23DCE7E9%22%20opacity%3D%220.29%22%2F%3E%0A%3Cellipse%20cx%3D%221464.7%22%20cy%3D%22993%22%20rx%3D%2230.2%22%20ry%3D%222.8%22%20fill%3D%22%23DCE7E9%22%20opacity%3D%220.29%22%2F%3E%0A%3Cellipse%20cx%3D%221512%22%20cy%3D%22994.5%22%20rx%3D%2218.3%22%20ry%3D%222.8%22%20fill%3D%22%23DCE7E9%22%20opacity%3D%220.29%22%2F%3E%0A%3Cellipse%20cx%3D%221583%22%20cy%3D%22993.7%22%20rx%3D%2229.8%22%20ry%3D%222.8%22%20fill%3D%22%23DCE7E9%22%20opacity%3D%220.29%22%2F%3E%0A%3Cellipse%20cx%3D%221409.7%22%20cy%3D%221030.4%22%20rx%3D%2231%22%20ry%3D%222.8%22%20fill%3D%22%23DCE7E9%22%20opacity%3D%220.23%22%2F%3E%0A%3Cellipse%20cx%3D%221473.6%22%20cy%3D%221029.8%22%20rx%3D%2227.8%22%20ry%3D%222.8%22%20fill%3D%22%23DCE7E9%22%20opacity%3D%220.23%22%2F%3E%0A%3Cellipse%20cx%3D%221502.2%22%20cy%3D%221027.6%22%20rx%3D%2233.1%22%20ry%3D%222.8%22%20fill%3D%22%23DCE7E9%22%20opacity%3D%220.23%22%2F%3E%0A%3Cellipse%20cx%3D%221523.5%22%20cy%3D%221025.7%22%20rx%3D%2224.2%22%20ry%3D%222.8%22%20fill%3D%22%23DCE7E9%22%20opacity%3D%220.23%22%2F%3E%0A%3Cellipse%20cx%3D%221588.5%22%20cy%3D%221025.9%22%20rx%3D%2234.4%22%20ry%3D%222.8%22%20fill%3D%22%23DCE7E9%22%20opacity%3D%220.23%22%2F%3E%0A%3Cellipse%20cx%3D%221432%22%20cy%3D%221069.8%22%20rx%3D%2238.5%22%20ry%3D%222.8%22%20fill%3D%22%23DCE7E9%22%20opacity%3D%220.175%22%2F%3E%0A%3Cellipse%20cx%3D%221431.4%22%20cy%3D%221067.8%22%20rx%3D%2228.8%22%20ry%3D%222.8%22%20fill%3D%22%23DCE7E9%22%20opacity%3D%220.175%22%2F%3E%0A%3Cellipse%20cx%3D%221483%22%20cy%3D%221067.8%22%20rx%3D%2236.7%22%20ry%3D%222.8%22%20fill%3D%22%23DCE7E9%22%20opacity%3D%220.175%22%2F%3E%0A%3Cellipse%20cx%3D%221518.8%22%20cy%3D%221069.8%22%20rx%3D%2232.6%22%20ry%3D%222.8%22%20fill%3D%22%23DCE7E9%22%20opacity%3D%220.175%22%2F%3E%0A%3Cellipse%20cx%3D%221520.5%22%20cy%3D%221072%22%20rx%3D%2233.8%22%20ry%3D%222.8%22%20fill%3D%22%23DCE7E9%22%20opacity%3D%220.175%22%2F%3E%0A%3Cellipse%20cx%3D%221577.2%22%20cy%3D%221072.3%22%20rx%3D%2235.8%22%20ry%3D%222.8%22%20fill%3D%22%23DCE7E9%22%20opacity%3D%220.175%22%2F%3E%0A%3Cellipse%20cx%3D%221413.6%22%20cy%3D%221115.7%22%20rx%3D%2229.6%22%20ry%3D%222.8%22%20fill%3D%22%23DCE7E9%22%20opacity%3D%220.13%22%2F%3E%0A%3Cellipse%20cx%3D%221467.2%22%20cy%3D%221117.6%22%20rx%3D%2243.4%22%20ry%3D%222.8%22%20fill%3D%22%23DCE7E9%22%20opacity%3D%220.13%22%2F%3E%0A%3Cellipse%20cx%3D%221459.8%22%20cy%3D%221119.9%22%20rx%3D%2224.7%22%20ry%3D%222.8%22%20fill%3D%22%23DCE7E9%22%20opacity%3D%220.13%22%2F%3E%0A%3Cellipse%20cx%3D%221493.5%22%20cy%3D%221120.4%22%20rx%3D%2243.6%22%20ry%3D%222.8%22%20fill%3D%22%23DCE7E9%22%20opacity%3D%220.13%22%2F%3E%0A%3Cellipse%20cx%3D%221540.9%22%20cy%3D%221118.8%22%20rx%3D%2228.7%22%20ry%3D%222.8%22%20fill%3D%22%23DCE7E9%22%20opacity%3D%220.13%22%2F%3E%0A%3Cellipse%20cx%3D%221531.4%22%20cy%3D%221116.4%22%20rx%3D%2242.4%22%20ry%3D%222.8%22%20fill%3D%22%23DCE7E9%22%20opacity%3D%220.13%22%2F%3E%0A%3Cellipse%20cx%3D%221573.6%22%20cy%3D%221115.5%22%20rx%3D%2233.4%22%20ry%3D%222.8%22%20fill%3D%22%23DCE7E9%22%20opacity%3D%220.13%22%2F%3E%0A%3Cellipse%20cx%3D%221416.5%22%20cy%3D%221173.7%22%20rx%3D%2240.8%22%20ry%3D%222.8%22%20fill%3D%22%23DCE7E9%22%20opacity%3D%220.095%22%2F%3E%0A%3Cellipse%20cx%3D%221422.2%22%20cy%3D%221174.5%22%20rx%3D%2240.9%22%20ry%3D%222.8%22%20fill%3D%22%23DCE7E9%22%20opacity%3D%220.095%22%2F%3E%0A%3Cellipse%20cx%3D%221485.2%22%20cy%3D%221173%22%20rx%3D%2244.5%22%20ry%3D%222.8%22%20fill%3D%22%23DCE7E9%22%20opacity%3D%220.095%22%2F%3E%0A%3Cellipse%20cx%3D%221485.8%22%20cy%3D%221170.6%22%20rx%3D%2236.3%22%20ry%3D%222.8%22%20fill%3D%22%23DCE7E9%22%20opacity%3D%220.095%22%2F%3E%0A%3Cellipse%20cx%3D%221500.9%22%20cy%3D%221169.5%22%20rx%3D%2246.9%22%20ry%3D%222.8%22%20fill%3D%22%23DCE7E9%22%20opacity%3D%220.095%22%2F%3E%0A%3Cellipse%20cx%3D%221561.7%22%20cy%3D%221170.7%22%20rx%3D%2231.1%22%20ry%3D%222.8%22%20fill%3D%22%23DCE7E9%22%20opacity%3D%220.095%22%2F%3E%0A%3Cellipse%20cx%3D%221555.4%22%20cy%3D%221173.1%22%20rx%3D%2248.1%22%20ry%3D%222.8%22%20fill%3D%22%23DCE7E9%22%20opacity%3D%220.095%22%2F%3E%0A%3Crect%20x%3D%221424%22%20y%3D%221136%22%20width%3D%22132%22%20height%3D%229%22%20rx%3D%224%22%20fill%3D%22%23C9A46A%22%20opacity%3D%220.08%22%20filter%3D%22url(%23haze)%22%2F%3E%0A%3Crect%20x%3D%22266%22%20y%3D%22952%22%20width%3D%2296%22%20height%3D%222%22%20rx%3D%221%22%20fill%3D%22%23C6D2D6%22%20opacity%3D%220.13%22%2F%3E%0A%3Crect%20x%3D%22470%22%20y%3D%221000%22%20width%3D%22140%22%20height%3D%222%22%20rx%3D%221%22%20fill%3D%22%23C6D2D6%22%20opacity%3D%220.09%22%2F%3E%0A%3Cellipse%20cx%3D%221150%22%20cy%3D%221018%22%20rx%3D%2292%22%20ry%3D%2222%22%20fill%3D%22%23E4EDF0%22%20opacity%3D%220.10%22%20filter%3D%22url(%23haze)%22%2F%3E%0A%3Cg%20fill%3D%22%2304070A%22%3E%0A%20%20%3Cpath%20d%3D%22M%201111%201000%20Q%201150%201026%201189%201000%20Z%22%2F%3E%0A%20%20%3Crect%20x%3D%221128%22%20y%3D%22928%22%20width%3D%222.6%22%20height%3D%2272%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M%201131%20932%20L%201131%20980%20L%201176%20980%20Z%22%2F%3E%0A%3C%2Fg%3E%0A%3Cellipse%20cx%3D%221150%22%20cy%3D%221015%22%20rx%3D%2252%22%20ry%3D%225%22%20fill%3D%22%2304070A%22%20opacity%3D%220.55%22%20filter%3D%22url(%23haze)%22%2F%3E%0A%3Ccircle%20cx%3D%221128%22%20cy%3D%22922%22%20r%3D%227%22%20fill%3D%22%23D8B374%22%20fill-opacity%3D%220.85%22%2F%3E%0A%3Cellipse%20cx%3D%221128%22%20cy%3D%22922%22%20rx%3D%2226%22%20ry%3D%2222%22%20fill%3D%22%23C9A46A%22%20opacity%3D%220.16%22%20filter%3D%22url(%23haze)%22%2F%3E%0A%3C%2Fsvg%3E");
}


/* 对话区根容器半透明，透出山水（消息气泡保持不透明）
   conversation 的 CSS 后注入，故用 body 前缀 + !important 确保覆盖 */
body .wSkVaW_root {
  background: rgba(247, 245, 239, 0.85) !important;
}
body[data-ds-dark-theme] .wSkVaW_root {
  background: rgba(16, 21, 26, 0.90) !important;
}
`;

		function injectStyles(css, tagId) {
			if (typeof document === "undefined") return;
			if (document.querySelector('style[data-plugin-css="' + tagId + '"]')) return;
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-theme-songgrid";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}

		// ---- 持久化契约 -----------------------------------------------------
		const THEMES_NAMESPACE = "songgrid";
		const THEME_FIELD = "theme";
		const DEFAULT_SELECTION = "system";
		function isThemeSelection(value) {
			return typeof value === "string";
		}

		// ---- 选择控制器 -----------------------------------------------------
		const BUILTIN_IDS = new Set(["light", "dark"]);
		const BUILTIN_ALL_IDS = new Set(["light", "dark", "system"]);
		/** 两个宋律变体 → 各自对应的内置明暗方案。 */
		const SONGGRID_VARIANTS = Object.freeze({
			"song-grid-xuanzhi": "light",
			"song-grid-yemo": "dark"
		});
		/** 持久化哨兵：songgrid 命名空间的 theme 字段为它时，override 层应当是挂着的。 */
		const SONGGRID_SELECTION = "songgrid";
		function isSonggridSelection(value) {
			return value === SONGGRID_SELECTION || SONGGRID_VARIANTS[value] !== void 0;
		}
		/**
		 * 0.1.5 的 ThemeRuntime 只允许 light/dark/system 进入 theme 命名空间，而 settings
		 * scope 订阅的是**整份**设置镜像 —— 第三方主题一旦被持久化，adopt() 就会把偏好
		 * 拉回内置值，刚选中的主题随即被撤销（实测 0.1.0-rc.6 的写法在 rc.2 上失效）。
		 * 因此改用官方给动态包留的口子：ctx.theme.overrideTokens() 叠一层调色板，
		 * 明暗方案仍旧交给内置偏好。这样官方外观行、持久化、跟随系统都保持正常。
		 */
		function buildLayer(lightTokens, darkTokens) {
			const layer = {};
			for (const name of new Set([...Object.keys(lightTokens), ...Object.keys(darkTokens)])) {
				const fallback = lightTokens[name] ?? darkTokens[name];
				layer[name] = {
					light: lightTokens[name] ?? fallback,
					dark: darkTokens[name] ?? fallback
				};
			}
			return layer;
		}
		const SONGGRID_LAYER = Object.freeze(buildLayer(light.tokens, dark.tokens));

		function createPickerStore() {
			return (0, _deepseek_ai_dsh_client_store.defineStore)({
				init: () => ({
					preference: "system",
					activeId: "dark",
					themes: [],
					revision: -1,
					songgrid: false
				}),
				actions: { sync: (draft, state) => {
					if (state.revision < draft.revision) return;
					if (state.revision === draft.revision && state.songgrid === draft.songgrid) return;
					draft.preference = state.preference;
					draft.activeId = state.activeId;
					draft.themes = state.themes;
					draft.revision = state.revision;
					draft.songgrid = state.songgrid;
				} }
			});
		}

		// ---- 选择器行组件 ---------------------------------------------------
		const BUILTINS = [
			{ id: "light", label: "浅色" },
			{ id: "dark", label: "深色" },
			{ id: "system", label: "跟随系统" }
		];
		const THEME_LABELS = {
			"song-grid-xuanzhi": "宋律·宣纸",
			"song-grid-yemo": "宋律·夜墨"
		};
		const SONGGRID_VARIANT_IDS = Object.freeze(Object.keys(SONGGRID_VARIANTS));

		function ThemePickerRow({ useStore, setTheme, faces }) {
			const preference = useStore((state) => state.preference);
			const activeId = useStore((state) => state.activeId);
			const songgrid = useStore((state) => state.songgrid);
			// 宋律开启时，勾选跟着当前明暗方案走（宣纸=浅色，夜墨=深色）。
			const checked = songgrid ? (activeId === "dark" ? "song-grid-yemo" : "song-grid-xuanzhi") : preference;
			const ids = [...BUILTINS.map((entry) => entry.id), ...SONGGRID_VARIANT_IDS];
			const checkedIndex = ids.indexOf(checked);

			const radioProps = (id) => ({
				type: "button",
				role: "radio",
				"aria-checked": checked === id,
				tabIndex: (checkedIndex < 0 ? id === ids[0] : checked === id) ? 0 : -1,
				onClick: () => {
					setTheme(id);
				}
			});

			return (0, react_jsx_runtime.jsxs)("div", {
				className: "songgrid-group",
				children: [
					(0, react_jsx_runtime.jsx)("div", { className: "songgrid-title", children: "主题" }),
					(0, react_jsx_runtime.jsx)("div", { role: "radiogroup", children: [
						(0, react_jsx_runtime.jsx)("div", {
							className: "songgrid-cubeRow",
							children: BUILTINS.map(({ id, label }) => (0, react_jsx_runtime.jsx)("button", {
								...radioProps(id),
								className: ["songgrid-themeCube", checked === id && "songgrid-selected"].filter(Boolean).join(" "),
								children: label
							}, id))
						}),
						(0, react_jsx_runtime.jsx)("div", {
							className: "songgrid-themeList",
							children: SONGGRID_VARIANT_IDS.map((id) => {
								const face = faces[id];
								const label = THEME_LABELS[id] ?? id;
								return (0, react_jsx_runtime.jsxs)("button", {
									...radioProps(id),
									className: ["songgrid-themeItem", checked === id && "songgrid-selected"].filter(Boolean).join(" "),
									children: [
										face !== void 0 && (0, react_jsx_runtime.jsx)("span", {
											className: "songgrid-swatch",
											style: { background: face.base },
											children: (0, react_jsx_runtime.jsx)("span", {
												className: "songgrid-swatchAccent",
												style: { background: face.accent }
											})
										}),
										(0, react_jsx_runtime.jsx)("span", { className: "songgrid-themeName", children: label }),
										(0, react_jsx_runtime.jsx)("span", { className: "songgrid-tick" })
									]
								}, id);
							})
						})
					] })
				]
			});
		}

		const THEME_FACES = Object.freeze(Object.fromEntries([light, dark].map((theme) => [theme.id, Object.freeze({
			base: theme.tokens["--dsw-alias-bg-base"],
			accent: theme.tokens["--dsw-alias-brand-primary"]
		})])));

		// ---- 客户端插件体 ---------------------------------------------------
		const inject = ["theme", "configForms", "slots"];

		function apply(ctx) {
			injectStyles(STRUCTURE_CSS, "dsh-theme-songgrid/structure.css");
			injectStyles(ICON_CSS, "dsh-theme-songgrid/icons.css");
			injectStyles(SEMANTIC_CSS, "dsh-theme-songgrid/semantic.css");
			injectStyles(TYPO_CSS, "dsh-theme-songgrid/typo.css");
			injectStyles(PICKER_CSS, "dsh-theme-songgrid/picker.css");
			injectStyles(BACKGROUND_CSS, "dsh-theme-songgrid/background.css");

			const theme = ctx.theme;
			// 0.2.0-rc.2：ctx.settingsScope.bind({namespace}) 已移除，等价物是 ctx.configForms.get(ns)
			// （dsh-client-ui-settings 提供的 configForms 服务），快照同样是 { status, value }。
			const scope = ctx.configForms.get(THEMES_NAMESPACE);
			const store = createPickerStore();
			/** 当前挂着的 Songgrid override 层；undefined = 未启用。 */
			let disableLayer;
			let layerActive = false;
			let bound;
			const mirror = () => {
				const snapshot = theme.getTheme();
				return {
					preference: snapshot.preference,
					activeId: snapshot.active.id,
					themes: snapshot.themes,
					revision: snapshot.revision,
					songgrid: layerActive
				};
			};
			const syncStore = () => {
				bound?.sync(mirror());
			};
			const layerOn = () => layerActive;
			const enableLayer = () => {
				if (layerActive) return;
				// 先翻标志再叠层：overrideTokens 内部会同步 publish，监听器必须看到最新的开关状态。
				layerActive = true;
				disableLayer = theme.overrideTokens("song-grid-theme", SONGGRID_LAYER);
				syncStore();
			};
			const disableLayerNow = () => {
				if (!layerActive) return;
				layerActive = false;
				const dispose = disableLayer;
				disableLayer = void 0;
				dispose?.();
				syncStore();
			};
			const persist = (value) => {
				if (scope.getSnapshot().value?.theme === value) return;
				return scope.set(THEME_FIELD, value);
			};
			/** 选择器行的唯一写入入口：变体 = 叠层 + 明暗方案，内置 = 撤层 + 方案。 */
			const select = (id) => {
				const scheme = SONGGRID_VARIANTS[id];
				if (scheme !== void 0) {
					enableLayer();
					theme.setTheme(scheme);
					void persist(SONGGRID_SELECTION);
					return;
				}
				disableLayerNow();
				theme.setTheme(BUILTIN_ALL_IDS.has(id) ? id : DEFAULT_SELECTION);
				void persist(DEFAULT_SELECTION);
			};
			/** 恢复：只决定「层挂不挂」，明暗方案由内置主题偏好（含跟随系统）决定。 */
			const restore = () => {
				if (layerOn()) return;
				const snapshot = scope.getSnapshot();
				if (snapshot.status !== "ready") return;
				if (!isSonggridSelection(snapshot.value?.theme)) return;
				enableLayer();
			};
			const unsubscribe = scope.subscribe(restore);
			restore();

			ctx.effect(() => {
				const offChange = ctx.on("theme/change", () => {
					syncStore();
				});
				return () => {
					offChange();
					unsubscribe();
					disableLayerNow();
				};
			}, "songgrid: theme lifecycle");

			ctx.slots.inject("settings.general.item", () => ctx.slots.register({
				name: "settings.general.item",
				id: "songgrid",
				order: 11,
				store,
				inject: (actions) => {
					bound = actions;
					syncStore();
					return {
						faces: THEME_FACES,
						setTheme: (id) => {
							select(id);
						}
					};
				}
			}, ThemePickerRow));
		}

		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

