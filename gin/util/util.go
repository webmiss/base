package util

import (
	"crypto/md5"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"reflect"
	"strconv"
	"strings"
	"time"
)

/* 常用工具 */
type Util struct{}

/* 是否为空 */
func Empty(val interface{}) bool {
	r := reflect.ValueOf(val)
	res := reflect.Zero(r.Type())
	if !reflect.DeepEqual(r.Interface(), res.Interface()) {
		return false
	}
	return true
}

/* Md5加密 */
func Md5(str string) string {
	data := []byte(str)
	h := md5.New()
	h.Write(data)
	return hex.EncodeToString(h.Sum(nil))
}

/*
格式化时间
@format "2006-01-02 15:04:05"
*/
func Date(format string, timestamp ...interface{}) string {
	if len(timestamp) > 0 {
		ts, err := strconv.ParseInt(Strval(timestamp[0]), 10, 64)
		if err != nil {
			return ""
		}
		return time.Unix(ts, 0).Format(format)
	}
	return time.Now().Format(format)
}

/* 时间戳 */
func Time() int64 {
	return time.Now().Unix()
}

/*
String To Timestamp
@format "2006-01-02 15:04:05"
*/
func Strtotime(day string, format string) int64 {
	if format == "" {
		format = "2006-01-02 15:04:05"
	}
	ts, _ := time.ParseInLocation(format, day, time.Local)
	return ts.Unix()
}

/* 去首尾空格 */
func Trim(str string, charlist string) string {
	return strings.Trim(str, charlist)
}

/* String to List */
func Explode(delimiter string, str string) []string {
	res := strings.Split(str, delimiter)
	return res
}

/* List to String */
func Implode(glue string, pieces []string) string {
	res := strings.Join(pieces, glue)
	return res
}

/* Array to []byte */
func JsonEncode(arr interface{}) []byte {
	res, _ := json.Marshal(arr)
	return res
}

/* String to interface{} */
func JsonDecode(str string, res interface{}) {
	err := json.Unmarshal([]byte(str), &res)
	if err != nil {
		fmt.Println(err)
	}
}

/* 合并数组 */
func ArrayMerge(arrays ...map[string]interface{}) map[string]interface{} {
	res := map[string]interface{}{}
	for _, arr := range arrays {
		for k, v := range arr {
			res[k] = v
		}
	}
	return res
}

/* 是否存在于数组 */
func InArray(needle string, haystack []string) bool {
	for _, val := range haystack {
		if val == needle {
			return true
		}
	}
	return false
}
