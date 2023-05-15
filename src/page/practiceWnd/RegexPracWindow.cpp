#include "RegexPracWindow.h"
#include "tool/helperFunc.h"
#include "ui_RegexPracWindow.h"
#include "./MatchTextDisplay.h"
#include <qurl.h>

const QIcon openEye(":/svg/svg/eye_open.svg");
const QIcon closeEye(":/svg/svg/eye_close.svg");
const QString fileHead("qrc:/topicDescription/topic_description/");
const QString fileExt(".md");

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
    ui->description->setSource(QUrl("qrc:/topicDescription/topic_description/1.md"));

    TopicInfo *cur = dynamic_cast<TopicInfo *>(ui->listWidget->currentItem());
    ui->matchText->setMatchText(cur->get_text());

    ui->description->setAlignment(Qt::AlignCenter);

    // 设置答案文本框默认为隐藏
    ui->label_Answer->setVisible(false);

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
    // 当点击liswidgetItem时设置文本匹配框文字
    connect(ui->listWidget, &QListWidget::itemClicked, ui->listWidget, [&]() {
        // 进行下行转换，父类指针实际指向子类，所以安全
        TopicInfo *cur = dynamic_cast<TopicInfo *>(ui->listWidget->currentItem());
        // 如果匹配的答案文本为空
        if (cur->get_matchedAnswerText().empty()) {
            // 设置提醒文本
            ui->matchText->setText("本题正确正则表达式有错，请联系管理员修改！");
            ui->label_regex->setVisible(false);
            // 设置正则输入框不可输入
            ui->lineEdit_regexInput->setVisible(false);
        } else {
            ui->matchText->setMatchText(cur->get_text());
            ui->lineEdit_regexInput->setVisible(true);
            ui->label_regex->setVisible(true);
        }
        ui->label_Answer->setVisible(false);
    });

    // 当item改变时
    connect(ui->listWidget, &QListWidget::currentItemChanged, ui->listWidget, [&](QListWidgetItem *cur) {
        TopicInfo *item = dynamic_cast<TopicInfo *>(cur);

        // * 设置题目描述
        if (item != nullptr && item->get_id()) {
            QUrl url = fileHead + QString::number(item->get_id()) + fileExt;
            // qDebug() << url;
            if (ui->description != nullptr) {
                ui->description->setSource(url);
                ui->description->setAlignment(Qt::AlignCenter);
            }
        }

        // ! 请勿随便改动此处代码逻辑
        // 如果匹配的答案文本为空
        if (item != nullptr && item->get_matchedAnswerText().empty()) {
            // 设置提醒文本
            ui->matchText->setText(QString("本题正确正则表达式有错，请联系管理员修改！"));
            ui->label_regex->setVisible(false);
            // 设置正则输入框不可输入
            ui->lineEdit_regexInput->setVisible(false);
        } else if (item != nullptr && !item->get_matchedAnswerText().empty()) {
            ui->matchText->setMatchText(item->get_text());
            ui->lineEdit_regexInput->setVisible(true);
            ui->label_regex->setVisible(true);
            if (ui->label_Answer != nullptr) {
                ui->label_Answer->setVisible(false);
            }
        }
    });
}

void RegexPracWindow::regexEditEvent() {
    // * 当正则表达式输入框文字内容改变时
    connect(ui->lineEdit_regexInput, &QLineEdit::textEdited, ui->matchText, [&]() {
        TopicInfo *cur                            = dynamic_cast<TopicInfo *>(ui->listWidget->currentItem());
        QString Answer                            = cur->get_answer();
        QString inputText                         = ui->lineEdit_regexInput->text();
        std::vector<QString> textMatch            = cur->get_text();
        std::vector<std::string> stdStr_textMatch = convertQstringToStdstr(textMatch);
        std::regex regexAnswer(Answer.toStdString());

        ui->matchText->setMatchText(textMatch);

        // * 若用户输入的正则表达式与答案一致
        if (Answer == inputText) {
            // * 将所有匹配结果颜色设为绿色
            regexReplaceAndSetColor(stdStr_textMatch, regexAnswer, true);
            std::vector<QString> QStr = convertStdstrToQstring(stdStr_textMatch);
            ui->matchText->setMatchText(QStr);
            // todo 答案正确提醒

        } else {
            // * 如果输入的正则表达式合法
            std::string input = inputText.toStdString();
            if (is_valid_regex(input)) {
                std::regex inputReg(input);

                // * 获得用户输入的正则表达式匹配的结果
                std::string userMatched;
                for (const auto &str : stdStr_textMatch) {
                    for (std::sregex_iterator it(str.cbegin(), str.cend(),
                                                 inputReg),
                         end;
                         it != end; ++it) {
                        userMatched.append(it->str());
                    }
                }

                // * 如果用户的正则匹配结果和答案匹配结果不一致
                if (userMatched != cur->get_matchedAnswerText()) {
                    // * 将用户所有匹配的结果颜色设为红色
                    regexReplaceAndSetColor(stdStr_textMatch, inputReg, false);
                    std::vector<QString> QStr = convertStdstrToQstring(stdStr_textMatch);
                    ui->matchText->setMatchText(QStr);

                } else { // * 结果一致，将结果颜色设为绿色
                    regexReplaceAndSetColor(stdStr_textMatch, inputReg, true);
                    std::vector<QString> QStr = convertStdstrToQstring(stdStr_textMatch);
                    ui->matchText->setMatchText(QStr);
                    // Todo 答案正确提醒
                }
            } else {
                // todo 输入正则表达式非法提醒
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

        ui->label_Answer->setVisible(false);
    });

    // 当点击下一个按钮时
    connect(ui->pushButton_Next, &QToolButton::clicked, ui->listWidget, [&]() {
        const TopicInfo *cur = dynamic_cast<TopicInfo *>(ui->listWidget->currentItem());
        auto end             = ui->listWidget->get_topicInfos()->cend();
        if (cur != nullptr && cur->get_id() != (--end)->get_id()) {
            ui->listWidget->setCurrentRow(ui->listWidget->currentRow() + 1);
        }

        ui->label_Answer->setVisible(false);
    });
}
