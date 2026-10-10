# Songgrid · 宋律

> Song-dynasty aesthetics × Swiss International Style — a theme for the **DeepSeek Harness** Web UI.

[中文](README.zh.md) ｜ **English**

[![npm](https://img.shields.io/npm/v/dsh-theme-songgrid?style=flat-square&color=3A7284)](https://www.npmjs.com/package/dsh-theme-songgrid)
[![license](https://img.shields.io/badge/license-MIT-26221C?style=flat-square)](#license)
[![dsh-plugin](https://img.shields.io/badge/dsh--plugin-community%20topic-9A6B50?style=flat-square)](https://github.com/topics/dsh-plugin)
[![DSH](https://img.shields.io/badge/DSH-0.2.0--rc.2-7FB4C4?style=flat-square)](#compatibility)

---

| Xuanzhi · light | Yemo · dark |
| --- | --- |
| ![Songgrid · Xuanzhi](docs/xuanzhi.png) | ![Songgrid · Yemo](docs/yemo.png) |

> The two variants, captured live (the sidebar is the [Eight Standing Seats](https://github.com/yefengliu1/dsh-agent-grid) board). *Card areas are redacted.*

## Why "Songgrid"

The warm white of rice paper, the celadon of Ru ware, the warning red of cinnabar — disciplined by Swiss International Style: a 4pt spacing scale, 2/4px radii, and type sizes locked to line heights.

This is not ancient styling pasted onto a UI. Every traditional colour is **placed on the functional role it can actually hold**.

### Two accents, two jobs

The one decision in this theme that looks like a duplicate but must not be collapsed:

| Role | Colour | Contrast (on paper) | Where it lands |
| --- | --- | ---: | --- |
| **Functional** · Ru celadon | `#3A7284` ![](https://img.shields.io/badge/-%20-3A7284?style=flat-square) | **4.91 : 1** ✓ AA | buttons · focus ring · selection · links |
| **Editorial** · kiln copper | `#9A6B50` ![](https://img.shields.io/badge/-%20-9A6B50?style=flat-square) | 4.19 : 1 | blockquotes · markers |

> Celadon passes WCAG AA, so it can carry "can I click this / is this selected". Kiln copper does not pass AA for body text, so it only carries "is this worth a second look".
> Their hues sit **174°** apart — they were never two candidates for one role.

## Two variants

| Variant | id | Character |
| --- | --- | --- |
| **Xuanzhi** (rice paper) | `song-grid-xuanzhi` | warm paper white × Ru celadon × cinnabar |
| **Yemo** (night ink) | `song-grid-yemo` | cool blue-black × brightened celadon |
| **Follow system** | `system` | switches with the host |

## Palette

### Xuanzhi · light

| Role | Value | |
| --- | --- | --- |
| Paper | `#F7F5EF` | ![](https://img.shields.io/badge/-%20-F7F5EF?style=flat-square) |
| Surface +1 | `#FBFAF6` | ![](https://img.shields.io/badge/-%20-FBFAF6?style=flat-square) |
| Surface +2 | `#F0EDE4` | ![](https://img.shields.io/badge/-%20-F0EDE4?style=flat-square) |
| Overlay | `#E7E3D8` | ![](https://img.shields.io/badge/-%20-E7E3D8?style=flat-square) |
| Hairline | `#DDD8CB` | ![](https://img.shields.io/badge/-%20-DDD8CB?style=flat-square) |
| Ink (primary text) | `#26221C` | ![](https://img.shields.io/badge/-%20-26221C?style=flat-square) |
| Secondary text | `#5C554A` | ![](https://img.shields.io/badge/-%20-5C554A?style=flat-square) |
| Tertiary text | `#8B8478` | ![](https://img.shields.io/badge/-%20-8B8478?style=flat-square) |
| Brand / functional | `#3A7284` | ![](https://img.shields.io/badge/-%20-3A7284?style=flat-square) |
| Editorial accent | `#9A6B50` | ![](https://img.shields.io/badge/-%20-9A6B50?style=flat-square) |
| Success | `#4E7A5A` | ![](https://img.shields.io/badge/-%20-4E7A5A?style=flat-square) |
| Warn | `#B0823A` | ![](https://img.shields.io/badge/-%20-B0823A?style=flat-square) |
| Cinnabar (error) | `#B5453C` | ![](https://img.shields.io/badge/-%20-B5453C?style=flat-square) |

### Yemo · dark

| Role | Value | |
| --- | --- | --- |
| Night ink | `#10151A` | ![](https://img.shields.io/badge/-%20-10151A?style=flat-square) |
| Surface +1 | `#191F26` | ![](https://img.shields.io/badge/-%20-191F26?style=flat-square) |
| Surface +2 | `#1D242B` | ![](https://img.shields.io/badge/-%20-1D242B?style=flat-square) |
| Primary text | `#E8E3D6` | ![](https://img.shields.io/badge/-%20-E8E3D6?style=flat-square) |
| Secondary text | `#A8A193` | ![](https://img.shields.io/badge/-%20-A8A193?style=flat-square) |
| Tertiary text | `#7A7468` | ![](https://img.shields.io/badge/-%20-7A7468?style=flat-square) |
| Brand / functional | `#7FB4C4` | ![](https://img.shields.io/badge/-%20-7FB4C4?style=flat-square) |
| Error | `#D07A70` | ![](https://img.shields.io/badge/-%20-D07A70?style=flat-square) |

> The dark ground is a **cool** blue-black, tuned together with the celadon. Swapping it for a warm black means re-tuning the entire dark variant.

## Typography

- **Chinese** runs on a Song serif (`Noto Serif SC`); **Latin** stays sans-serif — each script gets its own face, never mixed
- Sizes are defined in pairs with their line heights (body / secondary / caption)
- Emphasis comes from **colour roles** (celadon vs. kiln copper), not from stacking bolds

## Structure layers

Three layers; two of them are **orthogonal to colour** — future palette work never touches them:

| Layer | Contents | Colour |
| --- | --- | :---: |
| `STRUCTURE_CSS` | spacing scale (4pt grid + semantic aliases) · 2/4px radii · 4 line-height steps · 5 motion durations + 3 curves · focus ring · icon sizes | no |
| `ICON_CSS` | 46 Lucide mask icons, following `currentColor` | no |
| `SEMANTIC_CSS` | accent role split (`--sg-accent-functional` / `--sg-accent-editorial`) | yes |

## Install

```bash
dsh plugin --profile web add dsh-theme-songgrid
```

Then **refresh the page** and pick 「宋律 · 宣纸」/「宋律 · 夜墨」/ follow-system under **Settings → General → Theme**. The choice persists in the `songgrid` settings namespace.

## Compatibility

- Requires **DSH ≥ 0.2.0-rc.2** (`@deepseek-ai/dsh`); verified on 0.2.0-rc.2 — on 0.1.5-rc.2 install `dsh-theme-songgrid@0.1.0`
- Implemented purely by overriding host design tokens — **no host source is patched**, no raw values
- Not affiliated with DeepSeek

### Porting notes (0.1.5-rc.2 → 0.2.0-rc.2)

- `settingsScope` was removed: the theme preference scope is now `ctx.configForms.get("songgrid")` (the snapshot is still `{ status, value }`)
- The built `lib/client.js` must register under the **package name** in `__ModuleLoader__.load({ id })` — rebuild the bundle after any rename, or the boot aborts with `duplicate factory registration`

## Development

```bash
lib/index.js     host half: registers the songgrid settings namespace
lib/client.js    browser half: theme tokens + three CSS layers + theme picker
assets/          landscape backgrounds (ink / ink-night / celadon)
```

- **Structure layer**: tokens live in `:root`; add a step there. New styles take `var(--sg-gap-*)` / `var(--sg-radius-*)` — never raw values
- **Icons**: `<span class="sg-icon sg-icon-check"></span>`, 46 glyphs in `ICON_CSS`; sizes via `.sm` / `.lg` / `.xl` or `--sg-icon-size`
- **More editorial emphasis**: `--sg-accent-editorial` already exists in `SEMANTIC_CSS`; add selectors — the only rule is **never on an interactive control**, that slot belongs to the functional accent

## License

MIT
