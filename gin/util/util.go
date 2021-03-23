package util

import (
	"crypto/md5"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"strconv"
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
// @format "2006-01-02 15:04:05"
func (u Util) Date(format string, timestamp ...interface{}) string {
	if len(timestamp) > 0 {
		ts, err := strconv.ParseInt(Strval(timestamp[0]), 10, 64)
		if err != nil {
			return ""
		}
		return time.Unix(ts, 0).Format(format)
	}
	return time.Now().Format(format)
}

// Time :时间戳
func (u Util) Time() int64 {
	return time.Now().Unix()
}

// Strtotime :String To Timestamp
// @format "2006-01-02 15:04:05"
func (u Util) Strtotime(day string, format string) int64 {
	if format == "" {
		format = "2006-01-02 15:04:05"
	}
	ts, _ := time.ParseInLocation(format, day, time.Local)
	return ts.Unix()
}

// Img :图片地址
func (u Util) Img(src interface{}) string {
	if src == "" {
		return src.(string)
	}
	env := config.Env()
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

// JsonEncode :Array to []byte
func (u Util) JsonEncode(arr interface{}) []byte {
	res, _ := json.Marshal(arr)
	return res
}

// JsonDecode :Array to []byte
func (u Util) JsonDecode(str string, res interface{}) {
	err := json.Unmarshal([]byte(str), &res)
	if err != nil {
		fmt.Println(err)
	}
}
