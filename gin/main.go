package main

import (
	"io/ioutil"
	"webmis/config"
	"webmis/library"
	"webmis/middleware"
	"webmis/model"
	"webmis/router"

	"github.com/gin-contrib/gzip"
	"github.com/gin-gonic/gin"
)

func init() {

	// 权限
	library.CasBinPool()
	// 默认数据库
	model.DBPool((&config.MySQL{}).Default())

}

func main() {
	// 配置
	cfg := (&config.Env{}).Config()
	gin.SetMode(cfg.Mode)
	// 模式
	if gin.Mode() == gin.ReleaseMode {
		gin.DefaultWriter = ioutil.Discard //禁止控制台输出
	}
	// APP
	app := gin.Default()
	app.Use(gzip.Gzip(gzip.DefaultCompression)) //压缩
	app.Use(gin.Recovery())                     //处理异常
	app.Use(middleware.Logs())                  //访问日志
	// 路由
	router.Home(app)
	router.API(app)
	router.Admin(app)
	// 运行
	app.Run(cfg.Host + ":" + cfg.Port)
}
