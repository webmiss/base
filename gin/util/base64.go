package util

import (
	"bytes"
	"compress/zlib"
	"encoding/base64"
	"io"
	"regexp"
)

type Base64 struct{}

/* 加密 */
func (Base64) Encode(str string) string {
	return base64.StdEncoding.EncodeToString([]byte(str))
}

/* 解密 */
func (Base64) Decode(content string) string {
	res, err := base64.RawStdEncoding.DecodeString(content)
	if err != nil {
		return ""
	}
	return string(res)
}

/* 加密(URL) */
func (Base64) UrlEncode(str string) string {
	replace := map[string]string{"\\+": "*", "/": "-", "=": "_"}
	res := base64.StdEncoding.EncodeToString([]byte(str))
	for k, v := range replace {
		reg, _ := regexp.Compile(k)
		res = reg.ReplaceAllString(res, v)
	}
	return res
}

/* 解密(URL) */
func (Base64) UrlDecode(content string) string {
	replace := map[string]string{"\\+": "*", "/": "-", "=": "_"}
	for k, v := range replace {
		reg, _ := regexp.Compile(k)
		content = reg.ReplaceAllString(content, v)
	}
	res, err := base64.RawStdEncoding.DecodeString(content)
	if err != nil {
		return ""
	}
	return string(res)
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
func (Base64) UnCompress(content []byte) []byte {
	var b bytes.Buffer
	r, _ := zlib.NewReader(bytes.NewReader(content))
	io.Copy(&b, r)
	return b.Bytes()
}
