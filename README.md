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

打开 `http://127.0.0.1:8765/`。构建用于 GSAP / ScrollTrigger 整站动效、桌面 Lenis 平滑滚动及首页 React Bits 局部动效，输出 `assets/motion.js` 和 `assets/motion.css`。正文与导航在禁用 JavaScript 时仍可使用。部署仍由 `main` 分支触发，无需更改 GitHub Pages 配置。

## 设计与素材

`DESIGN.md` 记录已确认的设计系统。首页使用已确认第二稿的编辑式构图；所有项目图来自原有项目素材，EGO 图片为插画。`assets/provenance.json` 与 `assets/fonts/provenance.json` 记录图片和字体来源；许可保存在 `THIRD_PARTY_NOTICES/`。新增中文内容时，请更新本地 Noto Sans SC 字体子集以覆盖新字符。

社区联系方式沿用现有微信号 `wall-e-helper`；真实群二维码和会议链接尚待运营者提供。没有为未知账号、图片或链接生成替代事实。


## 动效维护

`src/choreography.js` 管理首屏分层编排、滚动视差和内容入场；`src/motion.jsx` 挂载 React Bits。Lenis 仅在鼠标等精细指针场景启用（窄桌面窗口同样生效），并由 GSAP ticker 驱动；触摸保持原生滚动。减少动态效果时清理滚动编排、位移与背景渲染。照片裁切固定在 `.hero-photo-frame`，只移动内部图片；字标始终位于照片前方，勿再次通过遮罩切割字母。
