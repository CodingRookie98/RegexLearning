
#include "mainwindow.h"
#include "./ui_mainwindow.h"
#include "qbuttongroup.h"
#include <qabstractbutton.h>
#include <qobject.h>
#include <qtoolbutton.h>

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent), ui(new Ui::MainWindow) {
    ui->setupUi(this);

    init();
}

MainWindow::~MainWindow() {
    delete ui;
}

void MainWindow::init() {
    ui->stackedWidget->addWidget(&homeWnd);      // index = 0;
    ui->stackedWidget->addWidget(&regexPracWnd); // index = 1;
    ui->stackedWidget->addWidget(&regexTestWnd); // index = 2;
    ui->stackedWidget->addWidget(&cheatSheetWnd); // index = 3
    ui->stackedWidget->addWidget(&aboutWnd);      // index = 4

    this->btnGroup.addButton(ui->btnHome, 0);
    this->btnGroup.addButton(ui->btnPrac, 1);
    this->btnGroup.addButton(ui->btnRegexTest, 2);
    this->btnGroup.addButton(ui->btnCheatSheet, 3);
    this->btnGroup.addButton(ui->btnAbout, 4);

    this->setMinimumWidth(1000);
    ui->stackedWidget->setCurrentIndex(0);

    leftSideBarEvent();
}

// 导航栏中点击按钮切换窗口
void MainWindow::leftSideBarEvent() {
    // qDebug() << btnGroup.exclusive(); // true

    connect(&btnGroup, &QButtonGroup::idClicked,
            ui->stackedWidget, &QStackedWidget::setCurrentIndex);

    connect(&btnGroup, &QButtonGroup::idClicked, &btnGroup, [&](int id) {
        // qDebug() << "idClicked is " << id;
        btnGroup.button(id)->setChecked(true);
    });

    connect(&homeWnd, &HomeWindow::sendLeftBarButtonIndex, &btnGroup, &QButtonGroup::idClicked);
}
