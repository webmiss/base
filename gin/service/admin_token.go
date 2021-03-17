package service

import (
	"errors"
	"webmis/base"
	"webmis/config"
	"webmis/library"
	"webmis/util"
)

// AdminToken :后台Token
type AdminToken struct {
	base.Base
}

// Create :验证
func (s AdminToken) Verify(token string, urlPerm string) (bool, error) {
	// Token
	tData, _ := (&library.Safety{}).Decode(token)
	if tData == nil {
		return false, errors.New("Token验证失败!")
	}
	// 续期Token
	env := (&config.Env{}).Config()
	if env.AdminTokenAuto {
		redis := (&library.Redis{}).New("")
		key := env.AdminTokenPrefix + "_token_" + tData["uid"].(string)
		redis.Expire(key, env.AdminTokenTime)
		redis.Close()
	}
	// URL权限
	if urlPerm == "" {
		return true, nil
	}
	s.Print(tData, urlPerm)
	return true, nil
}

// Create :生成
func (s AdminToken) Create(data map[string]interface{}) string {
	data["l_time"] = (&util.Util{}).Date("2006-01-02 15:04:05")
	token, _ := (&library.Safety{}).Encode(data)
	// 缓存
	env := (&config.Env{}).Config()
	redis := (&library.Redis{}).New("")
	key := env.AdminTokenPrefix + "_token_" + data["uid"].(string)
	redis.Set(key, "1")
	redis.Expire(key, env.AdminTokenTime)
	redis.Close()
	return token
}
