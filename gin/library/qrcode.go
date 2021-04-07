package library

import (
	"os"
	"webmis/util"

	qrcode "github.com/skip2/go-qrcode"
	scanner "github.com/tuotoo/qrcode"
)

/* 二维码类 */
type Qrcode struct{}

/* 生成 */
func (q Qrcode) Create(params map[string]interface{}) []byte {
	param := map[string]interface{}{
		"text": "",  //内容
		"size": 200, //大小
	}
	param = util.ArrayMerge(param, params)
	// 生成
	var png []byte
	png, err := qrcode.Encode(param["text"].(string), qrcode.Medium, param["size"].(int))
	if err != nil {
		return nil
	}
	return png
}

/* 识别 */
func (q Qrcode) Scan(file string) string {
	fi, err := os.Open(file)
	if err != nil {
		return ""
	}
	obj, err := scanner.Decode(fi)
	if err != nil {
		return ""
	}
	return obj.Content
}
