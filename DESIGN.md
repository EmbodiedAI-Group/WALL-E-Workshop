---
name: moss具身工坊
description: 纸白、钴蓝与真实项目素材组成的研究社区报刊
colors:
  blue: "#0837a5"
  paper: "#f6f6f5"
  ink: "#171415"
  muted: "#55595d"
  line: "#b7b9b8"
typography:
  display:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(200px, 28.65vw, 440px)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Noto Sans SC, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "clamp(28px, 3.65vw, 56px)"
    fontWeight: 850
    lineHeight: 1.3
    letterSpacing: "-0.03em"
  article-title:
    fontFamily: "Noto Sans SC, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "1.65rem"
    fontWeight: 750
    lineHeight: 1.4
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Noto Sans SC, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.75
  navigation:
    fontFamily: "Noto Sans SC, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "15px"
    fontWeight: 600
rounded:
  square: "0px"
spacing:
  gutter: "clamp(20px, 2.35vw, 36px)"
  subpage-gutter: "clamp(20px, 2.5vw, 36px)"
  section-before: "52px"
  section-after: "62px"
  relation-gap: "24px"
  reading-gap: "clamp(36px, 6vw, 100px)"
components:
  text-action:
    textColor: "{colors.blue}"
    rounded: "{rounded.square}"
  navigation:
    textColor: "{colors.ink}"
    typography: "{typography.navigation}"
  event-band:
    textColor: "{colors.ink}"
    padding: "12px clamp(20px, 2.35vw, 36px)"
  community-contact:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.paper}"
    rounded: "{rounded.square}"
---

# Design System: moss具身工坊

## Overview

**Creative North Star: "研究社区报刊"**

以纸白、钴蓝与墨色建立中文具身智能社区的出版物气质。品牌字标与实际项目图承担识别，细分隔线、明确列宽和可读的中文正文承担结构；正文、项目与学术分享共享一套平面视觉语言。

用户明确选择 home-comp-2，并批准用原有四个项目素材替代视觉稿中的生成图。落地实现保留原素材内容：EGO 项目图仍是插画，不被包装成实拍。选定首页的具体版面属于 .impeccable/surfaces/home.md，不是所有新页面必须复制的模板。后续用户反馈明确否定照片切穿字标的层级；.impeccable/surfaces/motion-upgrade.md 与用户附图覆盖旧稿对应的叠放逻辑。

**Key Characteristics:**
- 纸白底、钴蓝强调、墨色正文与细规则线。
- 凝缩英文品牌字标搭配清晰的中文无衬线正文。
- 真实项目图、独立阅读列与直接的文本链接。
- 平面排版；字标保持完整，动效在固定层级内组织首屏和阅读节奏。

## Colors

唯一品牌强调色为钴蓝。纸白、墨色、正文灰与规则线灰构成中性阅读面；数值以 frontmatter 与 `assets/site.css` 为准。

### Primary
- **研究钴蓝**：品牌字标、链接、重点标题和数据强调；加入区域使用整块钴蓝，承载反白文本。

### Neutral
- **纸白**：全站阅读面与字标附近的留白。
- **墨色**：正文、主要标题与章节规则线。
- **阅读灰**：辅助说明、图注、时间与次要正文。
- **规则线灰**：细分隔、表列、目录与页脚边界。

**The Cobalt Signal Rule.** 钴蓝承担品牌、重要标题、可执行链接与重点数据；墨色和中性灰维持阅读层级。

## Typography

**Display Font:** Barlow Condensed，已自托管 900 字重；用于 `moss`、拉丁文研究标题等凝缩展示文字。七页均预加载此字体，`font-display:block` 避免装饰性字标先以系统回退字形闪现。它不是中文正文的替代字体。
**Body Font:** Noto Sans SC，已自托管并预加载可变字重子集（100–900）；`font-display:swap` 使语义正文在字体加载期间仍可阅读。系统字体仅作加载回退。

### Hierarchy
- **Display**：超大字标角色见 frontmatter；品牌导航使用 `1.75em` 的凝缩英文，中文相邻部分独立排版。首页巨大字标为特定展示表达，不能继承为文章标题尺寸。
- **Headline**：首页章节标题使用响应式大字号及 850 字重；中文主要使命语单独使用 900 字重。子页页题采用 `clamp(2.15rem,4.5vw,4.4rem)`，分享标题采用 `clamp(2.1rem,4.1vw,4.3rem)`。
- **Article title**：文章节标题使用 frontmatter 的角色；项目详情节标题稍收为 `1.45rem`。
- **Body**：站点默认角色见 frontmatter。长文段落采用约 `0.96–1rem`、`1.95–2` 行高；桌面项目正文上限 760px，学术文章上限 840px。不是每个文本块都使用同一字号或同一行长。
- **Navigation / metadata**：导航使用 frontmatter 角色；图注、标签、辅助元信息在实际组件内缩小，不把局部 11px 小标签当作全站正文规范。
- 日期与指标使用表格数字；标题使用 `text-wrap:balance`，字距不低于负 0.04em。

## Layout

页头、首页主版面及页脚居中，最大宽度 1536px；子页外容器最大宽度 1480px。两种容器都用流体 gutter，见 frontmatter。首页常规章节上下留白 52px / 62px；相邻标题与说明通常以 24px 组织。

项目目录以图片与文字的水平行展开，图片和正文近似等宽。项目详情采用图像/目录栏与正文栏（`.85fr / 1fr`）；学术分享采用正文与 285px 目录栏，1000px 以下目录缩至 240px。阅读图像栏与分享页目录在宽屏为 `position:sticky; top:96px`，避开固定高度的吸顶页头。

响应断点来自实际样式：1200、1000、900、760、700（动效）、600 和 390px。子页在 760px 以下收为单栏；首页在 600px 以下重排为竖向内容和两列项目图。页头在 600px 以下隐藏重复的项目导航入口，项目仍可从首页项目区及页脚访问。375px 已实拍检查；所有内容和现有七条路由保留。

## Elevation & Depth

内容区域保持平面，不使用容器阴影或光晕。黑/灰一像素规则线、纸白留白、照片裁切和字重承担层级。页头滚过 96px 后出现 `0 5px 18px rgba(23,20,21,.055)` 的轻阴影，仅区分吸顶导航与阅读正文。蓝色加入区是完整色面，Threads 线场局限于其背景，不成为阅读层。

**The Rules Before Panels Rule.** 用列宽、留白和一像素规则线组织内容，不用浮起的容器替代信息结构。

## Shapes

界面主要为直角矩形，不使用圆角卡片。细线和直角方向 SVG 构成几何语言；全局方向图标通常 24px、1.6px 描边，子页内为 21px、1.5px 描边。首页照片的六顶点角形裁切属于固定照片框，是版面拼接而不是有机轮廓抠图；多边形不随动画移动。首屏层级固定为照片框 z-index 1、完整字标 2、中文使命语 3、右侧说明 4，照片不得切穿字标。图片本身可在框内轻微平移与放大，不生成或重塑设备结构。EGO 目录缩略图使用 `object-position:center 25%`，保留原插画身份。

## Components

### Text actions
有下划线或底边的文本操作，带小方向 SVG；主内容操作最小高度 44px。蓝色为静态链接色，悬停转墨色。焦点是 2px 钴蓝描边与 5px 偏移，在钴蓝加入区改为白色。

### Navigation
统一字标与文本导航，共创项目、专家分享和加入社区直接对应现有路径。导航区保持一像素底线与纸白背景，以 `position:sticky; top:0` 吸顶；原有高度保持稳定（桌面至少 64px，600px 以下至少 70px），不通过高度动画移动正文。滚过 96px 后，字标缩至 .92、当前章节在宽屏页头出现；2px 底部进度线反馈阅读位置，当前类别用钴蓝下划线与 `aria-current` 标记。760px 以下隐藏章节文本，保留类别与进度。页脚沿用品牌、直接文本链接与细分隔线。

### Event band and project catalog
活动带使用细线边界、紧凑日期与讲者信息；以真实标题和参会入口组织。项目目录使用图片/标题/摘要/标签组成的可点击行，项目标签是开放文本，不是填色胶囊。

### Reading index
文章目录为有序列表或锚点文本，位置和列宽遵循 Layout；小屏落入正常文档流。项目目录随当前章节更新钴蓝强调与 `aria-current="location"`。锚点统一由 `html{scroll-padding-top:96px}` 留出页头空间；Lenis 的锚点额外偏移为 0，避免重复偏移。学术数字用蓝色字重强调和上下规则线展示，不改写数值语义。

### Community contact and motion
加入区使用钴蓝色面与反白正文；实际联系方式可选中，二维码缺失状态被明确说明。React Bits Magnet 仅作用于主加入导航操作，`padding=24`、`magnetStrength=8`、最大偏移 5px；原始静态链接在脚本加载前可用。减少动态偏好发生变化时重新渲染 disabled 状态，不只检查初次载入。

Threads 背景使用 32 条白色线、amplitude 0.8、distance 0.4、speed 0.3、angle 16、thickness 0.5、softness 1.1、组件 opacity 0.8 与外层 opacity 0.22；没有鼠标交互。宽度不大于 700px 或减少动态偏好时不挂载此背景；离开视口或页面隐藏时暂停。图片 hover 仅有小幅比例变化（首页 1.035、目录 1.025），不遮挡文字。

### Choreography and continuity
GSAP 3.15.0 与 ScrollTrigger 组织分段阅读节奏；Lenis 1.3.27 只在支持 hover 且 pointer 为 fine 的设备上启用，与视口宽度无关。Lenis `autoRaf:false`，由 GSAP ticker 驱动唯一滚动时钟，`lerp:0.1`、`smoothWheel:true`、`syncTouch:false`、`anchors.offset:0`；触控路径使用浏览器原生滚动。位置反馈复用 ScrollTrigger，不另启常驻 RAF。

字体就绪后，首屏约 0.94s 的编排分别组织字标、照片、使命语、目录与活动信息。字标轻微竖向落位，照片从 1.16 倍进入 1.08 倍的框内 overscan；照片滚动视差仅为 yPercent -3 到 +3、scrub 0.55，精细指针字标最多上移 20px。外层照片框与固定多边形不参与运动。

`src/reading-motion.js` 让图库、项目目录、知识条目、动态与分享大纲按实际进入视口的同级组展开：ScrollTrigger.batch 的窗口 .065s、每组最多 8 项，错峰总量最多 .24s，常规入场 .62–.68s；高项目行独立触发，不提前排队整列屏外内容。长文以节标题及相邻段落为组，.58s 入场、错峰最多 .18s。研究专栏保留标题、讲者与研究名的独立编排；不做逐字动画。直接访问子页的主标题使用 .58s 入口；经页面转场进入时跳过与共享标题、图片竞争的入口，详情返回时不重复隐藏已恢复的列表。

成果指标只在首次可见时引导注意：普通数量在 .72s 内递增，保留原始精度与单位；带 `<`、`≤`、`±` 的界限或容差仅强调，不生成变化的界限。准确原值持续留在可访问 DOM 中，视觉计数副本为 `aria-hidden`；完成或动态偏好改变时，移除副本并还原原始节点。结果注释的短暂底色强调只播放一次往返。

`src/reading-position.js` 维护吸顶页头、阅读进度、当前章节与目录状态；章节阈值来自布局位置，不受临时入场 transform 影响。`src/navigation.js` 是独立的早期经典 head 脚本，在延迟加载的主动效入口前注册跨文档事件。浏览器支持时，选中项目的图片与标题获得唯一共享名称，映射到详情图与主标题；分享条目共享标题。图片组 .44s、标题 .32s（600px 以下 .36s / .30s），页头独立保持稳定。详情向前与返回使用相反的纵深方向，页头/页脚的版块导航按首页→项目→专家分享的顺序使用横向方向。

浏览器返回保留原生历史与滚动恢复；匹配的详情面包屑恢复来源条目的屏幕位置，并短暂提示该条目。全局版块导航不携带旧的选中项。普通链接、修饰键新开页与锚点不被路由拦截；不支持跨文档 View Transition 的浏览器保留原生导航，以 .3s 的短方向入口衔接。禁用 JavaScript 时所有正文和链接保持可用。

减少动态偏好变化会清理 GSAP 媒体上下文与 Lenis、恢复准确指标，移除位移和背景渲染；首页图片显式 `clearProps:'transform'`，Magnet disabled、Threads 不挂载。跨文档空间过渡与返回强调关闭，页头的类别、章节和阅读进度状态仍可用。实际交互、逐帧及滚动测量证据分别位于 `.impeccable/navigation-tests/`、`.impeccable/reading-review/` 与 `.impeccable/continuity-performance/`；这些本地原始记录不是全设备固定帧率保证，25fps 演示录像也不是性能采样。

**The Real Source Rule.** 项目图片和学术内容沿用可追溯素材；不把生成图、假二维码或未确认数据写成新的事实背书。

## Do's and Don'ts

### Do:
- Do 使用已托管的 Noto Sans SC 中文字体与 Barlow Condensed 字标，保持中文和拉丁文各自清晰的层级。
- Do 让项目照片、插画、学术信息保留原身份，并明确缺失的入群二维码。
- Do 保持文本链接可见、焦点环明确，内容不依赖 React 岛才能访问。
- Do 在小屏把阅读双栏收成单栏，保留所有正文与参会信息。

### Don't:
- Don't 用渐变字、光晕、阴影圆角卡片替代现有的平面出版物语言。
- Don't 把首页巨型字标、照片裁切或具体首屏叙事当作每条路由的模板。
- Don't 在正文层放置持续跟随鼠标的装饰；Threads 仅存在于加入区域，减少动态偏好与窄屏不运行。
- Don't 猜造讲者照片、社交账号、二维码、会议链接或项目表现。

<!-- Extracted from shipping styles, src/motion.jsx, src/choreography.js, src/reading-motion.js, src/reading-position.js, src/navigation.js and scoped motion/continuity captures. The historical static numerical-pipeline exception is not a pipeline PASS. Evidence and source hashes live in .impeccable/design.json. -->
