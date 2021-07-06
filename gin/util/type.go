package util

import (
	"encoding/json"
	"strconv"
)

/* 类型转换 */
type Type struct{}

/* Bool */
func (t Type) Bool(val interface{}) bool {
	str := t.Strval(val)
	res, err := strconv.ParseBool(str)
	if err != nil {
		return false
	}
	return res
}

/* Int */
func (t Type) Int(val interface{}) int {
	str := t.Strval(val)
	res, err := strconv.Atoi(str)
	if err != nil {
		return 0
	}
	return res
}

/* Int64 */
func (t Type) Int64(val interface{}) int64 {
	str := t.Strval(val)
	res, err := strconv.ParseInt(str, 10, 64)
	if err != nil {
		return 0
	}
	return res
}

/* Float */
func (t Type) Float(val interface{}) float32 {
	str := t.Strval(val)
	res, err := strconv.ParseFloat(str, 32)
	if err != nil {
		return 0
	}
	return float32(res)
}

/* Float64 */
func (t Type) Float64(val interface{}) float64 {
	str := t.Strval(val)
	res, err := strconv.ParseFloat(str, 64)
	if err != nil {
		return 0
	}
	return res
}

/* Uint64 */
func (t Type) Uint64(val interface{}) uint64 {
	str := t.Strval(val)
	res, err := strconv.ParseUint(str, 10, 64)
	if err != nil {
		return 0
	}
	return res
}

/* 转换: string、int、int64、float、float64、uint64 */
func (t Type) ToType(tp string, val interface{}) interface{} {
	switch tp {
	case "string":
		return t.Strval(val)
	case "int":
		return t.Int(val)
	case "int64":
		return t.Int64(val)
	case "float":
		return t.Float(val)
	case "float64":
		return t.Float64(val)
	case "uint64":
		return t.Uint64(val)
	default:
		return val
	}
}

/* Interface 转 String */
func (Type) Strval(val interface{}) string {
	var res string
	if val == nil {
		return res
	}
	switch val.(type) {
	case string:
		res = val.(string)
	case int:
		it := val.(int)
		res = strconv.Itoa(it)
	case int8:
		it := val.(int8)
		res = strconv.Itoa(int(it))
	case int16:
		it := val.(int16)
		res = strconv.Itoa(int(it))
	case int32:
		it := val.(int32)
		res = strconv.Itoa(int(it))
	case int64:
		it := val.(int64)
		res = strconv.FormatInt(it, 10)
	case float64:
		ft := val.(float64)
		res = strconv.FormatFloat(ft, 'f', -1, 64)
	case float32:
		ft := val.(float32)
		res = strconv.FormatFloat(float64(ft), 'f', -1, 64)
	case uint:
		it := val.(uint)
		res = strconv.Itoa(int(it))
	case uint8:
		it := val.(uint8)
		res = strconv.Itoa(int(it))
	case uint16:
		it := val.(uint16)
		res = strconv.Itoa(int(it))
	case uint32:
		it := val.(uint32)
		res = strconv.Itoa(int(it))
	case uint64:
		it := val.(uint64)
		res = strconv.FormatUint(it, 10)
	case []byte:
		res = string(val.([]byte))
	default:
		data, _ := json.Marshal(val)
		res = string(data)
	}
	return res
}

/* 获取类型 */
func (Type) GetType(val interface{}) string {
	var res string
	if val == nil {
		return "nil"
	}
	switch val.(type) {
	case string:
		res = "string"
	case int:
		res = "int"
	case int8:
		res = "int8"
	case int16:
		res = "int16"
	case int32:
		res = "int32"
	case int64:
		res = "int64"
	case float32:
		res = "float32"
	case float64:
		res = "float64"
	case uint:
		res = "uint"
	case uint8:
		res = "uint8"
	case uint16:
		res = "uint16"
	case uint32:
		res = "uint32"
	case uint64:
		res = "uint64"
	case []byte:
		res = "byte"
	default:
		res = ""
	}
	return res
}
