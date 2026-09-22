/**
 * 宋律 Songgrid 主题插件 —— host face。
 * 注册持久化 settings namespace（"songgrid"），供浏览器侧选择器持久化主题选择。
 * 结构对齐官方 @dshthemes/ui 的 lib/index.js。
 */
import z from "@deepseek-ai/schemastery";

/** Settings namespace owned by this plugin. */
const THEMES_NAMESPACE = "songgrid";
/** Field carrying the selected theme id (or `system` sentinel). */
const THEME_FIELD = "theme";
/** Durable marker meaning "no override — follow the host". */
const DEFAULT_SELECTION = "system";

const THEME_PREFERENCE_SCHEMA = z.object({ [THEME_FIELD]: z.string().default(DEFAULT_SELECTION) });

/** Optional services this host entry consumes. */
export const inject = ["settings"];

/**
 * Host plugin body: register the durable `songgrid` namespace into the Host
 * settings service when one is composed, so the settings document accepts and
 * schema-validates the theme selection.
 */
export function apply(ctx) {
	ctx.inject(["settings"], (settingsCtx) => {
		settingsCtx.settings.register(THEMES_NAMESPACE, THEME_PREFERENCE_SCHEMA);
	});
}
