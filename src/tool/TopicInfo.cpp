
#include "./topicinfo.h"

TopicInfo::TopicInfo(QListWidget *parent) :
    QListWidgetItem(parent) {
    text = std::make_shared<std::vector<QString>>();
}

TopicInfo::TopicInfo() {
    text = std::make_shared<std::vector<QString>>();
}

TopicInfo::~TopicInfo() {
    id.reset();
    title.reset();

    text.reset();

    answer.reset();
    matchedAnswerText.reset();
}

int TopicInfo::get_id() const {
    return *id;
}

QString TopicInfo::get_title() const {
    return *title;
};

//
std::vector<QString> TopicInfo::get_text() const {
    std::vector<QString> res;
    for (auto &qstr : *text) {
        res.push_back(qstr);
    }
    return res;
};

QString TopicInfo::get_answer() const {
    return *answer;
}

QString TopicInfo::get_matchedAnswerText() const {
    return *matchedAnswerText;
}

void TopicInfo::set_id(const int &_id) {
    id = std::make_shared<int>(_id);
}

void TopicInfo::set_title(const QString &_title) {
    title = std::make_shared<QString>(_title);
}

void TopicInfo::set_text(const QString &_text) {
    // qDebug() << (text == nullptr ? "is nullprt" : "is not nullptr");
    text->push_back(_text);
    // qDebug() << "text's size : " << text->size() << " text's back : " << text->back();
}

void TopicInfo::set_answer(const QString &_answer) {
    answer = std::make_shared<QString>(_answer);
}

void TopicInfo::set_matchedAnswerText(const QString &_matchedAnswerText) {
    matchedAnswerText = std::make_shared<QString>(_matchedAnswerText);
}
