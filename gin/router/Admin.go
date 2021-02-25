package router

import (
	"webmis/modules/admin"

	"github.com/gin-gonic/gin"
)

func Admin(r *gin.Engine) {
	g := r.Group("admin")
	{
		g.GET("", admin.Index)
		g.GET("index", admin.Index)
	}
}
