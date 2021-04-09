package config

import "time"

type RedisType struct {
	Error    bool
	Driver   string
	Host     string
	Port     string
	Password string
	Db       string
	Min      int
	Max      int
	Time     time.Duration
}

/* Redis配置 */
func Redis() *RedisType {
	cfg := &RedisType{}
	cfg.Error = true            //显示错误
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
