## 安装PYQT5
```bash
#ArchLinux
pacman -S python-pyqt5 qt5-base
pacman -S python-pyqt5-webengine
pacman -S qt5-tools

# Windows
pip install PyQt5
pip install PyQtWebEngine
pip install PyQt5-tools

# 打包
pip install pyinstaller
```

## 打包
```bash
# 静态库
pyinstaller -F -w -i=logo.ico main.py
pyinstaller main.spec

# 图片资源
pyrcc5 -o favicon.py favicon.qrc

```

## VSCode
- 安装 pyqt integration
- 配置 > 扩展设置
- Pyuic:Cmd "pyuic5"
- Qtdesigner:Path "designer"

## ArchLinux 重新安装
```bash
# 卸载
pacman -Rsc python-pyqt5 qt5-base
# 清理文件
rm -fr /usr/lib/python3.10/site-packages/PyQt5
# 安装
pacman -S python-pyqt5 qt5-base
```