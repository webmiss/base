package main

import (
	"os"
	"strings"
	"webmis/task"
)

func main() {
	// 参数
	param := os.Args
	args := map[string]string{}
	args["c"] = "main"
	if len(param) > 1 {
		args["c"] = param[1]
	}
	args["a"] = "main"
	if len(param) > 2 {
		args["a"] = param[2]
	}
	args["p"] = ""
	if len(param) > 3 {
		args["p"] = param[3]
	}
	// 路由
	c := strings.ToLower(args["c"])
	a := strings.ToLower(args["a"])
	switch {
	case c == "socket":
		if a == "start" {
			(&task.Socket{}).Start()
		}
	case c == "redis":
		if a == "logs" {
			(&task.Redis{}).Logs()
		}
	default:
		(&task.Main{}).New()
	}
}
