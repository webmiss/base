package library

import (
	"time"
	"webmis/config"

	redigo "github.com/gomodule/redigo/redis"
)

/* 缓存数据库 */
type Redis struct {
	Pool *redigo.Pool
	Conn redigo.Conn
}

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

/* 关闭 */
func (r Redis) Close() {
	r.Conn.Close()
	// r.Pool.Close()
}

/* 添加 */
func (r Redis) Set(key string, val interface{}) (bool, error) {
	res, err := redigo.Bool(r.Conn.Do("SET", key, val))
	return res, err
}

/* 获取 */
func (r Redis) Get(key string) ([]byte, error) {
	res, err := redigo.Bytes(r.Conn.Do("Get", key))
	return res, err
}

/* 删除 */
func (r Redis) Del(keys ...interface{}) (bool, error) {
	res, err := redigo.Bool(r.Conn.Do("DEL", keys...))
	return res, err
}

/* 是否存在 */
func (r Redis) Exist(key string) (bool, error) {
	res, err := redigo.Bool(r.Conn.Do("EXISTS", key))
	return res, err
}

/* 设置过期时间(秒) */
func (r Redis) Expire(key string, ttl int64) (bool, error) {
	res, err := redigo.Bool(r.Conn.Do("EXPIRE", key, ttl))
	return res, err
}

/* 获取过期时间(秒) */
func (r Redis) Ttl(key string) (int64, error) {
	res, err := redigo.Int64(r.Conn.Do("TTL", key))
	return res, err
}

/* 获取长度 */
func (r Redis) StrLen(key string) (int, error) {
	res, err := redigo.Int(r.Conn.Do("STRLEN", key))
	return res, err
}

/* 哈希(Hash)-添加 */
func (r Redis) HSet(name string, key string, val interface{}) (bool, error) {
	res, err := redigo.Bool(r.Conn.Do("HSET", name, key, val))
	return res, err
}
func (r Redis) HMSet(name string, obj interface{}) (bool, error) {
	res, err := redigo.Bool(r.Conn.Do("HSET", redigo.Args{}.Add(name).AddFlat(&obj)...))
	return res, err
}

/* 哈希(Hash)-获取 */
func (r Redis) HGet(name string, key string) ([]byte, error) {
	res, err := redigo.Bytes(r.Conn.Do("HGet", name, key))
	return res, err
}
func (r Redis) HMGet(name string, keys ...string) ([]interface{}, error) {
	args := []interface{}{name}
	for _, field := range keys {
		args = append(args, field)
	}
	res, err := redigo.Values(r.Conn.Do("HMGET", args))
	return res, err
}

/* 哈希(Hash)-删除 */
func (r Redis) HDel(name string, key string) (bool, error) {
	res, err := redigo.Bool(r.Conn.Do("HDEL", name, key))
	return res, err
}

/* 哈希(Hash)-是否存在 */
func (r Redis) HExist(name string, key string) (bool, error) {
	res, err := redigo.Bool(r.Conn.Do("HEXISTS", name, key))
	return res, err
}

/* 哈希(Hash)-Key个数 */
func (r Redis) HLen(name string) (int, error) {
	res, err := redigo.Int(r.Conn.Do("HLEN", name))
	return res, err
}
