#include "CheatSheetWindow.h"
#include "ui_CheatSheetWindow.h"
#include "ToolPage.h"
#include "tool/helperFunc.h"
#include <list>
#include <qjsonarray.h>
#include <qjsonobject.h>
#include <qjsonvalue.h>

const QString jsonFile_cheatSheet = "://data/cheatSheet.json";
const std::list<QString> groupName{
    "anchors", "characterClasses", "flags",
    "groupAndReferences", "lookarounds",
    "quantifiersAndAlternation"};

CheatSheetWindow::CheatSheetWindow(QWidget *parent) :
    QWidget(parent),
    ui(new Ui::CheatSheetWindow) {
    ui->setupUi(this);
    init();
}

CheatSheetWindow::~CheatSheetWindow() {
    delete ui;
}

void CheatSheetWindow::init() {
    QJsonObject jsonObject = readJson(jsonFile_cheatSheet);
    for (const auto &qstr : groupName) {
        QJsonValue jsValue = jsonObject.value(qstr);
        if (jsValue.type() == QJsonValue::Array) {
            QJsonArray jsArray = jsValue.toArray();
            for (int i = 0; i < jsArray.size(); ++i) {
                ToolPage *toolPage = new ToolPage(this);
                if (toolPage == nullptr) {
                    qDebug() << "toolPage is nullptr";
                }

                QJsonValue baseValue = jsArray.at(i);
                if (baseValue.type() == QJsonValue::Object) {
                    QJsonObject baseObject = baseValue.toObject();

                    // * 设置title
                    if (baseObject.value("title").toString().isEmpty() == false) {
                        toolPage->set_title(baseObject.value("title").toString());
                    } else {
                        toolPage->set_title("");
                    }

                    // * 设置description
                    if (baseObject.value("description").toString().isEmpty() == false) {
                        toolPage->set_description(baseObject.value("description").toString());
                    } else {
                        toolPage->set_description("");
                    }

                    // * 设置pattern
                    if (baseObject.value("pattern").toString().isEmpty() == false) {
                        toolPage->set_pattern(baseObject.value("pattern").toString());
                    } else {
                        toolPage->set_pattern("");
                    }

                    // * 设置text
                    if (baseObject.value("text").toString().isEmpty() == false) {
                        toolPage->set_text(baseObject.value("text").toString());
                    } else {
                        toolPage->set_text("");
                    }
                }

                if (qstr == "anchors") {
                    ui->anchors->addWidget(toolPage);
                } else if (qstr == "characterClasses") {
                    ui->characterClasses->addWidget(toolPage);
                } else if (qstr == "lookarounds") {
                    ui->lookarounds->addWidget(toolPage);
                } else if (qstr == "quantifiersAndAlternation") {
                    ui->quantifiersAndAlternation->addWidget(toolPage);
                } else if (qstr == "flags") {
                    ui->flags->addWidget(toolPage);
                } else {
                    ui->groupAndReferences->addWidget(toolPage);
                }
            }
        }
    }
}
