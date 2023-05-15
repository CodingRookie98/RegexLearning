
#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include "RegexPracWindow.h"
#include "page/homeWnd/HomeWindow.h"
#include "page/regexTestWnd/RegexTestWindow.h"
#include <QMainWindow>
#include <QButtonGroup>

QT_BEGIN_NAMESPACE
namespace Ui {
class MainWindow;
}
QT_END_NAMESPACE

class MainWindow : public QMainWindow {
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

private:
    Ui::MainWindow *ui;

    QButtonGroup btnGroup;
    HomeWindow homeWnd;
    RegexPracWindow regexPracWnd;
    RegexTestWindow regexTestWnd;

    void init();

    // * 左边导航栏事件处理
    void leftSideBarEvent();
};

#endif // MAINWINDOW_H
