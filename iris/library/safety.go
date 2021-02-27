package library

import (
	"webmis/config"

	"github.com/dgrijalva/jwt-go"
)

/* 安全验证类 */
type Safety struct {
}

/* 加密-JWT */
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

/* 加密-JWT */
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
	} else {
		return "", nil
	}
}