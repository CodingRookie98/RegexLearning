
#ifndef TOPICLISTWIDGET_H
#define TOPICLISTWIDGET_H

#include <QListWidget>
#include <list>
#include "tool/TopicInfo.h"

class TopicListWidget : public QListWidget {
    Q_OBJECT
public:
    TopicListWidget(QWidget *parent = nullptr);
    TopicListWidget();
    ~TopicListWidget();

    std::shared_ptr<std::list<TopicInfo>> get_topicInfos() const;

private:
    std::shared_ptr<std::list<TopicInfo>> topicInfos = nullptr;
    void init();
    void init_TopicInfos();
};

#endif // TOPICLISTWIDGET_H
