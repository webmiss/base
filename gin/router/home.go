package router

import (
	"webmis/modules/home"

	"github.com/gin-gonic/gin"
)

/* Home路由 */
func Home(r *gin.Engine) {
	g := r.Group("/")
	{
		// 首页
		g.GET("", (&home.Index{}).Index)
		g.GET("vcode", (&home.Index{}).Vcode)
		g.GET("index/qrcode/:name", (&home.Index{}).Qrcode)
		g.POST("ossCallback", (&home.Index{}).OssCallback)
	}
}
