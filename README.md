# 网页内容记录插件

本插件用于记录网页内容，便于后续与大语言模型（LLM）交互使用。

## 目录结构

- `content.js`：内容脚本，负责与网页交互，提取所需信息。
- `icon.png`：插件图标。
- `manifest.json`：插件清单文件，定义插件的基本信息和权限。
- `popup.html`：弹窗页面的 HTML 文件。
- `popup.js`：弹窗页面的 JS 脚本。
- `service-worker.js`：后台服务脚本，处理插件的后台逻辑。
- `README.md`：项目说明文档。

## 安装与使用

1. 克隆或下载本仓库到本地。
2. 打开 Chrome 浏览器，进入 `chrome://extensions/`。
3. 开启“开发者模式”。
4. 点击“加载已解压的扩展程序”，选择本项目文件夹。
5. 安装完成后，点击浏览器右上角插件图标即可使用。

## 开发

- 使用 JavaScript 编写，依赖 npm 进行包管理（如有需要）。
- 可根据实际需求修改 `content.js` 和 `popup.js` 实现自定义功能。

## 许可

Apache-2.0 license
