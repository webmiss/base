package home

import (
	"fmt"
	"golang/app/library"
	"golang/app/model"

	"github.com/kataras/iris/v12"
)

type IndexController struct {
	// a string
}

func (c *IndexController) Get(ctx iris.Context)  { params(ctx) }
func (c *IndexController) Post(ctx iris.Context) { params(ctx) }
func params(ctx iris.Context) {
	a := ctx.Params().Get("action")
	if a == "" || a == "index" {
		index(ctx)
	}
}

type Result struct {
	uid   int
	title string
}

/* 首页 */
func index(ctx iris.Context) {
	// 查询
	model := (&model.Demo{}).Init().Select()
	model.Where("title LIKE ?", "测%")
	// 数据
	res := []map[string]interface{}{}
	model.Find(&res)
	// 缓存
	redis := (&library.Redis{}).Run()
	redis.Set("test", 123.23)
	exist, _ := redis.Exist("test")
	exp, _ := redis.Expire("test", 30)
	ttl, _ := redis.Ttl("test")
	test, _ := redis.Get("test")
	fmt.Println("Test", exist, test, string(test), exp, ttl)
	// time.Sleep(time.Second * 1)
	redis.Close()
	// 返回
	ctx.JSON(iris.Map{"code": 0, "msg": "Web", "data": res})
}
