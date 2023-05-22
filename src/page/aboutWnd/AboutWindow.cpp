#include "AboutWindow.h"
#include "ui_AboutWindow.h"
#include <QFile>
#include <QLabel>
#include <QTextDocument>
#include <QPainter>
#include <QImage>
#include <qpixmap.h>

AboutWindow::AboutWindow(QWidget *parent) :
    QWidget(parent),
    ui(new Ui::AboutWindow) {
    ui->setupUi(this);
    QFile mdFile(":/md/data/about.md");
    if (mdFile.open(QIODevice::ReadOnly | QIODevice::Text)) {
        ui->label_md->setText(mdFile.readAll());
    }
    ui->label_alipay->setPixmap(QPixmap(":/img/img/alipay(300x300).jpg"));
    ui->label_wechat->setPixmap(QPixmap(":/img/img/wechat(300x300).png"));
}

AboutWindow::~AboutWindow() {
    delete ui;
}
