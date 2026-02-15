# PROJECT KNOWLEDGE BASE

**Generated:** 2026-02-15
**Stack:** C++17, Qt6, CMake, vcpkg

## OVERVIEW
Desktop application for learning Regular Expressions. Built with Qt Widgets.
Core logic involves interactive regex matching against JSON-defined scenarios.

## STRUCTURE
```
.
├── src/          # Source code (Flat structure + Modules)
├── res/          # Resources (QSS, Icons, JSON Data)
├── CMakeLists.txt # Build configuration (Manual output paths)
└── vcpkg.json    # Dependencies (Boost::regex)
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| **Entry Point** | `src/main.cpp` | App init, theme loader |
| **Main UI** | `src/mainwindow.cpp` | Navigation controller |
| **Features** | `src/page/*Wnd` | Distinct functional windows |
| **Regex Data** | `res/data/TopicInfo.json` | Lessons & Validation rules |
| **Styles** | `res/qss` | Qt Stylesheets (Theme engine) |

## COMMANDS
```bash
# Build (Standard CMake)
cmake -B build -S . -DCMAKE_TOOLCHAIN_FILE=[vcpkg_root]/scripts/buildsystems/vcpkg.cmake
cmake --build build

# Run
./build/bin/win/Debug/RegexLearning.exe  # Path varies by OS/Config
```

## CONVENTIONS
- **Qt**: Uses `Qt6::Widgets`.
- **Resources**: Accessed via `:/` prefix (e.g., `:/res/img/`).
- **Data**: JSON files in `res/data` drive the application logic.
- **Styling**: Custom `.qss` reloading mechanism in `main.cpp`.

## ANTI-PATTERNS (THIS PROJECT)
- **Do not** hardcode output paths in CMake (Legacy pattern present).
- **Do not** use `file(GLOB_RECURSE)` for source lists (Legacy pattern present).
- **Avoid** placing logic in `src/` root if it belongs in `page/`.
