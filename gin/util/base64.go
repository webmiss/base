package util

import (
	"bytes"
	"compress/zlib"
	"encoding/base64"
	"io"
	"regexp"
)

type Base64 struct{}

/* 编码 */
func (Base64) Encode(data string) string {
	return base64.StdEncoding.EncodeToString([]byte(data))
}

/* 解码 */
func (Base64) Decode(data string) []byte {
	res, _ := base64.StdEncoding.DecodeString(data)
	return res
}

/* 编码(URL) */
func (Base64) UrlEncode(data []byte) string {
	// 编码
	res := base64.StdEncoding.EncodeToString(data)
	// 替换
	replace := map[string]string{"\\+": "*", "/": "-", "=": "_"}
	for k, v := range replace {
		reg, _ := regexp.Compile(k)
		res = reg.ReplaceAllString(res, v)
	}
	return res
}

/* 解码(URL) */
func (Base64) UrlDecode(data string) []byte {
	// 替换
	replace := map[string]string{"\\*": "+", "-": "/", "_": "="}
	for k, v := range replace {
		reg, _ := regexp.Compile(k)
		data = reg.ReplaceAllString(data, v)
	}
	// 解码
	res, _ := base64.StdEncoding.DecodeString(data)
	return res
}

/* 压缩 */
func (Base64) Compress(data []byte) []byte {
	var b bytes.Buffer
	w := zlib.NewWriter(&b)
	w.Write(data)
	w.Close()
	return b.Bytes()
}

/* 解压 */
func (Base64) UnCompress(data []byte) []byte {
	var b bytes.Buffer
	r, err := zlib.NewReader(bytes.NewReader(data))
	if err != nil {
		return nil
	}
	io.Copy(&b, r)
	r.Close()
	return b.Bytes()
}
