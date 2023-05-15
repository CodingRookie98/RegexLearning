
#include "MatchTextDisplay.h"

MatchTextDisplay::MatchTextDisplay(QWidget* parent)
    : QTextBrowser(parent) {
    init();
}

void MatchTextDisplay::init()
{
    this->setFixedHeight(150);
}

MatchTextDisplay::~MatchTextDisplay()
{

}

void MatchTextDisplay::setMatchText(const std::vector<QString>& _text) {
    QString totalStr;
    for (auto& text : _text) {
        totalStr.append(text + "<br/>");
//        qDebug() << "totalStr is : " << totalStr;
    }
    this->setText(totalStr);
}

