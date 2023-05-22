#ifndef HOMEWINDOW_H
#define HOMEWINDOW_H

#include "qbuttongroup.h"
#include <QWidget>
#include <qtmetamacros.h>

namespace Ui {
class HomeWindow;
}

class HomeWindow : public QWidget
{
    Q_OBJECT

public:
    explicit HomeWindow(QWidget *parent = nullptr);
    ~HomeWindow();

private:
    Ui::HomeWindow *ui;
    QButtonGroup btnGroup;

    void init();
    void buttonEvent();
signals:
    void sendLeftBarButtonIndex(int index);
};

#endif // HOMEWINDOW_H
