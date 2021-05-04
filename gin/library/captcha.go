package library

import (
	"fmt"
	"math/rand"
	"strings"
	"time"
)

type Captcha struct {
	txtChars string
}

/* 验证码 */
func (c *Captcha) Vcode() {
	c.txtChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
	code := c.GetCode(4)
	fmt.Println(code, strings.ToLower(code))
}

/* 获取号码 */
func (c *Captcha) GetCode(num int) string {
	textNum := len(c.txtChars)
	code := ""
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	for i := 0; i < num; i++ {
		code = code + string(c.txtChars[r.Intn(textNum)])
	}
	return code
}
