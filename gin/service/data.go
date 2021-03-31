package service

import "webmis/config"

/* 数据类 */
type Data struct{}

/* 图片地址 */
func (Data) Img(img interface{}) string {
	str := img.(string)
	if str == "" {
		return ""
	}
	return config.Env().BaseURL + str
}
