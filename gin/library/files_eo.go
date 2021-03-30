package library

import (
	"fmt"
	"io/ioutil"
	"mime/multipart"
	"os"
	"path/filepath"
	"regexp"
	"strconv"
	"strings"
	"webmis/util"

	"github.com/gin-gonic/gin"
)

var Root string

// Files :文件类
type FilesEo struct{}

// New :创建
func (FilesEo) New(root string) {
	Root = root
}

// List :列表
func (fe FilesEo) List(path string) map[string]interface{} {
	// 路径
	if path == "/" {
		path = ""
	} else {
		path = util.Trim(path, "/") + "/"
	}
	reg := regexp.MustCompile("\\.\\.|\\.\\/")
	path = reg.ReplaceAllString(path, "")
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
	// 是否文件夹
	root := Root + path
	dir, err := os.Stat(root)
	if err != nil {
		return res
	}
	if !dir.IsDir() {
		return res
	}
	// 文件夹&文件
	var total int64
	list, _ := ioutil.ReadDir(root)
	for _, f := range list {
		ff := root + "/" + f.Name()
		size := fe.FileSize(ff)
		total += size
		ctime := fe.GetCtime(ff)
		mtime := fe.GetMtime(ff)
		perm := fe.GetPerm(ff)
		if f.IsDir() {
			folder = append(folder, map[string]interface{}{
				"name":  f.Name(),
				"size":  fe.FormatBytes(size),
				"ctime": ctime,
				"mtime": mtime,
				"perm":  perm,
			})
		} else {
			files = append(files, map[string]interface{}{
				"name":  f.Name(),
				"size":  fe.FormatBytes(size),
				"ctime": ctime,
				"mtime": mtime,
				"perm":  perm,
				"ext":   fe.GetExt(f.Name()),
			})
		}
	}
	res["folder"] = folder
	res["files"] = files
	res["size"] = fe.FormatBytes(total)
	return res
}

// FileSize :统计大小
func (fe FilesEo) FileSize(ff string) int64 {
	var total int64
	// 文件
	dir, _ := os.Stat(ff)
	if !dir.IsDir() {
		return dir.Size()
	}
	// 文件夹
	list, _ := ioutil.ReadDir(ff)
	for _, f := range list {
		if f.IsDir() {
			dir := filepath.Join(ff, f.Name())
			total += fe.FileSize(dir)
		} else {
			total += f.Size()
		}
	}
	return total
}

// GetCtime :创建时间
func (FilesEo) GetCtime(ff string) string {
	f, _ := os.Stat(ff)
	return f.ModTime().Format("2006-01-02 15:04:05")
}

// GetMtime :修改时间
func (FilesEo) GetMtime(ff string) string {
	f, _ := os.Stat(ff)
	return f.ModTime().Format("2006-01-02 15:04:05")
}

// GetPerm :获取权限值
func (fe FilesEo) GetPerm(ff string) int {
	f, _ := os.Stat(ff)
	perm := f.Mode().String()
	p1 := fe.permToVal(perm[1:4])
	p2 := fe.permToVal(perm[4:7])
	p3 := fe.permToVal(perm[7:10])
	res, _ := strconv.Atoi(p1 + p2 + p3)
	return res
}

// 权限值 转 数字
func (FilesEo) permToVal(perm string) string {
	var num int
	if perm[0:1] == "r" {
		num += 4
	}
	if perm[1:2] == "w" {
		num += 2
	}
	if perm[2:3] == "x" {
		num += 1
	}
	return strconv.Itoa(num)
}

// GetExt :文件后缀
func (FilesEo) GetExt(fileName string) string {
	arr := strings.Split(fileName, ".")
	if len(arr) > 0 {
		return arr[len(arr)-1:][0]
	}
	return ""
}

// FormatBytes :格式化
func (FilesEo) FormatBytes(bytes int64) string {
	var str string
	if bytes >= 1073741824 {
		str = fmt.Sprintf("%.2f GB", float64(bytes)/1073741824)
	} else if bytes >= 1048576 {
		str = fmt.Sprintf("%.2f MB", float64(bytes)/1048576)
	} else if bytes >= 1024 {
		str = fmt.Sprintf("%.2f KB", float64(bytes)/1024)
	} else {
		str = fmt.Sprintf("%.0f B", float64(bytes))
	}
	return str
}

/* 创建目录 */
func (FilesEo) Mkdir(path string) bool {
	path = Root + path
	if err := os.MkdirAll(path, 0766); err != nil {
		return false
	}
	return true
}

/* 重命名 */
func (FilesEo) Rename(rename string, name string) bool {
	src := Root + rename
	dst := Root + name
	if err := os.Rename(src, dst); err != nil {
		return false
	}
	return true
}

/* 上传文件 */
func (FilesEo) Upload(c *gin.Context, file *multipart.FileHeader, filename string) bool {
	dst := Root + filename
	if err := c.SaveUploadedFile(file, dst); err != nil {
		return false
	}
	return true
}

/* 写入 */
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

/* 删除(文件夹&文件) */
func (FilesEo) RemoveAll(path string) error {
	path = Root + path
	return os.RemoveAll(path)
}
