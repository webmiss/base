package service

import (
	"crypto/rand"
	"math/big"
	"webmis/config"
	"webmis/library"
	"webmis/util"
)

/* 数据类 */
type Data struct{}

var id int64                        //自增ID
const saltShift = uint(8)           //随机数移位
const saltBit = uint(8)             //随机数位数
const idShift = saltShift + saltBit //自增数位数

/* 生成ID */
func (d *Data) GetId(name string) int64 {
	// 获取
	redis := (&library.Redis{}).New("")
	id := util.Int64(redis.Get(name))
	id++
	// 随机数
	randA, _ := rand.Int(rand.Reader, big.NewInt(255))
	randB, _ := rand.Int(rand.Reader, big.NewInt(255))
	// 位运算
	mist := int64((id << idShift) | (randA.Int64() << saltShift) | randB.Int64())
	// 保存
	redis.Set(name, id)
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
