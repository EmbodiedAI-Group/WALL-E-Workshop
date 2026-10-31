# moss具身工坊
moss具身工坊，具身智能开放社区
我们是一个聚焦具身智能的开放社区，汇聚开发者、研究者与爱好者， 在这里分享知识、碰撞思想、共创项目、共建开源生态。详情了解主页 https://embodiedai-group.github.io/Moss-Embodied-Workshop/


## 本地预览与构建

网站保留静态 HTML 页面和原有 GitHub Pages 地址。正文直接维护对应 HTML；公共设计样式位于 `assets/site.css`，项目及分享页样式位于 `assets/pages.css`。

```sh
npm ci
npm run build
python -m http.server 8765 --bind 127.0.0.1
```

打开 `http://127.0.0.1:8765/`。构建用于 GSAP / ScrollTrigger 整站动效、桌面 Lenis 平滑滚动及首页 React Bits 局部动效，输出 `assets/motion.js`、`assets/motion.css` 和独立的 `assets/navigation.js`。正文与导航在禁用 JavaScript 时仍可使用。部署仍由 `main` 分支触发，无需更改 GitHub Pages 配置。

## 设计与素材

`DESIGN.md` 记录已确认的设计系统。首页使用已确认第二稿的编辑式构图；所有项目图来自原有项目素材，EGO 图片为插画。`assets/provenance.json` 与 `assets/fonts/provenance.json` 记录图片和字体来源；许可保存在 `THIRD_PARTY_NOTICES/`。新增中文内容时，请更新本地 Noto Sans SC 字体子集以覆盖新字符。

社区联系方式沿用现有微信号 `wall-e-helper`；真实群二维码和会议链接尚待运营者提供。没有为未知账号、图片或链接生成替代事实。


## 动效维护

`src/choreography.js` 管理首屏分层、滚动视差和唯一的 GSAP / Lenis 时钟；`src/reading-motion.js` 管理可见条目的分组错峰、长文章节和一次性成果数字强调。准确指标及单位始终保留，计数结束或减少动态偏好变化时清理视觉副本。`src/reading-position.js` 维护吸顶页头、当前章节、目录与阅读进度；锚点仅由 `html` 的 96px `scroll-padding-top` 留出空间，Lenis 额外偏移为 0。

`src/navigation.js` 保留静态页面原生导航，用跨文档 View Transition 连接选中项目的图/标题、分享条目的标题与详情内容；返回恢复来源条目位置，版块导航使用独立方向。`assets/navigation.js` 必须作为经典脚本在 head 中先于 `defer` 的 `assets/motion.js` 加载，才能及时注册 `pagereveal`；配套样式为 `assets/navigation.css` 和 `assets/reading-position.css`。不支持原生转场时使用短方向入口，禁用 JavaScript 时正文与链接仍可用。本轮未添加新的运行时依赖。

Lenis 仅在鼠标等精细指针场景启用（窄桌面窗口同样生效），触摸保持原生滚动。`src/motion.jsx` 仍只挂载局部 React Bits：Magnet 作用于加入链接，Threads 限于加入区、屏外暂停、移动端不挂载。减少动态效果时清理滚动编排、计数、位移与背景渲染，保留阅读位置状态。照片裁切固定在 `.hero-photo-frame`，只移动内部图片；字标始终位于照片前方。

运行 `python .impeccable/scripts/verify-site.py` 检查七条路由的桌面/窄屏、静态链接、图像、减少动态和无脚本路径。实际点击/返回、锚点、逐帧与滚动采样记录保存在本地 `.impeccable/navigation-tests/`、`.impeccable/reading-review/`、`.impeccable/continuity-performance/`；原始捕获不随站点发布。性能结论仅限对应机器、浏览器和采样条件，演示录像不作为帧率证明。
