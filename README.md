# **� Regex Learning - 解开正则表达式的秘密**

**通过 [Regex Learning](https://github.com/CodingRookie98/RegexLearning) 踏步掌握正则表达式的旅程。该平台通过引人入胜的循序渐进的方法和丰富的功能，确保流畅的学习体验，让您即刻像专业人士一样编写正则表达式！**

灵感来源于 [regexlearn.com](https://github.com/aykutkardas/regexlearn.com)。

---

## **🌟 核心功能 (Features)**

- **🚶 循序渐进的系统化学习 (Learn)：** 按照您自己的节奏通过精心设计的课程和示例取得进展，满足从初学者到高级用户的学习需求。
- **🧩 题库与挑战 (Question Bank)：** 在真实的正则表达式挑战中测试您的知识。解决问题并在内置的验证器中实时查看测试用例的结果，追踪您的掌握程度。
- **🚀 游乐场 / 沙盒 (Playground)：** 在专用沙盒环境中不受限制地自由试验和测试您的正则表达式模式，支持实时文本高亮匹配。
- **📚 交互式速查表 (Cheat Sheet)：** 将正则表达式语法和用法的简明摘要放在您的指尖，支持分类折叠和高亮示例，以供快速参考。
- **🌍 多语言支持 (i18n)：** 内置完整的中文和英文支持，可在设置中无缝切换。
- **🎨 现代外观与主题 (Theming)：** 优雅的界面设计，支持浅色 (Light)、深色 (Dark) 以及跟随系统主题切换，提供舒适的学习环境。
- **💾 本地进度保存：** 使用本地存储自动追踪和保存您的学习进度和挑战完成情况。

## **�️ 技术栈 (Tech Stack)**

- **前端框架:** React 18, Vite
- **客户端架构:** Tauri + Rust (构建轻量级本地应用)
- **UI 组件库:** Radix UI, Tailwind CSS, Lucide Icons
- **状态与多语言:** react-i18next
- **深色模式:** next-themes

## **🚀 快速开始 (Getting Started)**

### 先决条件
- Node.js (推荐 v18+)
- Rust & Cargo (用于 Tauri 构建)

### 安装与运行
1. 克隆仓库:
   ```bash
   git clone https://github.com/CodingRookie98/RegexLearning.git
   cd RegexLearning
   ```
2. 安装依赖:
   ```bash
   npm install
   ```
3. 运行开发环境:
   ```bash
   npm run tauri dev
   ```
4. 构建生产版本:
   ```bash
   npm run tauri build
   ```

## **💖 感谢 (Credits)**

感谢 [aykutkardas/regexlearn.com](https://github.com/aykutkardas/regexlearn.com) 提供的灵感和优秀的正则表达式学习思路。本应用程序是其核心思想的本地化客户端实现，并增加了题库挑战和多语言功能。

## **📄 许可证 (License)**

This project is licensed under the MIT License.
