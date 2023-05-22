cmake_minimum_required ( VERSION 3.5 )

project ( RegexLearning VERSION 0.1 LANGUAGES CXX )

set ( CMAKE_AUTOUIC ON )
set ( CMAKE_AUTOMOC ON )
set ( CMAKE_AUTORCC ON )

set ( CMAKE_CXX_STANDARD 17 )
set ( CMAKE_CXX_STANDARD_REQUIRED ON )

if ( ${CMAKE_SYSTEM_NAME} MATCHES "Linux" )
    # Linux系统
    # 在这里添加针对Linux的特定配置
    set ( CMAKE_RUNTIME_OUTPUT_DIRECTORY_DEBUG ${CMAKE_CURRENT_SOURCE_DIR}/bin/Debug-Linux )
    Set ( CMAKE_RUNTIME_OUTPUT_DIRECTORY_RELEASE ${CMAKE_CURRENT_SOURCE_DIR}/bin/Release-Linux )
    set ( CMAKE_RUNTIME_OUTPUT_DIRECTORY_MINSIZEREL ${CMAKE_CURRENT_SOURCE_DIR}/bin/minSizeRe-Linux )

    set ( Boost_DIR "./3rdparty/boost-regex/lib-x64-linux/cmake/Boost-1.82.0" )
    set ( Boost_USE_STATIC_RUNTIME ON )
elseif ( ${CMAKE_SYSTEM_NAME} MATCHES "Windows" )
    # Windows系统
    # 在这里添加针对Windows的特定配置
    set ( CMAKE_RUNTIME_OUTPUT_DIRECTORY_DEBUG ${CMAKE_CURRENT_SOURCE_DIR}/bin/Debug-Win )
    Set ( CMAKE_RUNTIME_OUTPUT_DIRECTORY_RELEASE ${CMAKE_CURRENT_SOURCE_DIR}/bin/Release-Win )
    set ( CMAKE_RUNTIME_OUTPUT_DIRECTORY_MINSIZEREL ${CMAKE_CURRENT_SOURCE_DIR}/bin/minSizeRe-Win )
    set ( Boost_DIR "./3rdparty/boost-regex/lib-x64-win/cmake/Boost-1.82.0" )
    # set ( Boost_USE_STATIC_RUNTIME ON )
endif ()

set ( CMAKE_INSTALL_PREFIX ${CMAKE_CURRENT_SOURCE_DIR}/install )


find_package ( QT NAMES Qt6 REQUIRED COMPONENTS Widgets )
find_package ( Qt${QT_VERSION_MAJOR} REQUIRED COMPONENTS Widgets )
find_package ( Boost CONFIG REQUIRED COMPONENTS regex )

include_directories (
    ./src/
    ./src/page/practiceWnd
    ./src/page/cheatSheetWnd
    ./3rdparty/boost-regex/include
)

# 遍历所有.cpp、.h、.ui文件
file ( GLOB_RECURSE cpp_h_ui_path
    ./src/*.cpp
    ./src/*.h
    ./src/*.ui
)

foreach ( cpp_h_ui_file_path ${cpp_h_ui_path} )
    string ( REPLACE "${CMAKE_CURRENT_SOURCE_DIR}/" "" cpp_h_ui_filename ${cpp_h_ui_file_path} )
    list ( APPEND SOURCES_CPP_H_UI ${cpp_h_ui_filename} )
endforeach ( cpp_h_ui_file_path )

qt_add_executable ( RegexLearning
    WIN32
    MANUAL_FINALIZATION
    ${SOURCES_CPP_H_UI}
    ./res/res.qrc
    ./res/StyleSheet.qrc
    ./res/homeWnd.qrc
    ./res/json.qrc
)

target_link_libraries ( RegexLearning
    PRIVATE
    Qt${QT_VERSION_MAJOR}::Widgets
    Boost::regex
)

set_target_properties ( RegexLearning PROPERTIES
    MACOSX_BUNDLE_GUI_IDENTIFIER my.example.com
    MACOSX_BUNDLE_BUNDLE_VERSION ${PROJECT_VERSION}
    MACOSX_BUNDLE_SHORT_VERSION_STRING ${PROJECT_VERSION_MAJOR}.${PROJECT_VERSION_MINOR}
    MACOSX_BUNDLE TRUE
    WIN32_EXECUTABLE TRUE
)

install ( TARGETS RegexLearning
    CONFIGURATIONS Debug
    BUNDLE DESTINATION bin/Debug
    LIBRARY DESTINATION lib/Debug
    RUNTIME DESTINATION bin/Debug
)

install ( TARGETS RegexLearning
    CONFIGURATIONS Release
    BUNDLE DESTINATION bin/Release
    LIBRARY DESTINATION lib/Release
    RUNTIME DESTINATION bin/Release
)

if ( QT_VERSION_MAJOR EQUAL 6 )
    qt_finalize_executable ( RegexLearning )
endif ()