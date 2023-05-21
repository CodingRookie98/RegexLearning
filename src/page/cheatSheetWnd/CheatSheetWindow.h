#ifndef CHEATSHEETWINDOW_H
#define CHEATSHEETWINDOW_H

#include <QWidget>

namespace Ui {
class CheatSheetWindow;
}

class CheatSheetWindow : public QWidget
{
    Q_OBJECT

public:
    explicit CheatSheetWindow(QWidget *parent = nullptr);
    ~CheatSheetWindow();

private:
    Ui::CheatSheetWindow *ui;

    void init();
};

#endif // CHEATSHEETWINDOW_H
