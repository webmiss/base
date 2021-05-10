package util

import (
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

/* 是否KEY */
func InKey(name string, data map[string]interface{}) bool {
	_, ok := data[name]
	return ok
}

/* 三元表达式 */
func If(val bool, tVal interface{}, fVal interface{}) interface{} {
	if val {
		return tVal
	} else {
		return fVal
	}
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
	t := ts.Unix()
	if t > 0 {
		return t
	} else {
		return 0
	}
}

/* 去首尾空格 */
func Trim(str interface{}, charlist ...string) string {
	char := " "
	if len(charlist) > 0 {
		char = charlist[0]
	}
	return strings.Trim(Strval(str), char)
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
