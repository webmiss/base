package util

import (
	"bytes"
	"encoding/json"
	"fmt"
	"os/exec"
	"reflect"
	"strconv"
	"strings"
	"time"
	"unicode/utf8"
)

/* 常用工具 */
type Util struct{}

/* 执行Linux命令 */
func Exec(cmd string) string {
	res, _ := exec.Command("/bin/bash", "-c", cmd).Output()
	return string(res)
}

/* 字符串长度 */
func Len(val string) int {
	return utf8.RuneCountInString(val)
}

/* 是否为空 */
func Empty(val interface{}) bool {
	r := reflect.ValueOf(val)
	res := reflect.Zero(r.Type())
	if !reflect.DeepEqual(r.Interface(), res.Interface()) {
		return false
	} else {
		return true
	}
}

/* 是否KEY */
func InKey(name string, data map[string]interface{}) bool {
	_, ok := data[name]
	return ok
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
		ts, err := strconv.ParseInt((&Type{}).Strval(timestamp[0]), 10, 64)
		if err != nil {
			return ""
		}
		return time.Unix(ts, 0).Format(format)
	}
	return time.Now().Format(format)
}
func DateFormat(format string, duration string) string {
	n := len(duration)
	r := duration[n-1 : n]
	// 时，分、秒（5h30m40s）
	if r == "h" || r == "s" {
		dd, _ := time.ParseDuration(duration)
		return time.Now().Add(dd).Format(format)
	}
	// 年、月、日
	l, _ := strconv.Atoi(duration[0 : n-1])
	if r == "y" {
		return time.Now().AddDate(l, 0, 0).Format(format)
	} else if r == "m" {
		return time.Now().AddDate(0, l, 0).Format(format)
	} else if r == "d" {
		return time.Now().AddDate(0, 0, l).Format(format)
	} else {
		return time.Now().Format(format)
	}
}

/* 时间戳 */
func Time() int64 {
	return time.Now().Unix()
}

/*
String To Timestamp
@format "2006-01-02 15:04:05"
*/
func StrToTime(day string, format string) int64 {
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

/* Timestamp To GmtIso8601 */
func GmtISO8601(timestamp int64) string {
	return time.Unix(timestamp, 0).Format("2006-01-02T15:04:05Z")
}

/* 去首尾空格 */
func Trim(str interface{}, charlist ...string) string {
	char := " "
	if len(charlist) > 0 {
		char = charlist[0]
	}
	return strings.Trim((&Type{}).Strval(str), char)
}

/* String to List */
func Explode(delimiter string, str string) []string {
	res := strings.Split(str, delimiter)
	return res
}

/* List to String */
func Implode(glue string, pieces []string) string {
	b := bytes.Buffer{}
	t := len(pieces)
	for i := 0; i < t; i++ {
		b.WriteString(pieces[i])
		if i+1 != t {
			b.WriteString(glue)
		}
	}
	return b.String()
}

/* Array to []byte */
func JsonEncode(arr interface{}) []byte {
	res, _ := json.Marshal(arr)
	return res
}

/* String to interface{} */
func JsonDecode(str interface{}, res interface{}) error {
	return json.Unmarshal([]byte((&Type{}).Strval(str)), &res)
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

/* 截取小数位数-四舍五入 */
func FloatRound(f float64, n int) float64 {
	format := "%." + strconv.Itoa(n) + "f"
	res, _ := strconv.ParseFloat(fmt.Sprintf(format, f), 64)
	return res
}

/* 截取小数位数-不四舍五入 */
func FloatFloor(f float64, n int) float64 {
	s := strconv.FormatFloat(f, 'f', -1, 64)
	index := strings.LastIndex(s, ".")
	if len(s[index+1:]) < n {
		return f
	}
	res, _ := strconv.ParseFloat(s[:index+1+n], 64)
	return res
}
