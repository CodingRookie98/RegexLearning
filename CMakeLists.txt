cmake_minimum_required(VERSION 3.5)

project(RegexLearning VERSION 0.1 LANGUAGES CXX)

set(CMAKE_AUTOUIC ON)
set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

if (${CMAKE_SYSTEM_NAME} MATCHES "Linux")
    # Linux系统
    # 在这里添加针对Linux的特定配置
    set(CMAKE_RUNTIME_OUTPUT_DIRECTORY_DEBUG ${CMAKE_CURRENT_SOURCE_DIR}/bin/linux/Debug)
    Set(CMAKE_RUNTIME_OUTPUT_DIRECTORY_RELEASE ${CMAKE_CURRENT_SOURCE_DIR}/bin/linux/Release)
    set(CMAKE_RUNTIME_OUTPUT_DIRECTORY_MINSIZEREL ${CMAKE_CURRENT_SOURCE_DIR}/bin/linux/minSizeRe)
elseif (${CMAKE_SYSTEM_NAME} MATCHES "Windows")
    # Windows系统
    # 在这里添加针对Windows的特定配置
    set(CMAKE_RUNTIME_OUTPUT_DIRECTORY_DEBUG ${CMAKE_CURRENT_SOURCE_DIR}/bin/win/Debug)
    Set(CMAKE_RUNTIME_OUTPUT_DIRECTORY_RELEASE ${CMAKE_CURRENT_SOURCE_DIR}/bin/win/Release)
    set(CMAKE_RUNTIME_OUTPUT_DIRECTORY_MINSIZEREL ${CMAKE_CURRENT_SOURCE_DIR}/bin/win/minSizeRe)
endif ()

set(CMAKE_INSTALL_PREFIX ${CMAKE_CURRENT_SOURCE_DIR}/install)

find_package(QT NAMES Qt6 REQUIRED COMPONENTS Widgets)
find_package(Qt${QT_VERSION_MAJOR} REQUIRED COMPONENTS Widgets)
find_package(Boost REQUIRED COMPONENTS regex)

include_directories(
        ./src/
        ./src/page/practiceWnd
        ./src/page/cheatSheetWnd
)

# 遍历所有.cpp、.h、.ui文件
file(GLOB_RECURSE cpp_h_ui_path
        ./src/*.cpp
        ./src/*.h
        ./src/*.ui
        )

foreach (cpp_h_ui_file_path ${cpp_h_ui_path})
    string(REPLACE "${CMAKE_CURRENT_SOURCE_DIR}/" "" cpp_h_ui_filename ${cpp_h_ui_file_path})
    list(APPEND SOURCES_CPP_H_UI ${cpp_h_ui_filename})
endforeach (cpp_h_ui_file_path)

if (${QT_VERSION_MAJOR} GREATER_EQUAL 6)
    qt_add_executable(RegexLearning
            MANUAL_FINALIZATION
            ${SOURCES_CPP_H_UI}
            ./res/res.qrc
            ./res/StyleSheet.qrc
            ./res/homeWnd.qrc
            )
    #    qt_create_translation(QM_FILES ${CMAKE_SOURCE_DIR} ${TS_FILES})
else ()
    add_executable(RegexLearning
            ${SOURCES_CPP_H_UI}
            ./res/res.qrc
            ./res/StyleSheet.qrc
            ./res/homeWnd.qrc
            )
    #    qt5_create_translation(QM_FILES ${CMAKE_SOURCE_DIR} ${TS_FILES})
endif ()
target_link_libraries(RegexLearning PRIVATE Boost::regex)
target_link_libraries(RegexLearning
        PRIVATE
        Qt${QT_VERSION_MAJOR}::Widgets
        )

set_target_properties(RegexLearning PROPERTIES
        MACOSX_BUNDLE_GUI_IDENTIFIER my.example.com
        MACOSX_BUNDLE_BUNDLE_VERSION ${PROJECT_VERSION}
        MACOSX_BUNDLE_SHORT_VERSION_STRING ${PROJECT_VERSION_MAJOR}.${PROJECT_VERSION_MINOR}
        MACOSX_BUNDLE TRUE
        WIN32_EXECUTABLE TRUE
        )

install(TARGETS RegexLearning
        BUNDLE DESTINATION .
        LIBRARY DESTINATION ${CMAKE_INSTALL_LIBDIR})

if (QT_VERSION_MAJOR EQUAL 6)
    qt_finalize_executable(RegexLearning)
endif ()