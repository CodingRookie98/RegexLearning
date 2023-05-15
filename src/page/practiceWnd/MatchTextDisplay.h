
#ifndef MATCHTEXTDISPALY_H
#define MATCHTEXTDISPALY_H

#include <QTextBrowser>


class MatchTextDisplay : public QTextBrowser {
    Q_OBJECT
public:
    MatchTextDisplay(QWidget* parent);
    ~MatchTextDisplay();
    void setMatchText(const std::vector<QString>& _text);
private:
    void init();
};

#endif // MATCHTEXTLABEL_H
