#include "mainwindow.h"
#include <QApplication>
#include <qfilesystemwatcher.h>
#include <qobject.h>
#include <QSettings>
#include <qsettings.h>

// #define _DEBUG_

#ifdef _DEBUG_
const QString styleSheetPath   = "style.qss";
const QString styleSheetConfig = "style_Debug.ini";
QFileSystemWatcher fileWatcher;
#else
const QString styleSheetPath   = ":/qss/style.qss";
const QString styleSheetConfig = ":/ini/style.ini";
#endif

void realRefreshTheme(QString &style) {
    // qDebug() << "realReFreshTheme";
    QMap<QString, QString> theme;
    QSettings settings(styleSheetConfig, QSettings::IniFormat);

    for (const QString &key : settings.allKeys()) {
        // qDebug() << "key is " << key;
        const QString &path = settings.value(key).toString();
        QFile file(path);
#ifdef _DEBUG_
        fileWatcher.addPath(path);
#endif

        if (file.open(QIODevice::ReadOnly)) {
            // qDebug() << path << " is opened";
            theme.insert(key, file.readAll());
        } else {
            theme.insert(key, "");
        }
    }
    for (const QString &key : theme.keys()) {
        style.replace(key, theme[key]);
    }
}

void realRefreshStyle() {
    QFile file(styleSheetPath);
    if (file.open(QIODevice::ReadOnly)) {
        // qDebug() << "style.qss opened";
        QString style = file.readAll();
        // qDebug() << style;
        realRefreshTheme(style);
        qobject_cast<QApplication *>(QApplication::instance())->setStyleSheet(style);
        file.close();
    }
}

int main(int argc, char *argv[]) {
    QApplication a(argc, argv);
    MainWindow w;
    w.show();

#ifdef _DEBUG_
    fileWatcher.addPath(styleSheetPath);
    fileWatcher.addPath(styleSheetConfig);
    realRefreshStyle();
    QObject::connect(&fileWatcher, &QFileSystemWatcher::fileChanged, [](const QString &path) {
        qDebug() << path << " is changed";
        realRefreshStyle();
    });
#else
    realRefreshStyle();
#endif

    return a.exec();
}
