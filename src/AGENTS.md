# SOURCE KNOWLEDGE BASE

## OVERVIEW
Core C++ source code. Mixed flat structure with feature modules in `page/`.

## STRUCTURE
```
src/
├── main.cpp            # App entry, Custom Theme Loader
├── mainwindow.*        # Root UI Controller
├── helperFunc.*        # Global utilities
└── page/               # Feature Modules
    ├── aboutWnd/       # "About" dialog
    ├── cheatSheetWnd/  # Regex reference
    ├── homeWnd/        # Landing page
    ├── practiceWnd/    # Interactive lessons
    └── regexTestWnd/   # Sandbox
```

## CONVENTIONS
- **Naming**: Feature directories end in `Wnd` (e.g., `homeWnd`).
- **Includes**: Relative includes used extensively.
- **UI**: `.ui` files co-located with `.cpp`/`.h`.

## ARCHITECTURE
- **Window-Based**: Each feature is a self-contained "Window" widget.
- **No DI**: Components are often directly instantiated.
- **Global Helpers**: `helperFunc` contains shared logic.

## ANTI-PATTERNS
- **Mixing Levels**: `main.cpp` contains logic that should be in a `ThemeManager`.
- **Flat Root**: Avoid adding new files to `src/` root; prefer subdirectories.
