package util

import (
	"fmt"
	"time"
)

type JSONTime time.Time

/* 格式化JsonTime */
func (u JSONTime) MarshalJSON() ([]byte, error) {
	var stamp = fmt.Sprintf("\"%s\"", time.Time(u).Format("2006-01-02 15:04:05"))
	return []byte(stamp), nil
}
