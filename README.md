# DailyCalculas

一个简洁的每日微积分练习网页，每天提供一道极限题和一道积分题，点击题目公式即可查看中文过程解析。

## 功能

- 使用 KaTeX 渲染 LaTeX 公式，相关脚本、样式和字体均随项目提供。
- 按北京时间每天零点切换题目；重新显示页面时也会检查日期并更新。
- 极限与积分各包含 8 种题型，通过题型轮换和整数参数变化生成每日题目，完整组合每 88 天循环。
- 答案链接保留题目日期，跨日后仍可查看对应题目的解析。
- 无需外部 AI 服务或定时任务；当前不会自动生成全新题型。

## 本地预览

项目是无需构建的静态网站，网页文件位于 `dist/` 目录。安装 Python 后，可在项目根目录运行：

```sh
python -m http.server 4173 --directory dist
```

然后在浏览器中打开 <http://localhost:4173>。

## 本地检查

安装 Node.js 后，在项目根目录运行：

```sh
npm ci --no-audit --no-fund
npm test
```

检查内容包括网页脚本语法、LaTeX 公式渲染、中文解析是否齐全，以及每日题目切换。这些检查不能代替对数学答案正确性的审核。

KaTeX 使用固定版本的 npm 依赖。`dist/vendor/` 中的资源来自该依赖包，并保留其许可证。

## GitLab 自动流水线

仓库中的 `.gitlab-ci.yml` 使用自定义检查流程，替代默认的 Auto DevOps 流水线。每次触发流水线后，会使用 Node.js 22 安装锁定版本的依赖并运行 `npm test`。检查通过后，`dist/` 目录会作为可下载的作业产物保存一周。

运行流水线需要 GitLab Runner 能够拉取 `node:22-alpine` 镜像，并访问 npm 软件包仓库。

当前流水线只负责检查与保存网页文件，不会自动出新题、发布到 GitLab Pages，或更新已有的 Sites 网站。

## HTML Preview 兼容版

`dist/preview.html` 是自包含的预览入口：样式、脚本、题库、KaTeX 和 WOFF2 字体均嵌入同一个文件，使用时无需逐个加载仓库中的资源。它也可以下载后直接用浏览器打开。

[通过 htmlpreview.github.io 尝试预览](https://htmlpreview.github.io/?https://git.nju.edu.cn/JSchwarz/dailycalculas/-/raw/main/dist/preview.html)

该链接要求预览服务能够读取南大 Git 的原始文件。私有仓库、登录要求、网站验证或跨域限制仍可能阻止加载；页面的兼容改造无法替代这些访问条件，也不会改变仓库可见性。请使用原始文件（`/-/raw/`）链接，而不是仓库文件浏览（`/-/blob/`）链接。

答案切换使用 `#answer=...`，返回首页使用 `#home`，以保留 HTML Preview 自身的查询参数。原有 `?answer=...&date=...` 答案链接继续可用。

修改网页、题库或相关资源后，在提交前重新生成兼容版：

```sh
npm run build:preview
npm test
```

将更新后的 `dist/preview.html` 一起提交。自动检查会验证该文件是否与源码一致。
