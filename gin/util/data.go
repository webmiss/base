package util

import "webmis/config"

// Data :数据类
type Data struct{}

// Img :图片地址
func (Data) Img(img interface{}) string {
	str := img.(string)
	if str == "" {
		return ""
	}
	env := (&config.Env{}).Config()
	return env.BaseURL + str
}
