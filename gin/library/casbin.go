package library

import (
	"fmt"

	"github.com/casbin/casbin/v2"
	_ "github.com/go-sql-driver/mysql"
)

var CasBinDB *casbin.Enforcer

// CasBin :权限控制
type CasBin struct{}

// CasBinPool: 连接
func CasBinPool() {
	e, err := casbin.NewEnforcer("config/casbin.conf", "config/casbin.csv")
	if err != nil {
		fmt.Println("[Casbin] Open:", err)
		return
	}
	CasBinDB = e
}

// Verify :验证
func (c *CasBin) Verify(sub string, obj string, act string) bool {
	if CasBinDB == nil {
		return false
	}
	res, err := CasBinDB.Enforce(sub, obj, act)
	fmt.Println(sub, obj, act)
	if err != nil {
		fmt.Println("[Casbin] Verify:", err)
		return false
	}
	return res
}

// Add :添加
func (c *CasBin) Add(sub string, obj string, act string) bool {
	if CasBinDB == nil {
		return false
	}
	res, err := CasBinDB.AddPolicy(sub, obj, act)
	if err != nil {
		fmt.Println("[Casbin] Add:", err)
	}
	if err := CasBinDB.SavePolicy(); err != nil {
		fmt.Println("[Casbin] Save:", err)
	}
	return res
}

// Add :删除
func (c *CasBin) Remove(sub string, obj string, act string) bool {
	if CasBinDB == nil {
		return false
	}
	res, err := CasBinDB.RemovePolicy(sub, obj, act)
	if err != nil {
		fmt.Println("[Casbin] Remove:", err)
	}
	if err := CasBinDB.SavePolicy(); err != nil {
		fmt.Println("[Casbin] Save:", err)
	}
	return res
}
