#include "helperFunc.h"

std::string HtmlHeadRed   = "<font color=\"red\">";
std::string HtmlHeadGreen = "<font color=\"green\">";
std::string HtmlTail      = "</font>";

bool is_valid_regex(const std::string &pattern) {
    try {
        std::regex re(pattern); // 构造正则表达式对象
        return true;            // 如果没有抛出异常，说明正则表达式合法
    } catch (std::regex_error &e) {
        // qDebug() << "Invalid regex: " << e.what();; // 打印错误信息
        return false; // 如果抛出异常，说明正则表达式不合法
    }
}

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

void regexReplaceAndSetColor(std::vector<std::string> &vec,
                             const std::regex &pattern,
                             const bool color) {
    for (auto &str : vec) {
        if (color == true) {
            str = std::regex_replace(str, pattern, HtmlHeadGreen + "$&" + HtmlTail);
        } else {
            str = std::regex_replace(str, pattern, HtmlHeadRed + "$&" + HtmlTail);
        }
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
