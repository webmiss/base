package library

import (
	"os"
	"webmis/util"
)

var Root string

// Files :文件类
type FilesEo struct{}

// New :创建
func (FilesEo) New(root string) {
	Root = root
}

// List :列表
func (FilesEo) List(path string) map[string]interface{} {
	// 路径
	if path == "/" {
		path = ""
	} else {
		path = util.Trim(path, "/") + "/"
	}
	// 数据
	folder := []map[string]interface{}{}
	files := []map[string]interface{}{}
	res := map[string]interface{}{
		"path":    path,
		"dirNum":  0,
		"fileNum": 0,
		"size":    0,
		"folder":  folder,
		"files":   files,
	}
	return res
}

// Mkdir :创建目录
func (FilesEo) Mkdir(path string) error {
	path = Root + path
	if err := os.MkdirAll(path, 0766); err != nil {
		return err
	}
	return nil
}

// Writer :写入
func (FilesEo) Writer(file string, content string) error {
	file = Root + file
	f, err := os.OpenFile(file, os.O_CREATE|os.O_RDWR, 0766)
	if err != nil {
		return err
	}
	defer f.Close()
	f.WriteString(content)
	return nil
}

// RemoveAll :删除(文件夹&文件)
func (FilesEo) RemoveAll(path string) error {
	path = Root + path
	return os.RemoveAll(path)
}
