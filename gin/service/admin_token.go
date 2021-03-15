package service

import (
	"webmis/base"
	"webmis/config"
	"webmis/library"
	"webmis/util"
)

// AdminToken :后台Token
type AdminToken struct {
	base.Base
}

// Create :生成
func (s AdminToken) Create(data map[string]interface{}) string {
	data["l_time"] = (&util.Util{}).Date("2006-01-02 15:04:05")
	token, _ := (&library.Safety{}).Encode(data)
	// 缓存
	env := (&config.Env{}).Config()
	key := env.AdminTokenPrefix + data["uid"].(string)
	redis := (&library.Redis{}).New("")
	redis.Set(key, "1")
	redis.Expire(key, env.AdminTokenTime)
	redis.Close()
	return token
}
