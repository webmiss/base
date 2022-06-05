package library

import (
	"bytes"
	"io/ioutil"
	"net/http"
	"net/url"
	"strings"
	"webmis/util"
)

/* 请求 */
type Curl struct{}

/* GET、POST、PUT、HEAD、DELETE */
func (c Curl) Request(url string, data []byte, method string, header map[string]interface{}) ([]byte, error) {
	// 请求头
	param := map[string]interface{}{
		"Content-Type": "application/json; charset=utf-8", //JSON方式
	}
	if header != nil {
		param = util.ArrayMerge(param, header)
	}
	// 发送
	req, err := http.NewRequest(method, url, bytes.NewBuffer(data))
	if err != nil {
		return nil, err
	}
	for k, v := range param {
		req.Header.Set(k, (&util.Type{}).Strval(v))
	}
	resp, err := (&http.Client{}).Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	return ioutil.ReadAll(resp.Body)
}

/* URL参数-生成 */
func (c Curl) UrlEncode(data map[string]interface{}) string {
	res := ""
	for k, v := range data {
		res += k + "=" + url.QueryEscape((&util.Type{}).Strval(v)) + "&"
	}
	res = strings.TrimRight(res, "&")
	return res
}

/* URL参数-解析 */
func (c Curl) UrlDecode(data string) map[string]interface{} {
	res := map[string]interface{}{}
	arr := strings.Split(data, "&")
	for _, v := range arr {
		tmp := strings.Split(v, "=")
		if len(tmp) == 2 {
			res[tmp[0]], _ = url.QueryUnescape(tmp[1])
		}
	}
	return res
}
