package util

import (
	"crypto/md5"
	"encoding/hex"
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
