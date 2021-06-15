package util

import (
	"crypto/hmac"
	"crypto/md5"
	"crypto/sha1"
	"crypto/sha256"
	"encoding/hex"
)

/* 哈希 */
type Hash struct{}

/* Md5 */
func (Hash) Md5(data string) string {
	h := md5.New()
	h.Write([]byte(data))
	return hex.EncodeToString(h.Sum(nil))
}

/* Sha256 */
func (Hash) Sha256(data string) string {
	b := sha256.Sum256([]byte(data))
	return hex.EncodeToString(b[:])
}

/* HmacSha1 */
func (Hash) HmacSha1(data string, key []byte) []byte {
	h := hmac.New(sha1.New, key)
	h.Write([]byte(data))
	return h.Sum(nil)
}

/* HmacSha256 */
func (Hash) HmacSha256(data string, key []byte) []byte {
	h := hmac.New(sha256.New, key)
	h.Write([]byte(data))
	return h.Sum(nil)
}

/* Byte转为16进制 */
func (Hash) HexEncode(bytes []byte) string {
	return hex.EncodeToString(bytes)
}
