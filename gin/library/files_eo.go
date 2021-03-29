package library

import (
	"os"
	"webmis/config"
)

var Root = config.Env().RootDir

// Files :文件类
type FilesEo struct{}

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
