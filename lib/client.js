/**
 * moon-flavor · Pi 风格主题（DSH 2.0.17 适配版）
 *
 * v1.5.0（2026-10-16）：
 *   · 网格回到"直接画在会话根节点 background-image"的原方式（零伪元素/零遮罩/零额外合成层）。
 *   · 过渡选择器锚定：`[class*="row"]` 会命中 69 个语义名（连 arrow 都被卷进来），
 *     改为 `[class*="_row" i]` / `[class*="_item" i]`。
 *   · 本包已从 node_modules 移到 ~/.dsh/plugins-local/ 并以 link: 引用，
 *     避免 pnpm install 再次覆盖本地修改（2026-10-16 已发生过一次）。
 *
 * v1.3.0（2026-10-15）性能修复：
 *   1.2.0 用 MutationObserver 监听整棵 DOM 树，每次变动去抖 200ms 后重跑
 *   resolvePrefixes()，而它内部是**4 次全 DOM 扫描**（querySelectorAll('[class]')
 *   + 逐元素 classList 正则）。流式输出时 DOM 持续变动 → 最高每秒 5 次全量扫描，
 *   在大会话/多智能体场景下会把渲染主线程压住（宿主看门狗探针 10s 无返回即判
 *   "page did not respond"，连续 2 次就杀掉重启渲染进程）。
 *   v1.3.0 改为：
 *     · 启动阶段：250ms 间隔、最多 20s 的**有界重试**，拿到关键前缀后立即停止；
 *     · 稳定阶段：**不做任何全树扫描**，每 10s 只用 1 次廉价 querySelector 探活；
 *       仅当探活失败（前缀失效，例如宿主重新构建）才重新解析一次；
 *     · 全程无 MutationObserver，稳态开销 ≈ 每 10s 一次选择器查询。
 *   语义类名解析与 ::before 遮罩网格方案不变（那是为了免疫宿主哈希前缀变化）。
 */
window.__ModuleLoader__.load({
	id: "moon-flavor",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		const name = "moon-flavor";

		const CSS_TEMPLATE = `/* ============================================================
   Pi 风格主题 · Pi Style（复刻 pi.dev 设计语言）
   月光石米白 + 墨蓝灰文字 + 雾霾蓝强调 + 直角 + 衬线品牌 + 等宽细节
   ============================================================ */

/* ---------- 品牌（纯 CSS 替换：衬线斜体 Harness） ---------- */
.__sidebar_brand__ > svg,
.__sidebar_brand__ svg {
	display: none !important;
}
.__sidebar_brand__::after {
	content: "Harness";
	font-family: "Plantin MT Pro", "Plantin MT Std", Plantin, Georgia, "Times New Roman", "Songti SC", "SimSun", serif;
	font-style: italic;
	font-weight: 600;
	font-size: 19px;
	letter-spacing: 0.01em;
	white-space: nowrap;
	color: var(--dsw-alias-label-primary);
}

/* ---------- 浅色：月光石（对应 pi.dev 默认外观） ---------- */
body {
	--dsw-alias-bg-base: #EBE7E4;
	--dsw-alias-bg-layer-1: #F2EFED;
	--dsw-alias-bg-layer-2: #E4E0DC;
	--dsw-alias-bg-layer-3: #DCD7D2;
	--dsw-alias-bg-mask-1: rgba(56, 66, 81, 0.4);
	--dsw-alias-bg-mask-2: rgba(56, 66, 81, 0.6);
	--dsw-alias-bg-mask-3: rgba(56, 66, 81, 0.75);
	--dsw-alias-bg-mask-drop: rgba(56, 66, 81, 0.45);
	--dsw-alias-bg-mask-photo: rgba(56, 66, 81, 0.55);
	--dsw-alias-bg-module-platform: #F0EDEA;
	--dsw-alias-bg-multi-select: #D6E4EE;
	--dsw-alias-bg-overlay: rgba(235, 231, 228, 0.93);
	--dsw-alias-bg-skeleton: #DAD5D0;

	--dsw-alias-brand-primary: #6A9FCC;
	--dsw-alias-brand-primary-invert: #F6F4F2;
	--dsw-alias-brand-primary-new-colorprimary-new-color: #6A9FCC;
	--dsw-alias-brand-text: #5589B5;

	--dsw-alias-button-contrast-fill: #384251;
	--dsw-alias-button-elevated-fill: #F0EDEA;
	--dsw-alias-button-floating-fill: #F0EDEA;
	--dsw-alias-button-floating-hover: #E5E1DC;
	--dsw-alias-button-ghost-active-border: #6A9FCC;
	--dsw-alias-button-ghost-active-fill: #E3ECF2;
	--dsw-alias-button-ghost-active-hover: #D9E6EE;
	--dsw-alias-button-info-fill: #6A9FCC;
	--dsw-alias-button-info-hover: #5A90BE;
	--dsw-alias-button-primary-dimmed: rgba(106, 159, 204, 0.35);
	--dsw-alias-button-primary-fill: #6A9FCC;
	--dsw-alias-button-primary-hover: #5A90BE;
	--dsw-alias-button-tool-bar-fill: #F2EFED;
	--dsw-alias-button-tool-bar-fill-invisible: rgba(242, 239, 237, 0);
	--dsw-alias-button-tool-bar-hover: #E4E0DB;

	--dsw-alias-interactive-bg-active: rgba(106, 159, 204, 0.18);
	--dsw-alias-interactive-bg-hover: rgba(106, 159, 204, 0.12);
	--dsw-alias-interactive-bg-hover-accent: rgba(106, 159, 204, 0.15);
	--dsw-alias-interactive-bg-hover-danger: rgba(201, 106, 78, 0.12);
	--dsw-alias-interactive-bg-hover-solid: #6A9FCC;

	--dsw-alias-label-caption: #9B9C97;
	--dsw-alias-label-dimmed: #B4B1AB;
	--dsw-alias-label-primary: #384251;
	--dsw-alias-label-primary-bluish: #3F4A5A;
	--dsw-alias-label-primary-dimmed: #4E5968;
	--dsw-alias-label-primary-foreground: #F6F4F2;
	--dsw-alias-label-primary-inverted: #F2EFED;
	--dsw-alias-label-secondary: #5C6570;
	--dsw-alias-label-tertiary: #8A8F90;

	--dsw-alias-markdown-citation: #E3ECF2;
	--dsw-alias-markdown-code-block: #E6E2DD;
	--dsw-alias-markdown-code-block-banner: #DCD7D1;
	--dsw-alias-markdown-code-segment-selected: #D9E6EE;
	--dsw-alias-markdown-code-segment-unselected: #E4E0DB;
	--dsw-alias-markdown-inline-code: #E6E9E4;
	--dsw-alias-markdown-placeholder: #A6A49E;
	--dsw-alias-markdown-tag: #D6E4EE;

	--dsw-alias-border-inverted: #384251;
	--dsw-alias-border-inverted2: #2C343F;
	--dsw-alias-border-l1: #D8D3CD;
	--dsw-alias-border-l2: #CCC6BF;
	--dsw-alias-border-l2-darkmode-thin: #CCC6BF;
	--dsw-alias-border-l3: #BEB7AE;
	--dsw-alias-border-l4: #AFA79D;

	--dsw-alias-scrollbar-bg-l1: #D6D1CB;
	--dsw-alias-scrollbar-bg-l2: #C8C2BB;
	--dsw-alias-scrollbar-hover-l1: #B0A9A0;
	--dsw-alias-scrollbar-hover-l2: #A39B92;

	--dsw-alias-state-business-primary: #4B607C;
	--dsw-alias-state-business-tertiary: #DCE4EA;
	--dsw-alias-state-error-primary: #C96A4E;
	--dsw-alias-state-error-secondary: #F2E0D9;
	--dsw-alias-state-success-primary: #7A9B7E;
	--dsw-alias-state-success-secondary: #E2EAE0;
	--dsw-alias-state-success-tertiary: #C9DAC6;
	--dsw-alias-state-warn-label: #A4712F;
	--dsw-alias-state-warn-primary: #D99A52;
	--dsw-alias-state-warn-secondary: #F2E6D4;
	--dsw-alias-state-warn-tertiary: #E8D6BA;

	--dsw-alias-toast-bg: #F0EDEA;
	--dsw-alias-tooltip-bg: #384251;

	--dsw-specific-bubble: #F0EDEA;
	--dsw-specific-bubble-highlight: #E4E8E8;
	--dsw-specific-input-major: #F2EFEC;
	--dsw-specific-login-input: #F2EFED;
	--dsw-specific-menu: #F0EDEA;
	--dsw-specific-selector: #F2EFED;
	--dsw-specific-sidebar-fill: #E3DFDA;
	--dsw-specific-sidebar-nav-item-active: #D6E4EE;
	--dsw-specific-sidebar-nav-item-active-accent: #6A9FCC;
	--dsw-specific-sidebar-nav-item-hover: #DAD5CF;
	--dsw-specific-tip: #E3ECF2;

	--dsw-static-deepseek-100: #D6E4EE;
	--dsw-static-deepseek-200: #B8CFE0;
	--dsw-static-deepseek-300: #97BBD4;
	--dsw-static-deepseek-400: #7DACCB;
	--dsw-static-deepseek-450: #6A9FCC;
	--dsw-static-deepseek-50: #EDF2F5;
	--dsw-static-deepseek-500: #5A90BE;
	--dsw-static-deepseek-600: #4B7FA9;
	--dsw-static-deepseek-700-delete: #416F94;
	--dsw-static-deepseek-800: #385E7E;
	--dsw-static-deepseek-900: #26415A;
	--dsw-static-neutral-bluish-400: #6A9FCC;
}

/* ---------- 深色：暖炭灰墨（暖底 × 雾霾蓝强调） ---------- */
body[data-ds-dark-theme] {
	--dsw-alias-bg-base: #1B1A18;
	--dsw-alias-bg-layer-1: #21201D;
	--dsw-alias-bg-layer-2: #282722;
	--dsw-alias-bg-layer-3: #302E29;
	--dsw-alias-bg-mask-1: rgba(10, 10, 8, 0.45);
	--dsw-alias-bg-mask-2: rgba(10, 10, 8, 0.62);
	--dsw-alias-bg-mask-3: rgba(10, 10, 8, 0.78);
	--dsw-alias-bg-mask-drop: rgba(10, 10, 8, 0.5);
	--dsw-alias-bg-mask-photo: rgba(10, 10, 8, 0.58);
	--dsw-alias-bg-module-platform: #262521;
	--dsw-alias-bg-multi-select: #2E3740;
	--dsw-alias-bg-overlay: rgba(27, 26, 24, 0.93);
	--dsw-alias-bg-skeleton: #2E2C28;

	--dsw-alias-brand-primary: #7FB0D8;
	--dsw-alias-brand-primary-invert: #1B1A18;
	--dsw-alias-brand-primary-new-colorprimary-new-color: #7FB0D8;
	--dsw-alias-brand-text: #9DC6E4;

	--dsw-alias-button-contrast-fill: #8B857B;
	--dsw-alias-button-elevated-fill: #292824;
	--dsw-alias-button-floating-fill: #292824;
	--dsw-alias-button-floating-hover: #32302B;
	--dsw-alias-button-ghost-active-border: #6A9FCC;
	--dsw-alias-button-ghost-active-fill: #27303B;
	--dsw-alias-button-ghost-active-hover: #2E3945;
	--dsw-alias-button-info-fill: #6A9FCC;
	--dsw-alias-button-info-hover: #7FB0D8;
	--dsw-alias-button-primary-dimmed: rgba(106, 159, 204, 0.35);
	--dsw-alias-button-primary-fill: #6A9FCC;
	--dsw-alias-button-primary-hover: #7FB0D8;
	--dsw-alias-button-tool-bar-fill: #21201D;
	--dsw-alias-button-tool-bar-fill-invisible: rgba(33, 32, 29, 0);
	--dsw-alias-button-tool-bar-hover: #2B2A26;

	--dsw-alias-interactive-bg-active: rgba(127, 176, 216, 0.22);
	--dsw-alias-interactive-bg-hover: rgba(127, 176, 216, 0.14);
	--dsw-alias-interactive-bg-hover-accent: rgba(127, 176, 216, 0.18);
	--dsw-alias-interactive-bg-hover-danger: rgba(232, 112, 79, 0.15);
	--dsw-alias-interactive-bg-hover-solid: #6A9FCC;

	--dsw-alias-label-caption: #7F7A72;
	--dsw-alias-label-dimmed: #69655E;
	--dsw-alias-label-primary: #E8E4DE;
	--dsw-alias-label-primary-bluish: #E2DED7;
	--dsw-alias-label-primary-dimmed: #C2BDB4;
	--dsw-alias-label-primary-foreground: #F4F1EC;
	--dsw-alias-label-primary-inverted: #E8E4DE;
	--dsw-alias-label-secondary: #ABA59C;
	--dsw-alias-label-tertiary: #7F7A72;

	--dsw-alias-markdown-citation: #2A2E33;
	--dsw-alias-markdown-code-block: #22221F;
	--dsw-alias-markdown-code-block-banner: #1D1D1B;
	--dsw-alias-markdown-code-segment-selected: #2E3945;
	--dsw-alias-markdown-code-segment-unselected: #22221F;
	--dsw-alias-markdown-inline-code: #282D33;
	--dsw-alias-markdown-placeholder: #7F7A72;
	--dsw-alias-markdown-tag: #2E3740;

	--dsw-alias-border-inverted: #E8E4DE;
	--dsw-alias-border-inverted2: #D0CBC2;
	--dsw-alias-border-l1: #383632;
	--dsw-alias-border-l2: #413E39;
	--dsw-alias-border-l2-darkmode-thin: #413E39;
	--dsw-alias-border-l3: #4B4842;
	--dsw-alias-border-l4: #55524B;

	--dsw-alias-scrollbar-bg-l1: #2E2C28;
	--dsw-alias-scrollbar-bg-l2: #35332E;
	--dsw-alias-scrollbar-hover-l1: #4A463F;
	--dsw-alias-scrollbar-hover-l2: #534F47;

	--dsw-alias-state-business-primary: #8FA8C0;
	--dsw-alias-state-business-tertiary: #2A323C;
	--dsw-alias-state-error-primary: #F07A5C;
	--dsw-alias-state-error-secondary: #46261D;
	--dsw-alias-state-success-primary: #B8B88C;
	--dsw-alias-state-success-secondary: #33351F;
	--dsw-alias-state-success-tertiary: #41432A;
	--dsw-alias-state-warn-label: #E8C088;
	--dsw-alias-state-warn-primary: #E8C088;
	--dsw-alias-state-warn-secondary: #40331E;
	--dsw-alias-state-warn-tertiary: #4E3D22;

	--dsw-alias-toast-bg: #262521;
	--dsw-alias-tooltip-bg: #12110F;

	--dsw-specific-bubble: #292824;
	--dsw-specific-bubble-highlight: #33322D;
	--dsw-specific-input-major: #23221F;
	--dsw-specific-login-input: #21201D;
	--dsw-specific-menu: #262521;
	--dsw-specific-selector: #21201D;
	--dsw-specific-sidebar-fill: #1F1E1B;
	--dsw-specific-sidebar-nav-item-active: #2E3740;
	--dsw-specific-sidebar-nav-item-active-accent: #6A9FCC;
	--dsw-specific-sidebar-nav-item-hover: #292824;
	--dsw-specific-tip: #2A2E33;

	--dsw-static-deepseek-100: #31404F;
	--dsw-static-deepseek-200: #37495C;
	--dsw-static-deepseek-300: #3E546A;
	--dsw-static-deepseek-400: #47637D;
	--dsw-static-deepseek-450: #D98A63;
	--dsw-static-deepseek-50: #22262B;
	--dsw-static-deepseek-500: #6A9FCC;
	--dsw-static-deepseek-600: #7FB0D8;
	--dsw-static-deepseek-700-delete: #9DC6E4;
	--dsw-static-deepseek-800: #BCD9EC;
	--dsw-static-deepseek-900: #DBEBF5;
	--dsw-static-neutral-bluish-400: #6A9FCC;
}

/* ---------- 背景：月光石纯色（无图案，扁平） ---------- */
html,
body {
	background-color: var(--dsw-alias-bg-base);
}

.__frame_frame__ {
	background-color: var(--dsw-alias-bg-base);
}

.__conversation_root__,
.__conversation_root__ {
	background-color: transparent !important;
}

/* ---------- 极简：全局直角（pi.dev 的 border-radius: 0 语言） ---------- */
* {
	border-radius: 2px !important;
}
/* 恢复胶囊按钮与圆形头像 */
.__chat_primary__,
[class*="avatar"],
[class*="Avatar"] {
	border-radius: 50% !important;
}

/* ---------- 细节 ---------- */
::selection {
	background: rgba(106, 159, 204, 0.28);
	color: #384251;
}
body[data-ds-dark-theme] ::selection {
	background: rgba(106, 159, 204, 0.3);
	color: #D5D8DB;
}

/* 扁平阴影（pi.dev 无投影） */
body {
	--dsw-shadow-lv1: none;
	--dsw-shadow-lv2: 0 1px 2px rgba(19, 17, 15, 0.05);
	--dsw-shadow-lv3: 0 2px 8px rgba(19, 17, 15, 0.07);
	--dsw-shadow-lv1-blur: none;
}

/* 细线描边质感 */
.__chat_bubble__ {
	border: 1px solid var(--dsw-alias-border-l2) !important;
	box-shadow: none !important;
}
.__chat_card__ {
	border: 1px solid var(--dsw-alias-border-l2) !important;
	box-shadow: none !important;
}



/* ---------- pi.dev 原版字体全面复刻 ---------- */
body {
	--dsw-font-family: "Plantin MT Pro", "Plantin MT Std", Plantin, Georgia, "Times New Roman", "Songti SC", "SimSun", serif;
	--ds-font-family-code: "Commit Mono", "SFMono-Regular", ui-monospace, Menlo, Monaco, Consolas, "Songti SC", "SimSun", monospace;
}

/* ---------- 方格纸质感（画布区极淡坐标网格） ---------- */
/* v1.5.0（2026-10-16）：回到原来的做法 —— 网格直接画在会话根节点的 background-image 上。
   零额外元素、零伪元素、零遮罩、零合成层，这是最省的实现。
   1.1.0 里写死的哈希前缀（wSkVaW_ 等）在 2.0.17 已全部失效；这里改用运行时解析出的
   __conversation_root__。参数与原来完全一致：24px 方格、5.5% 透明度。
   注意：不再有"渐隐"——渐隐必须额外加一层，按 Y 的选择舍去。 */
__conversation_root__ {
	background-color: transparent !important;
	background-image:
		linear-gradient(rgba(56, 66, 81, 0.055) 1px, transparent 1px),
		linear-gradient(90deg, rgba(56, 66, 81, 0.055) 1px, transparent 1px) !important;
	background-size: 24px 24px !important;
	background-repeat: repeat !important;
}
body[data-ds-dark-theme] __conversation_root__ {
	background-image:
		linear-gradient(rgba(213, 216, 219, 0.05) 1px, transparent 1px),
		linear-gradient(90deg, rgba(213, 216, 219, 0.05) 1px, transparent 1px) !important;
}

/* ---------- 按钮等宽字体（pi.dev 的 mono 控件风格） ---------- */
button {
	font-family: "Commit Mono", "SFMono-Regular", ui-monospace, Menlo, Monaco, Consolas, "Songti SC", "SimSun", monospace !important;
	letter-spacing: 0.01em;
}

/* ============================================================
   pi.dev 动效复刻 · Motion
   ============================================================ */

/* 上升淡入（hero-rise-fade） */
@keyframes dsh-rise-fade {
	from { opacity: 0; transform: translateY(6px); }
	to { opacity: 1; transform: translateY(0); }
}
/* 纯淡入（hero-opacity-fade） */
@keyframes dsh-opacity-fade {
	from { opacity: 0; }
	to { opacity: 1; }
}
/* 聚焦入场（hero-line-focus-in：模糊→清晰） */
@keyframes dsh-focus-in {
	from { opacity: 0; filter: blur(8px); }
	to { opacity: 1; filter: blur(0); }
}
/* 终端光标闪烁（terminal-cursor-blink） */
@keyframes dsh-cursor-blink {
	0%, 58% { opacity: 1; }
	59%, 100% { opacity: 0.28; }
}

/* 主框架淡入 */
.__frame_frame__ {
	animation: dsh-opacity-fade 0.3s ease both;
}

/* 消息气泡：上升淡入（新消息丝滑浮现） */
.__chat_bubble__ {
	animation: dsh-rise-fade 0.32s ease both;
}

/* 全局交互过渡：颜色/背景/边框 0.18s 丝滑 */
button,
a,
[role="button"],
input,
select,
textarea,
[class*="_row" i],
[class*="_item" i] {
	transition: background-color 0.18s ease, color 0.18s ease, border-color 0.18s ease, opacity 0.18s ease !important;
}
/* 带位移的控件：加 transform 过渡 */
.__chat_primary__,
.__sidebar_newSession__,
[class*="iconButton"],
[class*="_action"] {
	transition: background-color 0.18s ease, color 0.18s ease, transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease !important;
}

/* 主题（深浅）切换丝滑 */
html,
body {
	transition: background-color 0.35s ease, color 0.35s ease;
}

/* 终端光标：雾霾蓝 */
textarea,
[contenteditable="true"] {
	caret-color: #6A9FCC;
}

/* 发送按钮 hover：轻微上浮 + 蓝光 */
.__chat_primary__:hover:not(:disabled) {
	transform: translateY(-3px);
	box-shadow: 0 4px 10px rgba(106, 159, 204, 0.28);
}

/* 链接 hover：下划线渐显 */
a {
	text-decoration-color: transparent;
}
a:hover {
	text-decoration-color: var(--dsw-alias-brand-primary);
}

/* ============================================================
   高级动效：打字机光标 + 会话切换滑动 + 侧边栏折叠动画
   ============================================================ */

/* 会话切换：内容从右侧丝滑滑入（cubic-bezier 缓出） */
@keyframes dsh-slide-in {
	from { opacity: 0; transform: translateX(16px); }
	to { opacity: 1; transform: translateX(0); }
}
.__conversation_root__ {
	animation: dsh-slide-in 0.35s cubic-bezier(0.22, 1, 0.36, 1) both;
}

/* 打字机终端光标：助手消息末尾闪烁 ▍（pi.dev terminal-cursor-blink） */
.__conversation_scrollBody__ .__chat_bubble__:not(.__chat_userRow__ .__chat_bubble__)::after {
	content: "▍";
	display: inline-block;
	margin-left: 3px;
	color: var(--dsw-alias-brand-primary);
	animation: dsh-cursor-blink 1.1s step-end infinite;
}

/* 侧边栏折叠/展开动画 */
/* 展开时：内容浮现 */
.__sidebar_wide__ .__sidebar_regionArea__,
.__sidebar_wide__ .__sidebar_newSession__ {
	animation: dsh-rise-fade 0.3s ease both;
}
/* 折叠按钮图标：平滑旋转切换 */
.__sidebar_toggle__ svg {
	transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease !important;
}
.__sidebar_collapsed__ .__sidebar_toggle__ .__sidebar_panelIcon__ {
	transform: rotate(180deg);
}


/* ---------- header 面包屑标题：统一为衬线（Plantin + 中文宋体） ---------- */
.__conversation_crumb__ {
	font-family: "Plantin MT Pro", "Plantin MT Std", Plantin, Georgia, "Times New Roman", "Songti SC", "SimSun", serif !important;
}

/* ============================================================
   设计提升包：字距 / 衬线 hero / 点缀色 / 标题 / staggered
   ============================================================ */

/* 1) 等宽标签：大写 + 展开字距（pi.dev 的 +0.08~0.14em） */
button {
	letter-spacing: 0.08em;
	text-transform: uppercase;
}
/* 会话名面包屑与品牌保持原样（不大写） */
.__conversation_crumb__,
.__sidebar_brand__ {
	text-transform: none !important;
	letter-spacing: normal !important;
}

/* 2) 空状态/欢迎区：衬线斜体大字 */
.__empty_headline__ {
	font-family: "Plantin MT Pro", "Plantin MT Std", Plantin, Georgia, "Times New Roman", "Songti SC", "SimSun", serif !important;
	font-style: italic;
	font-weight: 500;
	font-size: 30px !important;
	line-height: 1.25;
	letter-spacing: -0.01em;
}

/* 3) 复古点缀色：Running 陶土红 / 成功鼠尾草 / 警告暖金 / 错误陶土深红 */
body {
	--dsw-static-deepseek-450: #B86B52;
	--dsw-alias-state-success-primary: #A3A473;
	--dsw-alias-state-warn-primary: #E1B06E;
	--dsw-alias-state-warn-label: #B0803A;
	--dsw-alias-state-error-primary: #E8704F;
	--dsw-alias-state-business-primary: #4B607C;
}
body[data-ds-dark-theme] {
	--dsw-static-deepseek-450: #D98A63;
	--dsw-alias-state-success-primary: #B8B88C;
	--dsw-alias-state-warn-primary: #E8C088;
	--dsw-alias-state-warn-label: #E8C088;
	--dsw-alias-state-error-primary: #F07A5C;
	--dsw-alias-state-business-primary: #7A92B0;
}

/* 4) 大标题负字距（更锐） */
h1, h2, h3 {
	letter-spacing: -0.02em;
}

/* 5) 空状态逐行浮现（staggered 0.05s 递增） */
.__empty_stack__ > * {
	animation: dsh-rise-fade 0.4s ease both;
}
.__empty_stack__ > *:nth-child(1) { animation-delay: 0.05s; }
.__empty_stack__ > *:nth-child(2) { animation-delay: 0.1s; }
.__empty_stack__ > *:nth-child(3) { animation-delay: 0.15s; }
.__empty_stack__ > *:nth-child(4) { animation-delay: 0.2s; }
.__empty_stack__ > *:nth-child(5) { animation-delay: 0.25s; }
.__empty_stack__ > *:nth-child(6) { animation-delay: 0.3s; }
.__empty_headline__ {
	animation: dsh-rise-fade 0.45s ease both;
}



/* ============================================================
   质感提升包 · Polish：聚焦环 / 提示符 / 滚动条 / 代码块
   ============================================================ */

/* 1) 输入框聚焦：雾霾蓝边框 + 柔光晕（pi.dev focus-ring） */
.__chat_card__:focus-within {
	border-color: var(--dsw-alias-brand-primary) !important;
	box-shadow: 0 0 0 3px rgba(106, 159, 204, 0.14) !important;
	transition: border-color 0.18s ease, box-shadow 0.18s ease !important;
}

/* 2) 全局键盘焦点环（Tab 可达性 + 高级感） */
:focus-visible {
	outline: 2px solid rgba(106, 159, 204, 0.65) !important;
	outline-offset: 1px;
	border-radius: 3px;
}

/* 4) 纤细滚动条（terminal 风） */
::-webkit-scrollbar {
	width: 7px;
	height: 7px;
}
::-webkit-scrollbar-thumb {
	background: var(--dsw-alias-scrollbar-bg-l2);
	border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
	background: var(--dsw-alias-scrollbar-hover-l2);
}
::-webkit-scrollbar-track {
	background: transparent;
}

/* 5) 代码块左侧雾霾蓝竖线（IDE 质感） */
pre {
	border-left: 3px solid var(--dsw-alias-brand-primary) !important;
}


`;
		/* ---------- 宿主语义类名解析（仅在需要时执行，绝不常驻轮询全树） ---------- */
		const CLASS_RE = /^([A-Za-z0-9-]{4,10})_([A-Za-z][A-Za-z0-9]*)$/;
		function grab(suffix) {
			if (typeof document === "undefined" || !document.querySelectorAll) return null;
			for (const el of document.querySelectorAll("[class]")) {
				for (const cls of el.classList) {
					const m = CLASS_RE.exec(cls);
					if (m && m[2] === suffix) return { prefix: m[1], el };
				}
			}
			return null;
		}
		function buildCss(prefixes) {
			return CSS_TEMPLATE.replace(/__(\w+)_([A-Za-z0-9]+)__/g, (_, group, semantic) => {
				const prefix = prefixes[group];
				return prefix ? "." + prefix + "_" + semantic : '[class*="_' + semantic + '"]';
			});
		}

		function apply() {
			if (typeof document === "undefined") return;
			let tag = document.querySelector('style[data-plugin-css="moon-flavor"]');
			if (!tag) {
				tag = document.createElement("style");
				tag.dataset.plugin = "moon-flavor";
				tag.dataset.pluginCss = "moon-flavor";
				document.head.appendChild(tag);
			}

			const P = {};
			let rendered = false;

			/** 全量解析一次（唯一的全树扫描入口）。返回是否有关键组可用。 */
			function resolve() {
				const next = {};
				const brand = grab("brand");
				if (brand) {
					next.sidebar = brand.prefix;
					const frameEl = brand.el.closest('[class*="_frame"]');
					if (frameEl) for (const cls of frameEl.classList) {
						const m = CLASS_RE.exec(cls);
						if (m && m[2] === "frame") { next.frame = m[1]; break; }
					}
				}
				const scroll = grab("scrollBody");
				if (scroll) next.conversation = scroll.prefix;
				const bubble = grab("bubble");
				if (bubble) next.chat = bubble.prefix;
				const head = grab("headline");
				if (head) next.empty = head.prefix;

				let changed = false;
				for (const k of Object.keys(next)) if (P[k] !== next[k]) changed = true;
				for (const k of Object.keys(P)) if (next[k] === void 0) changed = true;
				if (!changed && rendered) return Boolean(next.conversation);
				for (const k of Object.keys(P)) delete P[k];
				Object.assign(P, next);
				tag.textContent = buildCss(P);
				if (tag.parentNode !== document.head) document.head.appendChild(tag);
				rendered = true;
				return Boolean(P.conversation);
			}

			/** 廉价探活：只用 1 个选择器，不扫全树。 */
			function alive() {
				if (!P.conversation) return false;
				return Boolean(document.querySelector("." + P.conversation + "_root")
					|| document.querySelector("." + P.conversation + "_scrollBody"));
			}

			// 首屏先按回退选择器注入一次，保证至少能上色
			tag.textContent = buildCss({});
			rendered = true;

			// ① 启动阶段：有界重试（最多 20s），拿到会话前缀就停
			let bootTries = 0;
			const boot = setInterval(() => {
				bootTries += 1;
				if (resolve() || bootTries >= 80) {
					clearInterval(boot);
					startWatch();
				}
			}, 250);

			// ② 稳定阶段：每 10s 一次廉价探活；失效才重新解析
			let watch = 0;
			function startWatch() {
				if (watch) return;
				watch = setInterval(() => {
					try { if (!alive()) resolve(); } catch (_e) { /* 忽略 */ }
				}, 10000);
			}

			// ③ 保序：官方主题的 ctx.effect 会重插 style，若插到我们后面就把我们移到最后
			const keepLast = () => {
				if (tag.parentNode !== document.head) return;
				const styles = Array.from(document.head.querySelectorAll("style[data-plugin-css]"));
				const last = styles[styles.length - 1];
				if (last && last !== tag) document.head.appendChild(tag);
			};
			try { new MutationObserver(keepLast).observe(document.head, { childList: true }); } catch (_e) { /* 忽略 */ }
		}

		exports.name = name;
		exports.apply = apply;
		return module.exports;
	}
});
