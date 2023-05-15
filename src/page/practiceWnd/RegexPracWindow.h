#ifndef REGEXPRACWINDOW_H
#define REGEXPRACWINDOW_H

#include <QWidget>
#include <QFile>
#include <QJsonArray>
#include <QJsonObject>
#include <QJsonParseError>
#include <QMessageBox>
#include <QIcon>
#include <regex>
#include <list>

namespace Ui {
class RegexPracWindow;
}

class RegexPracWindow : public QWidget {
    Q_OBJECT

public:
    RegexPracWindow(QWidget *parent = nullptr);
    ~RegexPracWindow();

private:
    Ui::RegexPracWindow *ui;

    void init();
    void PageEvent();
    void ListWidgetEvent();
    void ButtonEvent();
    void regexEditEvent();
};

#endif // RegexPracWindow_H
