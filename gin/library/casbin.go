package library

import (
	"fmt"
	"os"

	"github.com/casbin/casbin/v2"
)

// CasBin :权限控制
type CasBin struct{}

// Verify :验证
func (c *CasBin) Verify(sub string, obj string, act string) bool {
	path, _ := os.Getwd()
	e, err := casbin.NewEnforcer(path+"/config/casbin.conf", path+"/config/casbin.csv")
	if err != nil {
		fmt.Println("[Casbin] Open:", err)
	}
	res, err := e.Enforce(sub, obj, act)
	fmt.Println(sub, obj, act)
	if err != nil {
		fmt.Println("[Casbin] Verify:", err)
	}
	return res
}
