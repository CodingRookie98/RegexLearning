#include "helperFunc.h"
#include "boost/regex/v5/match_flags.hpp"
#include "boost/regex/v5/regex_fwd.hpp"
#include "tool/helperFunc.h"
#include <qregularexpression.h>
#include <string>
#include <vector>
#include <boost/regex.hpp>

// QString HtmlHeadRed   = "<font color=\"red\">";
// QString HtmlHeadGreen = "<font color=\"green\">";
// QString HtmlTail = "</font>";

QString HtmlHeadRed   = "<font style=\"background-color:#D50506;\">";
QString HtmlHeadGreen = "<font style=\"background-color:#9BF80C;\">";
QString HtmlTail      = "</font>";

QJsonObject readJson(const QString &fileName) {
    // 读取json文件
    QFile jsFile(fileName);
    if (!jsFile.open(QIODevice::ReadOnly | QIODevice::Text)) {
        qDebug() << "can't open TopicInfo.json error!";
    }

    // 读取文件的全部内容
    QString value = jsFile.readAll();

    QJsonParseError parseJsonErr;
    QJsonDocument document = QJsonDocument::fromJson(value.toUtf8(), &parseJsonErr);

    if (!(parseJsonErr.error == QJsonParseError::NoError)) {
        QMessageBox::about(NULL, "提示", "配置文件错误！");
    }

    QJsonObject jsonObject = document.object();

    return jsonObject;
}

void regexReplaceAndSetColor(std::vector<QString> &vec,
                             const QRegularExpression &pattern,
                             const bool color) {
    std::vector<std::string> stdStr = convertQstringToStdstr(vec);
    //    qDebug() << pattern.pattern().toStdString();
    try {
        boost::regex Reg(pattern.pattern().toStdString());
        for (auto &str : stdStr) {
            std::string stdPattern = pattern.pattern().toStdString();
            if (color) {
                if (stdPattern.find("?") != std::string::npos && stdPattern.find("\\?") == std::string::npos) {
                    str = boost::regex_replace(str, Reg,
                                               HtmlHeadGreen.toStdString() + "$&" + HtmlTail.toStdString(), boost::regex_constants::format_first_only);
                } else {
                    str = boost::regex_replace(str, Reg,
                                               HtmlHeadGreen.toStdString() + "$&" + HtmlTail.toStdString());
                }
            } else {
                if (stdPattern.find("?") != std::string::npos && stdPattern.find("\\?") == std::string::npos) {
                    str = boost::regex_replace(str, Reg,
                                               HtmlHeadRed.toStdString() + "$&" + HtmlTail.toStdString(), boost::regex_constants::format_first_only);
                } else {
                    str = boost::regex_replace(str, Reg,
                                               HtmlHeadRed.toStdString() + "$&" + HtmlTail.toStdString());
                }
            }
        }
    } catch (boost::regex_error &e) {
        return;
    }
    vec.clear();
    vec = convertStdstrToQstring(stdStr);
}

void regexReplaceAndSetColor(QString &qstr, const QRegularExpression &pattern, const bool color) {
    try {
        boost::regex Reg;
        std::string stdReg = pattern.pattern().toStdString();
        std::string str = qstr.toStdString();
        if (stdReg.find("/i") != std::string::npos) {
            // qDebug() << QString(stdReg.c_str());
            stdReg.erase(stdReg.find("/i"), 2);
            // qDebug() << QString(stdReg.c_str());
            Reg.assign(stdReg, boost::regex::icase);
        } else {
            Reg.assign(stdReg);
        }
        if (color) {
            str = boost::regex_replace(str, Reg,
                                       HtmlHeadGreen.toStdString() + "$&" + HtmlTail.toStdString());
        } else {
            str = boost::regex_replace(str, Reg,
                                       HtmlHeadRed.toStdString() + "$&" + HtmlTail.toStdString());
        }

        qstr.clear();
        qstr = qstr.append(QString(str.c_str()));
        qstr.replace("\\n", "<br>");
    } catch (boost::regex_error &e) {
        return;
    }
}

std::vector<std::string>
convertQstringToStdstr(const std::vector<QString> &input) {
    // 创建一个空的输出容器
    std::vector<std::string> output;
    // 遍历输入容器中的每个元素
    for (const auto &element : input) {
        // 将每个元素从QString转换为std::string，使用toStdString()方法
        std::string converted = element.toStdString();
        // 将转换后的元素添加到输出容器中
        output.push_back(converted);
    }
    // 返回输出容器
    return output;
}

std::vector<QString>
convertStdstrToQstring(const std::vector<std::string> &input) {
    std::vector<QString> output;
    for (const auto &element : input) {
        QString converted = QString(element.c_str());
        output.push_back(converted);
    }
    return output;
}

void printVecQString(const std::vector<QString> &vec) {
    qDebug() << "this is printVecQString";
    for (const auto &qstr : vec) {
        qDebug() << qstr;
    }
}
