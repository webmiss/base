package util

import (
	"encoding/json"
	"strconv"
)

/* Bool */
func Bool(val interface{}) bool {
	str := Strval(val)
	res, err := strconv.ParseBool(str)
	if err != nil {
		return false
	}
	return res
}

/* Int */
func Int(val interface{}) int {
	str := Strval(val)
	res, err := strconv.Atoi(str)
	if err != nil {
		return 0
	}
	return res
}

/* Int64 */
func Int64(val interface{}) int64 {
	str := Strval(val)
	res, err := strconv.ParseInt(str, 10, 64)
	if err != nil {
		return 0
	}
	return res
}

/* Float */
func Float(val interface{}) float64 {
	str := Strval(val)
	res, err := strconv.ParseFloat(str, 32)
	if err != nil {
		return 0
	}
	return res
}

/* Float64 */
func Float64(val interface{}) float64 {
	str := Strval(val)
	res, err := strconv.ParseFloat(str, 64)
	if err != nil {
		return 0
	}
	return res
}

/* Uint64 */
func Uint64(val interface{}) uint64 {
	str := Strval(val)
	res, err := strconv.ParseUint(str, 10, 64)
	if err != nil {
		return 0
	}
	return res
}

/* Interface 转 String */
func Strval(value interface{}) string {
	var key string
	if value == nil {
		return key
	}
	switch value.(type) {
	case float64:
		ft := value.(float64)
		key = strconv.FormatFloat(ft, 'f', -1, 64)
	case float32:
		ft := value.(float32)
		key = strconv.FormatFloat(float64(ft), 'f', -1, 64)
	case int:
		it := value.(int)
		key = strconv.Itoa(it)
	case uint:
		it := value.(uint)
		key = strconv.Itoa(int(it))
	case int8:
		it := value.(int8)
		key = strconv.Itoa(int(it))
	case uint8:
		it := value.(uint8)
		key = strconv.Itoa(int(it))
	case int16:
		it := value.(int16)
		key = strconv.Itoa(int(it))
	case uint16:
		it := value.(uint16)
		key = strconv.Itoa(int(it))
	case int32:
		it := value.(int32)
		key = strconv.Itoa(int(it))
	case uint32:
		it := value.(uint32)
		key = strconv.Itoa(int(it))
	case int64:
		it := value.(int64)
		key = strconv.FormatInt(it, 10)
	case uint64:
		it := value.(uint64)
		key = strconv.FormatUint(it, 10)
	case string:
		key = value.(string)
	case []byte:
		key = string(value.([]byte))
	default:
		newValue, _ := json.Marshal(value)
		key = string(newValue)
	}
	return key
}
