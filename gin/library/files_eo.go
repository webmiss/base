package library

import (
	"os"
	"webmis/base"
	"webmis/config"
)

var RootDir = config.Env().RootDir

// Files :文件类
type FilesEo struct {
	base.Base
}

// Mkdir :创建目录
func (FilesEo) Mkdir(dir string) error {
	if err := os.MkdirAll(RootDir+dir, 0766); err != nil {
		return err
	}
	return nil
}

// Writer :写入
func (FilesEo) Writer(file string, content string) error {
	f, err := os.OpenFile(RootDir+file, os.O_CREATE|os.O_RDWR, 0766)
	if err != nil {
		return err
	}
	defer f.Close()
	f.WriteString(content)
	return nil
}

// Del :删除(文件夹&文件)
func (f FilesEo) Del(file string) error {
	f.Print(file)
	return nil
}
