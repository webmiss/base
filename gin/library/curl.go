package library

import (
	"bytes"
	"io/ioutil"
	"net/http"
	"webmis/util"
)

/* 请求 */
type Curl struct{}

/* PostJson */
func (c Curl) PostJson(url string, data interface{}) map[string]interface{} {
	json := util.JsonEncode(data)
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(json))
	if err != nil {
		return nil
	}
	req.Header.Set("Content-Type", "application/json")
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
