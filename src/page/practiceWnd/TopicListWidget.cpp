
#include <QJsonValue>
#include <QJsonArray>
#include <qregularexpression.h>
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

                // * 初始化id和title
                info.set_id(int(baseObject.value("id").toInt()));
                info.set_title(QString(baseObject.value("title").toString()));

                // * 初始化description
                info.set_description(baseObject.value("description").toString());

                // * 初始化匹配待匹配文本
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

                // * 初始化答案正则匹配到的文本
                info.set_answer(QString(baseObject.value("answer").toString()));
                QRegularExpression answerRegex(baseObject.value("answer").toString());
                // * 检查答案正则表达式是否合法
                if (answerRegex.isValid()) {
                    // * 获得当前题目所有匹配结果
                    std::vector<QString> toBeMatced             = info.get_text();
                    std::vector<std::string> stdStr_tobeMatched = convertQstringToStdstr(toBeMatced);
                    QString allMatched;

                    for (auto const &qstr : toBeMatced) {
                        QRegularExpressionMatchIterator iter_match =
                            answerRegex.globalMatch(qstr);
                        while (iter_match.hasNext()) {
                            allMatched.append(iter_match.next().captured(0));
                        }
                    }
                    // * 如果匹配到的文本不为空
                    if (allMatched.isEmpty() != true) {
                        info.set_matchedAnswerText(allMatched);
                    } else { // * 若匹配到的文本为空，则弹出警告
                        info.set_matchedAnswerText(QString(""));
                    }
                } else { // * 若正则表达式非法
                    // 设置答案匹配文本为空
                    info.set_matchedAnswerText(QString(""));
                }
            }
            this->topicInfos->push_back(info);
        }
    }
}
