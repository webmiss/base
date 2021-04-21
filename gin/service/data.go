package service

import (
	"crypto/rand"
	"fmt"
	"math/big"
	"webmis/config"
	"webmis/library"
	"webmis/util"
)

/* 数据类 */
type Data struct {
	saltA int64
	saltB int64
}

var id int64                        //自增ID
const saltShift = uint(8)           //随机数移位
const saltBit = uint(8)             //随机数位数
const idShift = saltShift + saltBit //自增数位数

/* 生成ID */
func (d *Data) GetId() int64 {
	// 获取自增ID
	redis := (&library.Redis{}).New("")
	if id == 0 {
		res := util.Int64(redis.Get("ID"))
		if res == 0 {
			res = 1
		}
		id = res
	}
	id++
	// 随机数
	randA, _ := rand.Int(rand.Reader, big.NewInt(255))
	d.saltA = randA.Int64()
	randB, _ := rand.Int(rand.Reader, big.NewInt(255))
	d.saltB = randB.Int64()
	// 位运算
	mist := int64((id << idShift) | (d.saltA << saltShift) | d.saltB)
	fmt.Println("ID:", id, d.saltA, d.saltB, mist)
	// 保存自增ID
	redis.Set("ID", id)
	redis.Close()
	return mist
}

/* 图片地址 */
func (Data) Img(img interface{}) string {
	str := img.(string)
	if str == "" {
		return ""
	}
	return config.Env().BaseURL + str
}
