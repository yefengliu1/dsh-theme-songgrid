/**
 * 宋律 Songgrid 主题插件 —— host face。
 *
 * 持久化怎么工作（0.2.0-rc.2 实测）：
 *   settings 命名空间是按**宿主插件条目**服务的，条目声明了 `Config` 才会出现在
 *   `/api/settings/describe` 里 —— 宿主自己的主题条目就是 `id: ui-theme` +
 *   包内 `export const Config`（见 dsh-web-app/cordis.patch.yml 与
 *   dsh-client-ui-theme/lib/index.js）。命名空间名 = 条目 id，本插件的条目 id 是
 *   `song-grid-theme`（见本包 cordis.patch.yml），所以客户端要取 `song-grid-theme`。
 *
 *   这里踩过一次坑：早先照 0.1.5 的写法在运行时调 `ctx.settings.register("songgrid", schema)`
 *   —— 0.2.0-rc.2 上那样登记不进去，命名空间永远不被服务，客户端
 *   `configForms.get("songgrid")` 的 snapshot 停在 pending：选择写不进服务端，
 *   刷新也读不回来，只能退化成浏览器 localStorage。改成声明 Config 后，选择会写进
 *   本 profile 的 cordis 配置，**换浏览器/换机器都能恢复**。
 */
import z from "@deepseek-ai/schemastery";

/**
 * 选择值：`system` 哨兵（跟随宿主）或客户端写入的宋律标记/变体 id。
 *
 * `.volatile()` 是必须的，不是装饰：settings 的 `volatileForm()` 只把 **volatile**
 * 字段当作「可编辑的活配置」，非 volatile 字段算「普通配置」—— 一个都没有时整个
 * 条目会被 describe() 过滤掉，命名空间根本不会被服务（实测：不加它，19 个命名空间
 * 里没有 song-grid-theme；加上就有）。官方的 ui-theme 条目同样是
 * `preference/fontSize` 两个字段都标 `.volatile()`。
 */
export const Config = z.object({
	theme: z.string().default("system").volatile()
});

/** Optional services this host entry consumes. */
export const inject = ["settings"];

/**
 * Host plugin body.
 *
 * 除了上面的 Config 不再做任何注册；这里只声明「不要为本条目自动生成设置页」——
 * 官方的 ui-theme 条目也是这么做的（`settings.configure({ auto: false })`）。
 * 否则设置里会多出一个只有裸文本框的表单，而真正的选择器行由客户端半边注入到
 * 「设置 → 通用」，两处入口反而互相打架。
 */
export function apply(ctx) {
	ctx.inject(["settings"], (settingsCtx) => {
		settingsCtx.effect(() => settingsCtx.settings.configure({ auto: false }, ctx.fiber));
	});
}
