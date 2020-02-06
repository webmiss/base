## 安装Python插件
```bash
pacman -S python-gobject
```

## 一、插件目录
Sublime3 > Preferences > BrowsePackages > InputIbus
### 快捷键( Default (Linux).sublime-keymap )
```json
[
	{ "keys": ["ctrl+shift+a"], "command": "input_ibus" }
]
```
### 命令( InputIbus.sublime-commands )
```json
[{
	"caption": "InputIbus",
	"command": "input_ibus"
}]
```

## 二、插件( inputibus.py )
```python
#!/usr/bin/env python
# coding: utf8

import sublime
import sublime_plugin

import subprocess
import os

class InputIbusCommand(sublime_plugin.TextCommand):

	def run(self, edit):
		# 内容
		location = os.path.join(sublime.packages_path(), 'InputIbus', 'lib', 'linux_gtk3_ibus_input.py')
		args = [location]
		proc = subprocess.Popen(args, stdout=subprocess.PIPE)
		text_returned = proc.communicate()[0].strip()
		text_output = text_returned.decode('utf-8')
		# 输入内容
		sel = self.view.sel()
		if text_output:
			for region in sel:
				if region.size() == 0:
					self.view.insert(edit, region.end(), text_output)
				else:
					self.view.replace(edit, region, text_output)
```
### 调用窗口( lib/linux_gtk3_ibus_input.py )
```python
#!/usr/bin/env python

import gi
gi.require_version('Gtk', '3.0')
from gi.repository import Gtk

class SimpleTextInput:
	def __init__(self):
		self.print_text_flag = False
		# 创建窗口
		win = Gtk.Window()
		win.connect("delete-event", Gtk.main_quit)
		win.set_title("中文输入")
		win.set_default_size(600, 60)
		# win.set_position(Gtk.WIN_POS_CENTER)
		win.connect("destroy", self.destroy)
		win.set_border_width(10)
		# 文本框
		self.textInput = Gtk.Entry()
		self.textInput.set_tooltip_text("Press Ctrl-Enter or Enter to insert string")
		self.textInput.connect("key_press_event", self.on_key_press)
		win.add(self.textInput)
		# 显示窗口
		win.show_all()
		Gtk.main()
	# 执行插入
	def destroy(self, widget, data=None):
		if self.print_text_flag == False:
			self.print_text()
		Gtk.main_quit()
	# Enter插入
	def on_key_press(self, widget, event):
		keyname = event.keyval
		if keyname==65293:
			self.print_text()
			self.print_text_flag = True
			self.destroy(self, widget)
		if keyname==65307:
			Gtk.main_quit()
	# 输出文本
	def print_text(self):
		buffer = self.textInput.get_buffer()
		print(buffer.get_text())

if __name__ == "__main__":
	txt = SimpleTextInput()
```

### 修改权限
```bash
chmod -R 777 InputIbus
```
