#include "ToolPage.h"
#include "qnamespace.h"
#include "qtoolbutton.h"
#include "ui_ToolPage.h"
#include <memory>
#include <qregularexpression.h>
#include <string>
#include "tool/helperFunc.h"

ToolPage::ToolPage(QWidget *parent) :
    QWidget(parent),
    ui(new Ui::ToolPage) {
    ui->setupUi(this);
    ui->infoWidget->setVisible(false);
    buttonEvent();
}

ToolPage::~ToolPage() {
    title.reset();
    description.reset();
    text.reset();
    pattern.reset();

    delete ui;
}

QString ToolPage::get_title() const {
    if (title != nullptr) {
        return *title;
    }
    return QString("");
}

QString ToolPage::get_description() const {
    if (description != nullptr) {
        return *description;
    }
    return QString("");
}

QString ToolPage::get_text() const {
    if (text != nullptr) {
        return *text;
    }
    return QString("");
}

QString ToolPage::get_pattern() const {
    if (pattern != nullptr) {
        return *pattern;
    }
    return QString("");
}

void ToolPage::set_title(const QString &_title) {
    title = std::make_shared<QString>(_title);
    if (title->isEmpty()) {
        ui->itemButton->setText("Error: title is null");
    } else {
        ui->itemButton->setText(*title);
    }
}

void ToolPage::set_description(const QString &_description) {
    description = std::make_shared<QString>(_description);
    if (description->isEmpty()) {
        ui->description->setVisible(false);
    } else {
        ui->description->setText(*description);
    }
}

void ToolPage::set_text(const QString &_text) {
    text = std::make_shared<QString>(_text);
    if (text->isEmpty()) {
        ui->text->setVisible(false);
    } else {
        if (pattern->isEmpty() == false) {
            QRegularExpression qreg(*pattern);
            if (qreg.isValid()) {
                QString temp = *text;
                regexReplaceAndSetColor(temp, qreg, true);
                ui->text->setText(temp);
            } else {
                ui->regex->setText("表达式非法");
            }
        }
    }
}

void ToolPage::set_pattern(const QString &_pattern) {
    pattern = std::make_shared<QString>(_pattern);
    if (pattern->isEmpty()) {
        ui->regex->setVisible(false);
    } else {
        if (pattern->toStdString().find("/i") != std::string::npos) {
            std::string str = pattern->toStdString();
            str.erase(str.find("/i"), 2);
            ui->regex->setText(QString(str.c_str()));
        } else {
            ui->regex->setText(*pattern);
        }
    }
}

void ToolPage::buttonEvent() {
    connect(ui->itemButton, &QToolButton::clicked, ui->infoWidget, [&]() {
        if (ui->infoWidget->isVisible()) {
            ui->infoWidget->setVisible(false);
            ui->itemButton->setArrowType(Qt::RightArrow);
        } else {
            ui->infoWidget->setVisible(true);
            ui->itemButton->setArrowType(Qt::DownArrow);
        }
    });
}
