package service

import (
	"strconv"
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
	uid := tData["uid"].(string)
	redis = (&library.Redis{}).New("")
	time := redis.TTL(env.AdminTokenPrefix + "_token_" + uid)
	redis.Close()
	if time < 1 {
		return "Token已过期!"
	}
	// 续期
	if env.AdminTokenAuto {
		redis = (&library.Redis{}).New("")
		redis.Expire(env.AdminTokenPrefix+"_token_"+uid, env.AdminTokenTime)
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
	id := menuData["id"].(string)
	permData := s.Perm(token)
	actionVal, ok := permData[id]
	if !ok {
		return "无权访问菜单!"
	}
	// 验证-动作
	permArr := []map[string]interface{}{}
	util.JsonDecode(menuData["action"].(string), &permArr)
	var permVal int64
	for _, val := range permArr {
		if action == val["action"].(string) {
			permVal, _ = strconv.ParseInt(util.Strval(val["perm"]), 10, 64)
			break
		}
	}
	if actionVal&permVal == 0 {
		return "无权访问动作!"
	}
	return ""
}

/* 权限数组 */
func (s AdminToken) Perm(token string) map[string]int64 {
	permAll := map[string]int64{}
	// Token
	tData, _ := (&library.Safety{}).Decode(token)
	if tData == nil {
		return permAll
	}
	// 权限
	env := config.Env()
	redis := (&library.Redis{}).New("")
	permStr := redis.Get(env.AdminTokenPrefix + "_perm_" + tData["uid"].(string))
	redis.Close()
	// 拆分
	arr := []string{}
	if !util.Empty(permStr) {
		arr = util.Explode(" ", permStr)
	}
	for _, val := range arr {
		s := util.Explode(":", val)
		permAll[s[0]] = util.Int64(s[1])
	}
	return permAll
}

/* 生成 */
func (s AdminToken) Create(data map[string]interface{}) string {
	data["l_time"] = util.Date("2006-01-02 15:04:05")
	token, _ := (&library.Safety{}).Encode(data)
	// 缓存
	env := config.Env()
	redis := (&library.Redis{}).New("")
	key := env.AdminTokenPrefix + "_token_" + data["uid"].(string)
	redis.Set(key, "1")
	redis.Expire(key, env.AdminTokenTime)
	redis.Close()
	return token
}

/* Token数据 */
func (s AdminToken) Token(token string) jwt.MapClaims {
	tData, _ := (&library.Safety{}).Decode(token)
	if tData != nil {
		env := config.Env()
		redis := (&library.Redis{}).New("")
		tData["time"] = redis.TTL(env.AdminTokenPrefix + "_token_" + tData["uid"].(string))
		redis.Close()
	}
	return tData
}
