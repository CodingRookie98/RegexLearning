#include "HomeWindow.h"
#include "qbuttongroup.h"
#include "ui_HomeWindow.h"
#include <qdesktopservices.h>
#include <qpixmap.h>
#include <qtmetamacros.h>
#include <qtoolbutton.h>
#include <qurl.h>

HomeWindow::HomeWindow(QWidget *parent) :
    QWidget(parent),
    ui(new Ui::HomeWindow)
{
    ui->setupUi(this);
    init();
}

HomeWindow::~HomeWindow()
{
    delete ui;
}

void HomeWindow::init() {
    this->btnGroup.addButton(ui->btnStartLearn, 1);
    this->btnGroup.addButton(ui->btnStartLearn_1, 1);
    this->btnGroup.addButton(ui->btnPlayGround, 2);
    this->btnGroup.addButton(ui->btnCheetSheet, 3);
    buttonEvent();
}

void HomeWindow::buttonEvent() {
    connect(&btnGroup, &QButtonGroup::idClicked, this, [&](int id) {
        emit sendLeftBarButtonIndex(id);
    });

    connect(ui->btnGithub, &QToolButton::clicked, ui->btnGithub, []() {
        QDesktopServices::openUrl(QUrl("https://github.com/CodingRookie98/RegexLearning"));
    });
}
