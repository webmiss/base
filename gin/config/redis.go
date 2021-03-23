package config

import "time"

// RedisType :类型
type RedisType struct {
	Driver   string
	Host     string
	Port     string
	Password string
	Db       string
	Min      int
	Max      int
	Time     time.Duration
}

// Redis :Redis配置
func Redis() *RedisType {
	cfg := &RedisType{}
	cfg.Driver = "tcp"          //类型
	cfg.Host = "127.0.0.1"      //主机
	cfg.Port = "6379"           //端口
	cfg.Password = ""           //密码
	cfg.Db = "0"                //硬盘
	cfg.Min = 100               //空闲数
	cfg.Max = 200               //最大数
	cfg.Time = 10 * time.Second //最大空闲时间(秒)
	return cfg
}
