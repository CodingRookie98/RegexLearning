# **🔍 Regex Learning - Unlock the Secrets of Regular Expressions**

[🇨🇳 中文版 (Chinese Version)](README.zh-CN.md) | 🇬🇧 English

**Embark on a journey to master Regular Expressions with [Regex Learning](https://github.com/CodingRookie98/RegexLearning). This platform ensures a smooth learning experience through an engaging, step-by-step approach and rich features, empowering you to write Regex like a pro!**

Inspired by [regexlearn.com](https://github.com/aykutkardas/regexlearn.com).

---

## **🌟 Features**

- **🚶 Step-by-Step Learning:** Progress through carefully crafted lessons and examples at your own pace, tailored for both beginners and advanced users.
- **🧩 Question Bank & Challenges:** Test your knowledge with real-world Regex challenges. Solve problems and instantly see test case results in the built-in validator, tracking your mastery.
- **🚀 Playground / Sandbox:** Experiment and test your Regex patterns freely in a dedicated sandbox environment with real-time text highlighting and matching.
- **📚 Interactive Cheat Sheet:** Keep a concise summary of Regex syntax and usage at your fingertips, featuring collapsible categories and highlighted examples for quick reference.
- **🌍 Internationalization (i18n):** Built-in support for both English and Chinese, seamlessly switchable within the Settings.
- **🎨 Modern Aesthetics & Theming:** Elegant UI design supporting Light, Dark, and System themes for a comfortable learning environment.
- **💾 Local Progress Saving:** Automatically tracks and saves your learning progress and challenge completions using local storage.

## **🛠️ Tech Stack**

- **Frontend Framework:** React 18, Vite
- **Client Architecture:** Tauri + Rust (for building a lightweight native application)
- **UI Components:** Radix UI, Tailwind CSS, Lucide Icons
- **State & i18n:** react-i18next
- **Dark Mode:** next-themes

## **🚀 Getting Started**

### Prerequisites
- Node.js (v18+ recommended)
- Rust & Cargo (for Tauri build)

### Installation & Running
1. Clone the repository:
   ```bash
   git clone https://github.com/CodingRookie98/RegexLearning.git
   cd RegexLearning
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development environment:
   ```bash
   npm run tauri dev
   ```
4. Build the production release:
   ```bash
   npm run tauri build
   ```

## **💖 Credits**

Heartfelt thanks to [aykutkardas/regexlearn.com](https://github.com/aykutkardas/regexlearn.com) for the inspiration and excellent ideas for learning Regular Expressions. This application is a localized native client implementation of its core concept, enriched with Question Bank challenges and multi-language features.

## **📄 License**

This project is licensed under the MIT License.
