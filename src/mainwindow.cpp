
#include "mainwindow.h"
#include "./ui_mainwindow.h"
#include "RegexPracWindow.h"
#include "qbuttongroup.h"
#include <QFile>
#include <QOverload>
#include <QAbstractButton>
#include <qabstractbutton.h>
#include <qtypes.h>

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

    this->btnGroup.addButton(ui->btnHome, 0);
    this->btnGroup.addButton(ui->btnPrac, 1);
    this->btnGroup.addButton(ui->btnRegexTest, 2);

    QFile qssFile(":/qss/style.qss");           // 1.
    if (qssFile.open(QFile::ReadOnly)) {        // 2.
        this->setStyleSheet(qssFile.readAll()); // 3.
    }
    qssFile.close();                            // 4.

    this->setMinimumWidth(1000);
    ui->stackedWidget->setCurrentIndex(0);

    leftSideBarEvent();
}

// 导航栏中点击按钮切换窗口
void MainWindow::leftSideBarEvent() {
    connect(&btnGroup, &QButtonGroup::idClicked,
            ui->stackedWidget, &QStackedWidget::setCurrentIndex);
}
