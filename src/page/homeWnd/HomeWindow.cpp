#include "HomeWindow.h"
#include "ui_HomeWindow.h"
#include <qpixmap.h>
#include <qtmetamacros.h>
#include <qtoolbutton.h>

HomeWindow::HomeWindow(QWidget *parent) :
    QWidget(parent),
    ui(new Ui::HomeWindow)
{
    ui->setupUi(this);
    connect(ui->btnStartLearn, &QToolButton::clicked, this, [&]() {
        emit sendPageIndex(1);
    });
}

HomeWindow::~HomeWindow()
{
    delete ui;
}
