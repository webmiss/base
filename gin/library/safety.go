package library

import (
	"regexp"
	"webmis/config"

	"github.com/dgrijalva/jwt-go"
)

/* 安全验证类 */
type Safety struct{}

/* 正则-公共 */
func (this Safety) IsRight(name string, val string) bool {
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

/* 正则-验证 */
func (this Safety) Test(reg string, val string) bool {
	res, _ := regexp.MatchString(reg, val)
	return res
}

/* 加密-JWT */
func (this Safety) Encode(param map[string]interface{}) (string, error) {
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

/* 加密-JWT */
func (this Safety) Decode(token string) (interface{}, error) {
	cfg := (&config.Env{}).Config() //配置
	res, err := jwt.Parse(token, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, nil
		}
		return []byte(cfg.Key), nil
	})
	if claims, ok := res.Claims.(jwt.MapClaims); ok && res.Valid {
		return claims, err
	} else {
		return "", nil
	}
}
