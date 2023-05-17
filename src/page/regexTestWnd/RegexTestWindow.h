#ifndef REGEXTESTWINDOW_H
#define REGEXTESTWINDOW_H

#include <QWidget>
#include <memory>
#include <qwindowdefs.h>
#include <QClipboard>
#include <QFile>

namespace Ui {
class RegexTestWindow;
}

class RegexTestWindow : public QWidget {
    Q_OBJECT

public:
    explicit RegexTestWindow(QWidget *parent = nullptr);
    ~RegexTestWindow();

private:
    Ui::RegexTestWindow *ui;
    const QClipboard *clipboard_1 = nullptr;

    const QString fileRoot   = "\\";                 // 文件系统根目录
    const QString fileFliter = "所有文件(*txt *md *json)"; // 文件类型
    QString preFileDir;                              // 记录上一次打开的文件目录
    QString fileName;                                // 文件路径
    QFile textFile;                                  // 文本文件

    void init();
    void pageEvent();
    void buttonEvent();

    // * 当点击正则输入框粘贴按钮
    void onPasteRegexClicked();

    // * 当点击文本输入框粘贴按钮
    void onPasteTextClicked();

    // * 当点击打开文件按钮时
    void onOpenFileClicked();

    // * 当点击清除文本按钮时
    void onClearTextCliked();

    void lineEditEvent();
    void textEditEvent();
    void textBrowserEvent();
};

#endif // REGEXTESTWINDOW
