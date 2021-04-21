package util

import "strconv"

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
