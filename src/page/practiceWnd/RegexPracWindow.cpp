#include "RegexPracWindow.h"
#include "tool/helperFunc.h"
#include "ui_RegexPracWindow.h"
#include "./MatchTextDisplay.h"
#include <qbrush.h>
#include <qcolor.h>
#include <qicon.h>
#include <qpalette.h>
#include <qregularexpression.h>
#include <qtmetamacros.h>
#include <qurl.h>
#include <type_traits>

QIcon openEye;
QIcon closeEye;
const QString mdTitleHead("# ");
const QString lineBreak("\n");

RegexPracWindow::RegexPracWindow(QWidget *parent) :
    QWidget(parent),
    ui(new Ui::RegexPracWindow) {
    ui->setupUi(this);

    //    this->setParent(parent);
    init();
    PageEvent();
}

RegexPracWindow::~RegexPracWindow() {
    //    qDebug() << "PageRegxPrac dtr";
    delete ui;
}

void RegexPracWindow::init() {
    openEye.addFile(":/svg/svg/eye_open.svg");
    closeEye.addFile(":/svg/svg/eye_close.svg");

    TopicInfo *cur = dynamic_cast<TopicInfo *>(ui->listWidget->currentItem());
    ui->matchText->setMatchText(cur->get_text());
    ui->description->setMarkdown(mdTitleHead + cur->get_title() + lineBreak + cur->get_description());

    ui->description->setAlignment(Qt::AlignCenter);

    // * 设置答案文本框默认为隐藏
    ui->label_Answer->setVisible(false);

    // * 设置题目错误提醒信息框为不可见
    ui->ErrorTopicInfo->setVisible(false);

    // * 设置正则错误提醒框默认为不可见
    ui->regexError->setVisible(false);

    ui->lineEdit_regexInput->setFixedHeight(40);

    // * 设置答案显示按钮的鼠标悬停提示文字
    ui->toolButton_openAnswer->setToolTip("显示答案");
}

// * 练习页面的各种信号事件处理
void RegexPracWindow::PageEvent() {
    ListWidgetEvent();
    regexEditEvent();
    ButtonEvent();
}

void RegexPracWindow::ListWidgetEvent() {
    // 当listItem改变时
    connect(ui->listWidget, &QListWidget::currentItemChanged, ui->listWidget, [&](QListWidgetItem *cur) {
        TopicInfo *item = dynamic_cast<TopicInfo *>(cur);

        // * 设置题目描述
        if (item != nullptr && item->get_id()) {
            if (ui->description != nullptr) {
                ui->description->setMarkdown(mdTitleHead + item->get_title() + lineBreak + item->get_description());
                ui->description->setAlignment(Qt::AlignCenter);
            }
        }

        if (item != nullptr) {                // 解决窗口关闭时的段错误
            ui->lineEdit_regexInput->clear(); // 当item改变时清楚输入框内容
        }

        // ! 请勿随便改动此处代码逻辑
        // 如果匹配的答案文本为空
        if (item != nullptr && item->get_matchedAnswerText().isEmpty()) {
            // 设置提醒文本
            ui->ErrorTopicInfo->setVisible(true);
            ui->ErrorTopicInfo->setText("当前题目答案有错, 请联系管理员修改");

            // 设置正则输入框不可见
            ui->lineEdit_regexInput->setVisible(false);
            ui->label_regex->setVisible(false);

            // * 清除匹配文本框中的内容并设置其为不可见
            ui->matchText->clear();
            ui->matchText->setVisible(false);
            ui->label_matchedText->setVisible(false);
            ui->regexError->setVisible(false);

            // * 设置当前listItem背景色为红色
            ui->listWidget->currentItem()->setBackground(QBrush(QColor("red")));
        } else if (item != nullptr && item->get_matchedAnswerText().isEmpty() != true) {
            ui->matchText->setMatchText(item->get_text());
            ui->lineEdit_regexInput->setVisible(true);
            ui->label_regex->setVisible(true);
            ui->matchText->setVisible(true);
            ui->label_matchedText->setVisible(true);

            ui->ErrorTopicInfo->setVisible(false);
            ui->regexError->setVisible(false);

            // * 发送答案按钮点击信号，切换答案显示状态及显示答案按钮状态
            if (ui->label_Answer->isVisible()) {
                emit ui->toolButton_openAnswer->clicked();
            }
        }
    });
}

void RegexPracWindow::regexEditEvent() {
    // * 当正则表达式输入框文字内容改变时
    connect(ui->lineEdit_regexInput, &QLineEdit::textChanged, ui->matchText, [&]() {
        TopicInfo *cur                 = dynamic_cast<TopicInfo *>(ui->listWidget->currentItem());
        QString Answer                 = cur->get_answer();
        QString inputText              = ui->lineEdit_regexInput->text();
        std::vector<QString> textMatch = cur->get_text();
        QRegularExpression regexAnswer(Answer);

        ui->matchText->setMatchText(textMatch);

        ui->regexError->setVisible(false);

        // * 若用户输入的正则表达式与答案一致
        if (Answer == inputText) {
            // * 将所有匹配结果颜色设为绿色
            regexReplaceAndSetColor(textMatch, regexAnswer, true);
            ui->matchText->setMatchText(textMatch);
            // * 答案正确提醒
            ui->regexError->setStyleSheet("background: green;");
            ui->regexError->setText("答案正确");
            ui->regexError->setVisible(true);
            ui->listWidget->currentItem()->setIcon(QIcon(":/svg/svg/correct.svg"));
        } else {
            QRegularExpression inputRegex(inputText);
            // * 如果输入的正则表达式合法且输入的正则表达式不为空
            if (inputRegex.isValid() && inputText.isEmpty() == false) {
                // * 获得用户输入的正则表达式匹配的结果
                QString userMatched;
                for (const auto &qstr : textMatch) {
                    QRegularExpressionMatchIterator iter_match = inputRegex.globalMatch(qstr);
                    while (iter_match.hasNext()) {
                        userMatched.append(iter_match.next().captured(0));
                    }
                }
                // * 如果用户的正则匹配结果和答案匹配结果不一致
                if (userMatched != cur->get_matchedAnswerText()) {
                    // * 将用户所有匹配的结果颜色设为红色
                    regexReplaceAndSetColor(textMatch, inputRegex, false);
                    ui->matchText->setMatchText(textMatch);

                } else { // * 结果一致，将结果颜色设为绿色
                    regexReplaceAndSetColor(textMatch, inputRegex, true);
                    ui->matchText->setMatchText(textMatch);
                    // * 答案正确提醒
                    ui->regexError->setStyleSheet("background: green;");
                    ui->regexError->setText("答案正确");
                    ui->regexError->setVisible(true);
                    ui->listWidget->currentItem()->setIcon(QIcon(":/svg/svg/correct.svg"));
                }
            } else if (inputRegex.isValid() == false && inputText.isEmpty() == false) {
                // * 输入正则表达式非法提醒
                ui->regexError->setStyleSheet("background: red;");
                ui->regexError->setText(inputRegex.errorString());
                ui->regexError->setVisible(true);
            }
        }
    });
}

void RegexPracWindow::ButtonEvent() {
    // 当点击显示/关闭答案按钮时
    connect(ui->toolButton_openAnswer, &QToolButton::clicked, ui->label_Answer, [&] {
        TopicInfo *cur = dynamic_cast<TopicInfo *>(ui->listWidget->currentItem());

        QString str = cur->get_answer();

        ui->label_Answer->setText(str);

        // * 如果答案文本框可见, 点击按钮时答案关闭文本框，并设置图标为openEye;
        if (ui->label_Answer->isVisible()) {
            ui->label_Answer->setVisible(false);
            ui->toolButton_openAnswer->setIcon(openEye);
            ui->toolButton_openAnswer->setToolTip("显示答案");
        } else {
            ui->label_Answer->setVisible(true);
            ui->toolButton_openAnswer->setIcon(closeEye);
            ui->toolButton_openAnswer->setToolTip("关闭答案");
        }
    });

    // 当点击上一个按钮时
    connect(ui->pushButton_Previous, &QToolButton::clicked, ui->listWidget, [&]() {
        const TopicInfo *cur = dynamic_cast<TopicInfo *>(ui->listWidget->currentItem());
        auto begin           = ui->listWidget->get_topicInfos()->cbegin();
        if (cur != nullptr && cur->get_id() != begin->get_id()) {
            ui->listWidget->setCurrentRow(ui->listWidget->currentRow() - 1);
        }
        // * 发送答案按钮点击信号，切换答案显示状态及显示答案按钮状态
        if (ui->label_Answer->isVisible()) {
            emit ui->toolButton_openAnswer->clicked();
        }
        ui->lineEdit_regexInput->clear();
    });

    // 当点击下一个按钮时
    connect(ui->pushButton_Next, &QToolButton::clicked, ui->listWidget, [&]() {
        const TopicInfo *cur = dynamic_cast<TopicInfo *>(ui->listWidget->currentItem());
        auto end             = ui->listWidget->get_topicInfos()->cend();

        if (cur != nullptr && cur->get_id() != (--end)->get_id()) {
            ui->listWidget->setCurrentRow(ui->listWidget->currentRow() + 1);
        }
        // * 发送答案按钮点击信号，切换答案显示状态及显示答案按钮状态
        if (ui->label_Answer->isVisible()) {
            emit ui->toolButton_openAnswer->clicked();
        }
        ui->lineEdit_regexInput->clear();
    });
}
