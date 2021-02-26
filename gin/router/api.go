package router

import (
	"webmis/modules/api"

	"github.com/gin-gonic/gin"
)

func Api(r *gin.Engine) {
	g := r.Group("api")
	{
		g.GET("", api.Index)
		g.GET("index", api.Index)
	}
}
