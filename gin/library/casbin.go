package library

import (
	"fmt"

	"github.com/casbin/casbin/v2"
	_ "github.com/go-sql-driver/mysql"
)

// CasBin :权限控制
type CasBin struct {
	conn *casbin.Enforcer
}

// New: 创建
func (c *CasBin) New() *CasBin {
	e, err := casbin.NewEnforcer("config/casbin.conf", "config/casbin.csv")
	if err != nil {
		fmt.Println("[Casbin] Open:", err)
		return nil
	}
	c.conn = e
	return c
}

// Verify :验证
func (c *CasBin) Verify(sub string, obj string, act string) bool {
	if c.conn == nil {
		return false
	}
	res, err := c.conn.Enforce(sub, obj, act)
	fmt.Println(sub, obj, act)
	if err != nil {
		fmt.Println("[Casbin] Verify:", err)
		return false
	}
	return res
}

// Add :添加
func (c *CasBin) Add(sub string, obj string, act string) bool {
	if c.conn == nil {
		return false
	}
	res, err := c.conn.AddPolicy(sub, obj, act)
	if err != nil {
		fmt.Println("[Casbin] Add:", err)
	}
	return res
}

// Add :删除
func (c *CasBin) Remove(sub string, obj string, act string) bool {
	if c.conn == nil {
		return false
	}
	res, err := c.conn.RemovePolicy(sub, obj, act)
	if err != nil {
		fmt.Println("[Casbin] Add:", err)
	}
	return res
}
