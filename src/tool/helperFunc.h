#ifndef HELPERFUN_H
#define HELPERFUN_H

#include <regex>
#include <string>
#include <QJsonObject>
#include <QFile>
#include <QJsonParseError>
#include <QMessageBox>

// * 检查正则表达式是否合法
bool is_valid_regex(const std::string &pattern);

// * 读取json文件
QJsonObject readJson(const QString &fileName);

// * 正则替换
// * 利用HTML设置匹配文字颜色， true 为绿色，red 为红色
void regexReplaceAndSetColor(std::vector<QString> &vec, const QRegularExpression &pattern, const bool color);

// * 将容器内的QString转为std::string
std::vector<std::string> convertQstringToStdstr(const std::vector<QString> &input);

// * 将容器内的std::stringg转为QString
std::vector<QString> convertStdstrToQstring(const std::vector<std::string> &input);

void printVecQString(const std::vector<QString> &vec);

void printQstr();
#endif
