package library

import (
	"fmt"
	"time"
	"webmis/config"

	redigo "github.com/gomodule/redigo/redis"
)

// 连接池
var RedisDB *redigo.Pool
var RedisDBOther *redigo.Pool
var showErr bool

/* 缓存数据库 */
type Redis struct {
	db   string
	conn redigo.Conn
}

/* 数据池 */
func (r Redis) RedisPool() *redigo.Pool {
	// 配置
	var cfg *config.RedisType
	if r.db == "Other" {
		cfg = config.Redis()
	} else {
		cfg = config.RedisOther()
	}
	showErr = cfg.Error
	return &redigo.Pool{
		MaxIdle:         cfg.Min,  //空闲数
		MaxActive:       cfg.Max,  //最大数
		IdleTimeout:     cfg.Time, //空闲超时(秒)
		MaxConnLifetime: cfg.Time, //最大连接时长(秒)
		Wait:            true,     //超过最大连接数: true 等待 false 报错
		// 连接
		Dial: func() (redigo.Conn, error) {
			conn, err := redigo.Dial(cfg.Driver, cfg.Host+":"+cfg.Port)
			if err != nil {
				if showErr {
					fmt.Println("[Redis] Conn:", err)
				}
				return nil, err
			}
			// 密码
			if cfg.Password != "" {
				if _, err := conn.Do("AUTH", cfg.Password); err != nil {
					conn.Close()
					if showErr {
						fmt.Println("[Redis] Conn:", err)
					}
					return nil, err
				}
			}
			// 硬盘
			if _, err := conn.Do("SELECT", cfg.Db); err != nil {
				conn.Close()
				if showErr {
					fmt.Println("[Redis] Conn:", err)
				}
				return nil, err
			}
			return conn, err
		},
		// 检测
		TestOnBorrow: func(c redigo.Conn, t time.Time) error {
			if time.Since(t) < time.Minute {
				return nil
			}
			_, err := c.Do("PING")
			return err
		},
	}
}

/* 连接 */
func (r *Redis) RedisConn() {
	if r.db == "Other" {
		if RedisDBOther == nil {
			RedisDBOther = r.RedisPool()
		}
		r.conn = RedisDBOther.Get()
	} else {
		if RedisDB == nil {
			RedisDB = r.RedisPool()
		}
		r.conn = RedisDB.Get()
	}
}

/* 创建 */
func (r *Redis) New(db string) *Redis {
	r.db = db
	r.RedisConn()
	return r
}

/* 关闭-释放连接 */
func (r *Redis) Close() {
	if r.conn != nil {
		r.conn.Close()
	}
}

/* 实例 */
func (r *Redis) Conn() redigo.Conn {
	return r.conn
}

/* 添加 */
func (r *Redis) Set(key string, val interface{}) []byte {
	res, err := redigo.Bytes(r.conn.Do("SET", key, val))
	if err != nil {
		fmt.Println("[Redis] Set:", err)
		return nil
	}
	return res
}

/* 获取 */
func (r *Redis) Get(key string) []byte {
	res, err := redigo.Bytes(r.conn.Do("Get", key))
	if err != nil {
		fmt.Println("[Redis] Get:", err)
		return nil
	}
	return res
}

/* 删除 */
func (r *Redis) Del(keys ...interface{}) bool {
	res, err := redigo.Bool(r.conn.Do("DEL", keys...))
	if err != nil {
		fmt.Println("[Redis] Del:", err)
		return false
	}
	return res
}

/* 是否存在 */
func (r *Redis) Exist(key string) bool {
	res, err := redigo.Bool(r.conn.Do("EXISTS", key))
	if err != nil {
		fmt.Println("[Redis] Exist:", err)
		return false
	}
	return res
}

/* 设置过期时间(秒) */
func (r *Redis) Expire(key string, ttl int64) int64 {
	res, err := redigo.Int64(r.conn.Do("EXPIRE", key, ttl))
	if err != nil {
		fmt.Println("[Redis] Expire:", err)
		return 0
	}
	return res
}

/* 获取过期时间(秒) */
func (r *Redis) TTL(key string) int64 {
	res, err := redigo.Int64(r.conn.Do("TTL", key))
	if err != nil {
		fmt.Println("[Redis] TTL:", err)
		return 0
	}
	return res
}

/* 获取长度 */
func (r *Redis) StrLen(key string) int64 {
	res, err := redigo.Int64(r.conn.Do("STRLEN", key))
	if err != nil {
		fmt.Println("[Redis] StrLen:", err)
		return 0
	}
	return res
}

/* 哈希(Hash)-添加 */
func (r *Redis) HSet(name string, key string, val interface{}) int64 {
	res, err := redigo.Int64(r.conn.Do("HSET", name, key, val))
	if err != nil {
		fmt.Println("[Redis] HSet:", err)
		return 0
	}
	return res
}
func (r *Redis) HMSet(name string, obj interface{}) int64 {
	res, err := redigo.Int64(r.conn.Do("HMSET", redigo.Args{}.Add(name).AddFlat(&obj)...))
	if err != nil {
		fmt.Println("[Redis] HMSet:", err)
		return 0
	}
	return res
}

/* 哈希(Hash)-获取 */
func (r *Redis) HGet(name string, key string) []byte {
	res, err := redigo.Bytes(r.conn.Do("HGET", name, key))
	if err != nil {
		fmt.Println("[Redis] HGet:", err)
		return nil
	}
	return res
}
func (r *Redis) HMGet(name string, keys ...string) []interface{} {
	args := []interface{}{name}
	for _, field := range keys {
		args = append(args, field)
	}
	res, err := redigo.Values(r.conn.Do("HMGET", args))
	if err != nil {
		fmt.Println("[Redis] HMGet:", err)
		return nil
	}
	return res
}

/* 哈希(Hash)-删除 */
func (r *Redis) HDel(name string, key ...string) int64 {
	res, err := redigo.Int64(r.conn.Do("HDEL", name, key))
	if err != nil {
		fmt.Println("[Redis] HDel:", err)
		return 0
	}
	return res
}

/* 哈希(Hash)-是否存在 */
func (r *Redis) HExist(name string, key string) bool {
	res, err := redigo.Bool(r.conn.Do("HEXISTS", name, key))
	if err != nil {
		fmt.Println("[Redis] HExist:", err)
		return false
	}
	return res
}

/* 哈希(Hash)-Key个数 */
func (r *Redis) HLen(name string) int64 {
	res, err := redigo.Int64(r.conn.Do("HLEN", name))
	if err != nil {
		fmt.Println("[Redis] HLen:", err)
		return 0
	}
	return res
}

/* 列表(List)-写入 */
func (r *Redis) RPush(key string, val interface{}) bool {
	res, err := redigo.Bool(r.conn.Do("RPUSH", key, val))
	if err != nil {
		fmt.Println("[Redis] LPUSH:", err)
		return false
	}
	return res
}
func (r *Redis) LPush(key string, val interface{}) bool {
	res, err := redigo.Bool(r.conn.Do("LPUSH", key, val))
	if err != nil {
		fmt.Println("[Redis] LPUSH:", err)
		return false
	}
	return res
}

/* 列表(List)-读取 */
func (r *Redis) BRPop(key string, timeout int) []interface{} {
	res, err := redigo.Values(r.conn.Do("BRPOP", key, timeout))
	if err != nil {
		return nil
	}
	return res
}
func (r *Redis) BLPop(key string, timeout int) []interface{} {
	res, err := redigo.Values(r.conn.Do("BLPOP", key, timeout))
	if err != nil {
		return nil
	}
	return res
}
