package util

import (
	"crypto/md5"
	"encoding/hex"
)

/* MD5加密 */
func Md5(content string) string {
	data := []byte(content)
	h := md5.New()
	h.Write(data)
	return hex.EncodeToString(h.Sum(nil))
}
