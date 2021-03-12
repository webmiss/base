package config

import "time"

// Redis :Redis配置
type Redis struct {
	Driver   string
	Host     string
	Port     string
	Password string
	Db       string
	Min      int
	Max      int
	Time     time.Duration
}

// Config :获取
func (r *Redis) Config() *Redis {
	r.Driver = "tcp"          //类型
	r.Host = "127.0.0.1"      //主机
	r.Port = "6379"           //端口
	r.Password = ""           //密码
	r.Db = "0"                //硬盘
	r.Min = 1000              //空闲数
	r.Max = 1000              //最大数
	r.Time = 10 * time.Second //最大空闲时间(秒)
	return r
}
