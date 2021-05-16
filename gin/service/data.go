package service

import (
	"crypto/rand"
	"math/big"
	"time"
	"webmis/config"
	"webmis/library"
	"webmis/util"
)

/* 数据类 */
type Data struct{}

var autoId int64        //自增ID
const max8bit = uint(8) //随机数位数

var machineId int64 = 1   //机器标识
const max10bit = uint(10) //机器位数
const max12bit = uint(12) //序列数位数

/* 薄雾算法 */
func (d *Data) Mist(redisName string) int64 {
	// 自增ID
	redis := (&library.Redis{}).New("")
	autoId = util.Int64(redis.Get(redisName))
	autoId++
	// 随机数
	randA, _ := rand.Int(rand.Reader, big.NewInt(255))
	randB, _ := rand.Int(rand.Reader, big.NewInt(255))
	// 位运算
	mist := int64((autoId << (max8bit + max8bit)) | (randA.Int64() << max8bit) | randB.Int64())
	// 保存
	redis.Set(redisName, autoId)
	redis.Close()
	return mist
}

/* 雪花算法 */
func (d *Data) Snowflake() int64 {
	// 时间戳
	now := time.Now()
	t := now.UnixNano() / 1e6
	// 随机数
	rand, _ := rand.Int(rand.Reader, big.NewInt(4095))
	// 位运算
	mist := int64((t << (max10bit + max12bit)) | (machineId << max12bit) | rand.Int64())
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
