package main

import (
	"webmis/router"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	router.Web(r)
	router.Api(r)
	router.Admin(r)
	r.Run()
}
