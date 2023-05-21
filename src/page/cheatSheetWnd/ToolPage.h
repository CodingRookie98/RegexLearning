#ifndef TOOLPAGE_H
#define TOOLPAGE_H

#include <QWidget>
#include <memory>

namespace Ui {
class ToolPage;
}

class ToolPage : public QWidget {
    Q_OBJECT

public:
    explicit ToolPage(QWidget *parent = nullptr);
    ~ToolPage();

    QString get_title() const;
    QString get_description() const;
    QString get_text() const;
    QString get_pattern() const;

    void set_title(const QString &_title);
    void set_description(const QString &_description);
    void set_text(const QString &_text);
    void set_pattern(const QString &_pattern);

private:
    Ui::ToolPage *ui;
    std::shared_ptr<QString> title       = nullptr;
    std::shared_ptr<QString> description = nullptr;
    std::shared_ptr<QString> text        = nullptr;
    std::shared_ptr<QString> pattern     = nullptr;

    void buttonEvent();
};

#endif // TOOLPAGE_H
