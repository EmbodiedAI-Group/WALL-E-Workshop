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

项目目录以图片与文字的水平行展开，图片和正文近似等宽。项目详情采用图像/目录栏与正文栏（`.85fr / 1fr`）；学术分享采用正文与 285px 目录栏，1000px 以下目录缩至 240px。阅读目录在宽屏为 `position:sticky; top:28px`。

响应断点来自实际样式：1200、1000、900、760、700（动效）、600 和 390px。子页在 760px 以下收为单栏；首页在 600px 以下重排为竖向内容和两列项目图。页头在 600px 以下隐藏重复的项目导航入口，项目仍可从首页项目区及页脚访问。375px 已实拍检查；所有内容和现有七条路由保留。

## Elevation & Depth

界面不使用容器阴影或光晕，内容区域保持平面。黑/灰一像素规则线、纸白留白、照片裁切和字重承担层级。蓝色加入区是完整色面，Threads 线场局限于其背景，不成为阅读层。

**The Rules Before Panels Rule.** 用列宽、留白和一像素规则线组织内容，不用浮起的容器替代信息结构。

## Shapes

界面主要为直角矩形，不使用圆角卡片。细线和直角方向 SVG 构成几何语言；全局方向图标通常 24px、1.6px 描边，子页内为 21px、1.5px 描边。首页照片的六顶点角形裁切属于固定照片框，是版面拼接而不是有机轮廓抠图；多边形不随动画移动。首屏层级固定为照片框 z-index 1、完整字标 2、中文使命语 3、右侧说明 4，照片不得切穿字标。图片本身可在框内轻微平移与放大，不生成或重塑设备结构。EGO 目录缩略图使用 `object-position:center 25%`，保留原插画身份。

## Components

### Text actions
有下划线或底边的文本操作，带小方向 SVG；主内容操作最小高度 44px。蓝色为静态链接色，悬停转墨色。焦点是 2px 钴蓝描边与 5px 偏移，在钴蓝加入区改为白色。

### Navigation
统一字标与文本导航，共创项目、专家分享和加入社区直接对应现有路径。导航区有一像素底线，无玻璃背景或阴影。页脚沿用品牌、直接文本链接与细分隔线。

### Event band and project catalog
活动带使用细线边界、紧凑日期与讲者信息；以真实标题和参会入口组织。项目目录使用图片/标题/摘要/标签组成的可点击行，项目标签是开放文本，不是填色胶囊。

### Reading index
文章目录为有序列表或锚点文本，位置和列宽遵循 Layout；小屏落入正常文档流。学术数字用蓝色字重强调和上下规则线展示，不改写数值语义。

### Community contact and motion
加入区使用钴蓝色面与反白正文；实际联系方式可选中，二维码缺失状态被明确说明。React Bits Magnet 仅作用于主加入导航操作，`padding=24`、`magnetStrength=8`、最大偏移 5px；原始静态链接在脚本加载前可用。减少动态偏好发生变化时重新渲染 disabled 状态，不只检查初次载入。

Threads 背景使用 32 条白色线、amplitude 0.8、distance 0.4、speed 0.3、angle 16、thickness 0.5、softness 1.1、组件 opacity 0.8 与外层 opacity 0.22；没有鼠标交互。宽度不大于 700px 或减少动态偏好时不挂载此背景；离开视口或页面隐藏时暂停。图片 hover 仅有小幅比例变化（首页 1.035、目录 1.025），不遮挡文字。

### Choreography and continuity
GSAP 3.15.0 与 ScrollTrigger 组织语义明确的分段节奏；Lenis 1.3.27 只在支持 hover 且 pointer 为 fine 的设备上启用，与视口宽度无关。Lenis `autoRaf:false`，由 GSAP ticker 驱动唯一滚动时钟，`lerp:0.1`、`smoothWheel:true`、`syncTouch:false`，并将 scroll 事件同步到 ScrollTrigger；触控路径使用浏览器原生滚动。宽度窄的鼠标窗口仍属于精细指针路径。

字体就绪后，首屏约 0.94s 的编排分别组织字标、照片、使命语、目录与活动信息。字标轻微竖向落位，照片从 1.16 倍进入 1.08 倍的框内 overscan；照片滚动视差仅为 yPercent -3 到 +3、scrub 0.55，精细指针字标最多上移 20px。外层照片框与固定多边形不参与运动。

项目图库以一次性 0.64s 矩形裁切揭示图片、同级 stagger 0.06s；标题/图注另以 0.48s 和 stagger 0.025s 落位。研究专栏分别安排标题、讲者列与研究名，不把每个区段套成同一种升起效果。子页主标题采用 0.58s 的安静入口，目录图片行与正文图采用局部一次性动作。导航下划线与方向图标以 0.35s 状态过渡反馈；支持的浏览器使用原生跨文档 View Transition（旧页 0.18s 淡出、新页 0.3s 淡入）。

减少动态偏好变化会清理 GSAP 媒体上下文与 Lenis；首页图片显式 `clearProps:'transform'`，避免保留入口捕获的 from-state。CSS 关闭平滑滚动、过渡、缩放和跨文档淡变；Magnet disabled、Threads 不挂载。性能结论只适用于本机实际滚动/帧间隔测量，文档不承诺所有设备稳定固定帧率。

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

<!-- Extracted from assets/site.css, assets/pages.css, src/motion.jsx, src/choreography.js and scoped motion-review captures. The historical static numerical-pipeline exception is not a pipeline PASS. Evidence and source hashes live in .impeccable/design.json. -->
