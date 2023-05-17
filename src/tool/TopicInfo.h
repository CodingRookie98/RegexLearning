
#ifndef _TOPICINFO_H_
#define _TOPICINFO_H_

#include <QListWidgetItem>
#include <cstddef>
#include <memory>
#include <string>
#include <QString>

class TopicInfo : public QListWidgetItem {
private:
    // * 题目序号id
    std::shared_ptr<int> id = nullptr;

    // * 题目标题
    std::shared_ptr<QString> title = nullptr;

    // * 题目描述
    std::shared_ptr<QString> description = nullptr;

    // * 题目待匹配文本
    std::shared_ptr<
        std::vector<
            QString>>
        text = nullptr;

    // * 题目正则表达式答案
    std::shared_ptr<QString> answer = nullptr;

    // * 题目答案匹配的所有结果
    std::shared_ptr<QString> matchedAnswerText = nullptr;

public:
    TopicInfo(QListWidget *parent = nullptr);
    TopicInfo();
    ~TopicInfo();

    int get_id() const;
    QString get_title() const;
    QString get_description() const;
    std::vector<QString> get_text() const;
    QString get_answer() const;
    QString get_matchedAnswerText() const;

    void set_id(const int &_id);
    void set_title(const QString &_title);
    void set_description(const QString &_description);
    void set_text(const QString &_text);
    void set_answer(const QString &_answer);
    void set_matchedAnswerText(const QString &_matchedAnswerText);
};

#endif
