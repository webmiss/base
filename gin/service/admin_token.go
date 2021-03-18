package service

import (
	"errors"
	"strconv"
	"webmis/base"
	"webmis/config"
	"webmis/library"
	"webmis/model"
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
	arr := (&util.Util{}).Explode("/", urlPerm)
	action := arr[len(arr)-1:][0]
	controller := (&util.Util{}).Implode("/", arr[:len(arr)-1])
	// 菜单
	menu := (&model.SysMenu{}).New()
	menu.Columns("id", "action")
	menu.Where("controller=?", controller)
	menuData := menu.FindFirst()
	if len(menuData) == 0 {
		return false, errors.New("菜单验证无效!")
	}
	// 验证-菜单
	id := menuData["id"].(string)
	permArr := s.Perm(tData["uid"].(string))
	actionVal, ok := permArr[id]
	if !ok {
		return false, errors.New("无权访问菜单!")
	}
	// 验证-动作
	s.Print(permArr, action, actionVal)
	return true, nil
}

// Perm :权限数组
func (s AdminToken) Perm(uid string) map[string]int64 {
	// 权限
	env := (&config.Env{}).Config()
	redis := (&library.Redis{}).New("")
	key := env.AdminTokenPrefix + "_perm_" + uid
	permStr := string(redis.Get(key))
	redis.Close()
	// 拆分
	permAll := map[string]int64{}
	arr := (&util.Util{}).Explode(" ", permStr)
	for _, val := range arr {
		s := (&util.Util{}).Explode(":", val)
		permAll[s[0]], _ = strconv.ParseInt(s[1], 10, 64)
	}
	return permAll
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
