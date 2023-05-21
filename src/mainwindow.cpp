
#include "mainwindow.h"
#include "./ui_mainwindow.h"
#include "qbuttongroup.h"

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

    this->btnGroup.addButton(ui->btnHome, 0);
    this->btnGroup.addButton(ui->btnPrac, 1);
    this->btnGroup.addButton(ui->btnRegexTest, 2);
    this->btnGroup.addButton(ui->btnCheatSheet, 3);

    this->setMinimumWidth(1000);
    ui->stackedWidget->setCurrentIndex(0);

    // QFile qssFile("./res/FluentUI/QMainWindow.qss");
    // if (qssFile.open(QFile::ReadOnly)) {
    //     this->setStyleSheet(qssFile.readAll());
    // }
    leftSideBarEvent();
}

// 导航栏中点击按钮切换窗口
void MainWindow::leftSideBarEvent() {
    connect(&btnGroup, &QButtonGroup::idClicked,
            ui->stackedWidget, &QStackedWidget::setCurrentIndex);
    connect(&homeWnd, &HomeWindow::sendPageIndex, ui->stackedWidget, &QStackedWidget::setCurrentIndex);
}
