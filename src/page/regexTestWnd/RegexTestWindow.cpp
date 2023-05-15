#include <QRegularExpressionMatch>
#include "RegexTestWindow.h"
#include "ui_RegexTestWindow.h"
#include <memory>
#include <qapplication.h>
#include <qlineedit.h>
#include <qobjectdefs.h>
#include <qregularexpression.h>
#include <qtextbrowser.h>
#include <qtextedit.h>
#include <qtoolbutton.h>
#include <qwindowdefs.h>
#include <QFileDialog>
#include <string>
#include <QRegularExpression>

RegexTestWindow::RegexTestWindow(QWidget *parent) :
    QWidget(parent),
    ui(new Ui::RegexTestWindow) {
    ui->setupUi(this);
    this->setParent(parent);

    init();
    pageEvent();
}

RegexTestWindow::~RegexTestWindow() {
    delete ui;
}

void RegexTestWindow::init() {
    ui->RegexInput->setFixedHeight(40);
    ui->labelTextMatched->setFixedHeight(ui->btnPasteText->height());
    this->clipboard_1 = QApplication::clipboard();
    ui->ErrorDisplay->setVisible(false);
}

void RegexTestWindow::pageEvent() {
    buttonEvent();
    lineEditEvent();
    textEditEvent();
    textBrowserEvent();
}

void RegexTestWindow::buttonEvent() {
    onPasteRegexClicked();
    onPasteTextClicked();
    onOpenFileClicked();
    onClearTextCliked();
}

void RegexTestWindow::lineEditEvent() {
    connect(ui->RegexInput, &QLineEdit::textChanged, ui->RegexInput, [&]() {
        ui->ErrorDisplay->setVisible(false);
        ui->textMatched->clear();
        // * 判断文本浏览器是否有文本，有则进行正则匹配
        if (ui->textEdit->toPlainText().isEmpty() != true) {
            QRegularExpression reg(ui->RegexInput->text(), QRegularExpression::MultilineOption);
            if (reg.isValid()) {
                QRegularExpressionMatchIterator iter_match =
                    reg.globalMatch(ui->textEdit->toPlainText());
                while (iter_match.hasNext()) {
                    QString qstr = iter_match.next().captured(0);
                    ui->textMatched->append(qstr);
                }
            } else {
                // * 正则表达式非法提醒
                ui->ErrorDisplay->setText(reg.errorString());
                ui->ErrorDisplay->setVisible(true);
            }
        } else {
            // * 待匹配文本为空提醒
            ui->ErrorDisplay->setText("待匹配文本为空，请在文本框输入待匹配文本！");
            ui->ErrorDisplay->setVisible(true);
        }
    });
}

void RegexTestWindow::textEditEvent() {
}

void RegexTestWindow::onPasteRegexClicked() {
    connect(ui->btnPasteRegex, &QToolButton::clicked, ui->RegexInput, [&]() -> void {
        ui->RegexInput->setText(clipboard_1->text());
    });
}

void RegexTestWindow::onPasteTextClicked() {
    connect(ui->btnPasteText, &QToolButton::clicked, ui->textEdit, [&]() {
        QString qstr = clipboard_1->text();
        ui->textEdit->setText(qstr);
    });
}

void RegexTestWindow::onOpenFileClicked() {
    connect(ui->btnOpenFile, &QToolButton::clicked, this, [&]() {
        if (preFileDir.isEmpty()) {
            fileName.clear();
            fileName.push_back(QFileDialog::getOpenFileName(this, "打开", fileRoot, fileFliter));

        } else {
            fileName.clear();
            fileName.push_back(QFileDialog::getOpenFileName(this, "打开", preFileDir, fileFliter));
        }

        // * 读取文件内容输出到文本浏览器
        textFile.setFileName(fileName);
        if (textFile.open(QFile::ReadOnly)) {
            ui->textEdit->setText(textFile.readAll());
        }
        textFile.close();

        // ! 如果不判断fileName是否为空会导致pos位置出错，然后erase函数异常，
        // ! 于是，当没有选取文件时，关闭文件对话框时，主窗口也被关闭
        if (!fileName.isEmpty()) {
            // * 记录上一次打开的文件路径
            const unsigned pos = fileName.toStdString().find_last_of("/");
            preFileDir.clear();
            preFileDir.push_back(QString(fileName.toStdString().erase(pos, fileName.toStdString().length() - pos).c_str()));
        }
    });
}

void RegexTestWindow::onClearTextCliked() {
    connect(ui->btnClearText, &QToolButton::clicked, ui->textEdit, &QTextEdit::clear);
}

void RegexTestWindow::textBrowserEvent() {
}
