package service

import (
	"webmis/config"
	"webmis/library"
	"webmis/model"
	"webmis/util"

	"github.com/dgrijalva/jwt-go"
)

/* AdminToken */
type AdminToken struct {
	Base
}

/* 验证 */
func (s AdminToken) Verify(token string, urlPerm string) string {
	var redis *library.Redis
	// Token
	if token == "" {
		return "Token不能为空!"
	}
	tData, _ := (&library.Safety{}).Decode(token)
	if tData == nil {
		return "Token验证失败!"
	}
	// 是否过期
	env := config.Env()
	uid := (&util.Type{}).Strval(tData["uid"])
	key := env.AdminTokenPrefix + "_token_" + uid
	redis = (&library.Redis{}).New("")
	access_token := redis.Get(key)
	time := redis.TTL(key)
	redis.Close()
	if (&util.Hash{}).Md5(token) != access_token {
		return "强制退出!"
	}
	if time < 1 {
		return "Token已过期!"
	}
	// 续期
	if env.AdminTokenAuto {
		redis = (&library.Redis{}).New("")
		redis.Expire(key, env.AdminTokenTime)
		redis.Expire(env.AdminTokenPrefix+"_perm_"+uid, env.AdminTokenTime)
		redis.Close()
	}
	// URL权限
	if urlPerm == "" {
		return ""
	}
	arr := util.Explode("/", urlPerm)
	action := arr[len(arr)-1:][0]
	controller := util.Implode("/", arr[:len(arr)-1])
	// 菜单
	menu := (&model.SysMenu{}).New()
	menu.Columns("id", "action")
	menu.Where("controller=?", controller)
	menuData := menu.FindFirst()
	if len(menuData) == 0 {
		return "菜单验证无效!"
	}
	// 验证-菜单
	id := (&util.Type{}).Strval(menuData["id"])
	permData := s.Perm(token)
	actionVal, ok := permData[id]
	if !ok {
		return "无权访问菜单!"
	}
	// 验证-动作
	permArr := []map[string]interface{}{}
	util.JsonDecode(menuData["action"], &permArr)
	var permVal int64
	for _, val := range permArr {
		if action == val["action"] {
			permVal = (&util.Type{}).Int64(val["perm"])
			break
		}
	}
	if actionVal&permVal == 0 {
		return "无权访问动作!"
	}
	return ""
}

/* 权限数组 */
func (AdminToken) Perm(token string) map[string]int64 {
	permAll := map[string]int64{}
	// Token
	tData, _ := (&library.Safety{}).Decode(token)
	if tData == nil {
		return permAll
	}
	// 权限
	env := config.Env()
	redis := (&library.Redis{}).New("")
	permStr := redis.Get(env.AdminTokenPrefix + "_perm_" + (&util.Type{}).Strval(tData["uid"]))
	redis.Close()
	// 拆分
	arr := []string{}
	if !util.Empty(permStr) {
		arr = util.Explode(" ", permStr)
	}
	for _, val := range arr {
		s := util.Explode(":", val)
		permAll[s[0]] = (&util.Type{}).Int64(s[1])
	}
	return permAll
}

/* 生成 */
func (AdminToken) Create(data map[string]interface{}) string {
	data["l_time"] = util.Date("2006-01-02 15:04:05")
	token, _ := (&library.Safety{}).Encode(data)
	// 缓存
	env := config.Env()
	redis := (&library.Redis{}).New("")
	key := env.AdminTokenPrefix + "_token_" + (&util.Type{}).Strval(data["uid"])
	redis.Set(key, (&util.Hash{}).Md5(token))
	redis.Expire(key, env.AdminTokenTime)
	redis.Close()
	return token
}

/* 解析 */
func (AdminToken) Token(token string) jwt.MapClaims {
	tData, _ := (&library.Safety{}).Decode(token)
	if tData != nil {
		env := config.Env()
		redis := (&library.Redis{}).New("")
		tData["time"] = redis.TTL(env.AdminTokenPrefix + "_token_" + (&util.Type{}).Strval(tData["uid"]))
		redis.Close()
	}
	return tData
}
