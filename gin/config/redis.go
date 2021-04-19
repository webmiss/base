package config

import "time"

/* Redis配置 */
type RedisType struct {
	Error    bool
	Driver   string
	Host     string
	Port     string
	Password string
	Db       int
	Min      int
	Max      int
	Time     time.Duration
	Timeout  int
}

/* 默认 */
func Redis() *RedisType {
	cfg := &RedisType{}
	cfg.Driver = "tcp"          //类型
	cfg.Host = "127.0.0.1"      //主机
	cfg.Port = "6379"           //端口
	cfg.Password = ""           //密码
	cfg.Db = 0                  //硬盘
	cfg.Min = 100               //空闲数
	cfg.Max = 200               //最大数
	cfg.Time = 10 * time.Second //最大空闲时间(秒)
	cfg.Timeout = 10            //阻塞时间(秒)
	return cfg
}

/* 其它 */
func RedisOther() *RedisType {
	cfg := &RedisType{}
	cfg.Driver = "tcp"          //类型
	cfg.Host = "127.0.0.1"      //主机
	cfg.Port = "6379"           //端口
	cfg.Password = ""           //密码
	cfg.Db = 0                  //硬盘
	cfg.Min = 100               //空闲数
	cfg.Max = 200               //最大数
	cfg.Time = 10 * time.Second //最大空闲时间(秒)
	cfg.Timeout = 10            //阻塞时间(秒)
	return cfg
}
