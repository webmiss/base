package home

import (
	"webmis/model"

	"github.com/kataras/iris/v12"
)

/* 首页 */
func Index(ctx iris.Context) {
	// 查询
	demo := (&model.Demo{}).Init()
	data := demo.SelectRow()
	demo.Close()
	// 缓存
	// redis := (&library.Redis{}).Run()
	// redis.Set("test", 123.23)
	// exist, _ := redis.Exist("test")
	// exp, _ := redis.Expire("test", 30)
	// ttl, _ := redis.Ttl("test")
	// test, _ := redis.Get("test")
	// fmt.Println("Test", exist, test, string(test), exp, ttl)
	// redis.Close()
	// Token
	// jwt := (&library.Safety{})
	// data := map[string]interface{}{
	// 	"uid":    1,
	// 	"uname":  "webmis",
	// 	"l_time": time.Now().Unix(),
	// }
	// token, _ := jwt.Encode(data)
	// resData, _ := jwt.Decode(token)
	// fmt.Println(token, resData)
	// 返回
	ctx.JSON(iris.Map{"code": 0, "msg": "Web", "data": data})
}
