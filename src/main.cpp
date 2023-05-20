#include "mainwindow.h"

#include <QApplication>
#include <qfilesystemwatcher.h>
#include <qobject.h>

// #define _DEBUG_

int main(int argc, char *argv[]) {
    QApplication a(argc, argv);
    MainWindow w;
    w.show();

#ifdef _DEBUG_
    QFileSystemWatcher fileWatcher;
    QString qss("./res/style.qss");
    QFile qssFile(qss);

    if (qssFile.open(QFile::ReadOnly)) {    // 2.
        w.setStyleSheet(qssFile.readAll()); // 3.
    }
    qssFile.close();

    qDebug() << qssFile.exists();

    fileWatcher.addPath(qss);
    QObject::connect(&fileWatcher, &QFileSystemWatcher::fileChanged, [&w, &qssFile]() {
        qDebug() << "file changed";
        if (qssFile.open(QFile::ReadOnly)) {
            w.setStyleSheet(qssFile.readAll());
            qssFile.close();
        }
    });
#else
    QFile qssFile(":/qss/style.qss");           // 1.
    if (qssFile.open(QFile::ReadOnly)) {        // 2.
        w.setStyleSheet(qssFile.readAll());     // 3.
    }
    qssFile.close();                            // 4.
#endif

    return a.exec();
}
