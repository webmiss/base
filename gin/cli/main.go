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
	controller := strings.ToLower(args["c"])
	action := strings.ToLower(args["a"])
	switch {
	case controller == "socket":
		if action == "start" {
			(&task.Socket{}).Start()
		}
	case controller == "kafka":
		if action == "logs" {
			(&task.Kafka{}).Logs()
		}
	default:
		(&task.Main{}).New()
	}
}
