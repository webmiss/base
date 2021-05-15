package util

import "net/url"

type Url struct{}

/* 编码 */
func (Url) Encode(data string) string {
	return url.QueryEscape(data)
}

/* 解码 */
func (Url) Decode(data string) string {
	res, err := url.QueryUnescape(data)
	if err != nil {
		return ""
	}
	return res
}
