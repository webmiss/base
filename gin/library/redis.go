package library

import (
	"time"
	"webmis/config"

	redigo "github.com/gomodule/redigo/redis"
)

// Redis :缓存数据库
type Redis struct {
	Pool *redigo.Pool
	Conn redigo.Conn
}

// Run :创建
func (c *Redis) Run() *Redis {
	if c.Pool == nil {
		cfg := (&config.Redis{}).Config() //配置
		pool := &redigo.Pool{
			MaxIdle:     cfg.Min,          //空闲数
			MaxActive:   cfg.Max,          //最大数
			IdleTimeout: 10 * time.Second, //空闲超时(秒)
			Wait:        true,             //超过最大连接数: true 等待 false 报错
			Dial: func() (redigo.Conn, error) {
				c, err := redigo.Dial("tcp", cfg.Host+":"+cfg.Port)
				if err != nil {
					panic(err)
				}
				// 密码
				if cfg.Password != "" {
					if _, err := c.Do("AUTH", cfg.Password); err != nil {
						c.Close()
						panic(err)
					}
				}
				// 硬盘
				if _, err := c.Do("SELECT", cfg.Db); err != nil {
					c.Close()
					panic(err)
				}
				return c, err
			},
			TestOnBorrow: func(c redigo.Conn, t time.Time) error {
				_, err := c.Do("PING")
				panic(err)
			},
		}
		c.Pool = pool
	}
	c.Conn = c.Pool.Get()
	return c
}

// Close :关闭
func (c Redis) Close() {
	c.Conn.Close()
	// r.Pool.Close()
}

// Set :添加
func (c Redis) Set(key string, val interface{}) (bool, error) {
	res, err := redigo.Bool(c.Conn.Do("SET", key, val))
	return res, err
}

// Get :获取
func (c Redis) Get(key string) ([]byte, error) {
	res, err := redigo.Bytes(c.Conn.Do("Get", key))
	return res, err
}

// Del :删除
func (c Redis) Del(keys ...interface{}) (bool, error) {
	res, err := redigo.Bool(c.Conn.Do("DEL", keys...))
	return res, err
}

// Exist :是否存在
func (c Redis) Exist(key string) (bool, error) {
	res, err := redigo.Bool(c.Conn.Do("EXISTS", key))
	return res, err
}

// Expire :设置过期时间(秒)
func (c Redis) Expire(key string, ttl int64) (bool, error) {
	res, err := redigo.Bool(c.Conn.Do("EXPIRE", key, ttl))
	return res, err
}

// TTL :获取过期时间(秒)
func (c Redis) TTL(key string) (int64, error) {
	res, err := redigo.Int64(c.Conn.Do("TTL", key))
	return res, err
}

// StrLen :获取长度
func (c Redis) StrLen(key string) (int, error) {
	res, err := redigo.Int(c.Conn.Do("STRLEN", key))
	return res, err
}

// HSet :哈希(Hash)-添加
func (c Redis) HSet(name string, key string, val interface{}) (bool, error) {
	res, err := redigo.Bool(c.Conn.Do("HSET", name, key, val))
	return res, err
}

// HMSet :哈希(Hash)-添加
func (c Redis) HMSet(name string, obj interface{}) (bool, error) {
	res, err := redigo.Bool(c.Conn.Do("HSET", redigo.Args{}.Add(name).AddFlat(&obj)...))
	return res, err
}

// HGet :哈希(Hash)-获取
func (c Redis) HGet(name string, key string) ([]byte, error) {
	res, err := redigo.Bytes(c.Conn.Do("HGet", name, key))
	return res, err
}

// HMGet :哈希(Hash)-获取
func (c Redis) HMGet(name string, keys ...string) ([]interface{}, error) {
	args := []interface{}{name}
	for _, field := range keys {
		args = append(args, field)
	}
	res, err := redigo.Values(c.Conn.Do("HMGET", args))
	return res, err
}

// HDel :哈希(Hash)-删除
func (c Redis) HDel(name string, key string) (bool, error) {
	res, err := redigo.Bool(c.Conn.Do("HDEL", name, key))
	return res, err
}

// HExist :哈希(Hash)-是否存在
func (c Redis) HExist(name string, key string) (bool, error) {
	res, err := redigo.Bool(c.Conn.Do("HEXISTS", name, key))
	return res, err
}

// HLen :哈希(Hash)-Key个数
func (c Redis) HLen(name string) (int, error) {
	res, err := redigo.Int(c.Conn.Do("HLEN", name))
	return res, err
}
