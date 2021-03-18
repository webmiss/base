package util

import (
	"crypto/md5"
	"encoding/hex"
	"strings"
	"time"
	"webmis/config"
)

// Util :常用工具
type Util struct{}

// Md5 :加密
func (u Util) Md5(str string) string {
	data := []byte(str)
	h := md5.New()
	h.Write(data)
	return hex.EncodeToString(h.Sum(nil))
}

// Date :格式化时间
func (u Util) Date(format string) string {
	return time.Now().Format(format)
}

// Img :图片地址
func (u Util) Img(src interface{}) string {
	if src == "" {
		return src.(string)
	}
	env := (&config.Env{}).Config()
	return env.BaseURL + src.(string)
}

// Explode :String to List
func (u Util) Explode(delimiter string, str string) []string {
	res := strings.Split(str, delimiter)
	return res
}

// Implode :List to String
func (u Util) Implode(glue string, pieces []string) string {
	res := strings.Join(pieces, glue)
	return res
}
