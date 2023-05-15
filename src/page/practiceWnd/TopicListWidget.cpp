
#include <QJsonValue>
#include <QJsonArray>
#include "TopicListWidget.h"
#include "tool/helperFunc.h"

TopicListWidget::TopicListWidget(QWidget *parent) :
    QListWidget(parent) {
    this->topicInfos = std::make_shared<std::list<TopicInfo>>();

    //    this->setParent(this);
    init();
}

TopicListWidget::TopicListWidget() {
    this->topicInfos = std::make_shared<std::list<TopicInfo>>();
    init();
}

TopicListWidget::~TopicListWidget() {
    // qDebug() << "TopicListWidget dtr";

    // *
    this->setCurrentRow(-1);

    topicInfos.reset();
}

std::shared_ptr<std::list<TopicInfo>> TopicListWidget::get_topicInfos() const {
    return this->topicInfos;
}

void TopicListWidget::init() {
    init_TopicInfos();

    for (auto &info : *topicInfos) {
        this->addItem(&info);
        this->setCurrentItem(&info);
        this->currentItem()->setText(
            QString::number(info.get_id())
            + QString("、")
            + info.get_title());
    }
    this->setCurrentRow(0);
}

void TopicListWidget::init_TopicInfos() {
    QJsonObject jsonObject = readJson(":/data/data/TopicInfo.json");
    QJsonValue jsValue     = jsonObject.value("topicInfoArray");

    if (jsValue.type() == QJsonValue::Array) {
        QJsonArray jsArray = jsValue.toArray();
        for (int i = 0; i < jsArray.size(); ++i) {
            TopicInfo info(this);
            QJsonValue baseValue = jsArray.at(i);
            if (baseValue.type() == QJsonValue::Object) {
                QJsonObject baseObject = baseValue.toObject();

                // * 初始化
                info.set_id(int(baseObject.value("id").toInt()));
                info.set_title(QString(baseObject.value("title").toString()));

                QJsonValue text_value = baseObject.value("text");
                if (text_value.type() == QJsonValue::Array) {
                    QJsonArray textArray = text_value.toArray();
                    for (int pos = 0; pos < textArray.size(); ++pos) {
                        QJsonValue textBaseValue = textArray.at(pos);
                        info.set_text(textBaseValue.toString());
                    }
                } else {
                    info.set_text(text_value.toString());
                }

                info.set_answer(QString(baseObject.value("answer").toString()));

                std::string strInputReg = baseObject.value("answer").toString().toStdString();
                // * 检查答案正则表达式是否合法
                if (is_valid_regex(strInputReg)) {
                    // * 获得当前题目所有匹配结果
                    std::vector<QString> toBeMatced             = info.get_text();
                    std::vector<std::string> stdStr_tobeMatched = convertQstringToStdstr(toBeMatced);
                    std::regex inputReg(strInputReg);
                    std::string allMatched;

                    for (auto &str : stdStr_tobeMatched) {
                        for (std::sregex_iterator it(str.begin(), str.end(),
                                                     inputReg),
                             end;
                             it != end; ++it) {
                            allMatched.append(it->str());
                        }
                    }
                    if (allMatched.empty() != true) {
                        info.set_matchedAnswerText(allMatched);
                    } else {                                                                                                                       // * 若匹配到的文本为空，则弹出警告
                        info.set_matchedAnswerText(std::string(""));
                        QMessageBox msg(this);                                                                                                     // 创建对话框
                        msg.setWindowTitle("Warning");                                                                                             // 设置对话框标题
                        msg.setText(QString::number(info.get_id()) + "、" + info.get_title() + "\n" + "正则答案没有匹配到任何文本，请联系管理员"); // 设置对话框的提示信息
                        msg.setIcon(QMessageBox::Warning);                                                                                         // 设置对话框的图标
                        // 设置对话框的按钮
                        msg.setStandardButtons(QMessageBox::Ok);
                        msg.exec();
                    }
                } else { // * 若正则表达式非法弹出消息对话框提示用户
                    // 设置答案匹配文本为空
                    info.set_matchedAnswerText(std::string(""));
                    // 强制用户选择
                    QMessageBox msg(this);                                                                                   // 创建对话框
                    msg.setWindowTitle("Warning");                                                                           // 设置对话框标题
                    msg.setText(QString::number(info.get_id()) + "、" + info.get_title() + "\n" + "错误答案，请联系管理员"); // 设置对话框的提示信息
                    msg.setIcon(QMessageBox::Warning);                                                                       // 设置对话框的图标
                    // 设置对话框的按钮
                    msg.setStandardButtons(QMessageBox::Ok);
                    msg.exec();
                }
            }
            this->topicInfos->push_back(info);
        }
    }
}
