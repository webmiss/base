package router

import (
	"webmis/modules/web"

	"github.com/gin-gonic/gin"
)

func Web(r *gin.Engine) {
	g := r.Group("")
	{
		g.GET("/", web.Index)
		g.GET("index", web.Index)
	}
}
