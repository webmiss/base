package base

import "fmt"

type Base struct{}

/* 输出到控制台 */
func (self *Base) Print(content ...interface{}) {
	fmt.Println(content...)
}
