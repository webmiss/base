package library

import (
	"regexp"
	"webmis/config"

	"github.com/dgrijalva/jwt-go"
)

// Safety :验证类
type Safety struct{}

// IsRight :正则-公共
func (s Safety) IsRight(name string, val string) bool {
	data := map[string]string{
		"uname":  "^[a-zA-Z][a-zA-Z0-9\\_\\@\\-\\*\\&]{3,15}$",
		"passwd": "^[a-zA-Z0-9|_|@|-|*|&]{6,16}$",
		"tel":    "^1\\d{10}$",
		"email":  "^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\\.[a-zA-Z0-9_-])+",
		"idcard": "^[1-9]\\d{7}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}$|^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}([0-9]|X)$",
	}
	res, _ := regexp.MatchString(data[name], val)
	return res
}

// Test :正则-验证
func (s Safety) Test(reg string, val string) bool {
	res, _ := regexp.MatchString(reg, val)
	return res
}

// Encode :加密-JWT
func (s Safety) Encode(param map[string]interface{}) (string, error) {
	cfg := (&config.Env{}).Config() //配置
	token := jwt.New(jwt.SigningMethodHS256)
	claims := make(jwt.MapClaims)
	for index, val := range param {
		claims[index] = val
	}
	token.Claims = claims
	res, err := token.SignedString([]byte(cfg.Key))
	return res, err
}

// Decode :解密-JWT
func (s Safety) Decode(token string) (interface{}, error) {
	cfg := (&config.Env{}).Config() //配置
	res, err := jwt.Parse(token, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, nil
		}
		return []byte(cfg.Key), nil
	})
	if claims, ok := res.Claims.(jwt.MapClaims); ok && res.Valid {
		return claims, err
	}
	return nil, nil
}
