package library

import (
	"bytes"
	"io/ioutil"
	"net/http"
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
	// if len(body) > 0 {
	// 	res := map[string]interface{}{}
	// 	util.JsonDecode(body, &res)
	// 	return res
	// }
	// return nil
}

/* PostJson */
func (c Curl) PostJson(url string, data interface{}, header map[string]interface{}) map[string]interface{} {
	// 请求头
	param := map[string]interface{}{
		"Content-Type": "application/json; charset=utf-8", //JSON方式
	}
	if header != nil {
		param = util.ArrayMerge(param, header)
	}
	// 数据
	json := util.JsonEncode(data)
	// 发送
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(json))
	if err != nil {
		return nil
	}
	for k, v := range param {
		req.Header.Set(k, (&util.Type{}).Strval(v))
	}
	resp, err := (&http.Client{}).Do(req)
	if err != nil {
		return nil
	}
	defer resp.Body.Close()
	body, _ := ioutil.ReadAll(resp.Body)
	if len(body) > 0 {
		res := map[string]interface{}{}
		util.JsonDecode(body, &res)
		return res
	}
	return nil
}
