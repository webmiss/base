package config

// Redis :Redis配置
type Redis struct {
	Host     string
	Port     string
	Password string
	Db       string
	Min      int
	Max      int
	Time     int64
}

// Config :获取
func (r *Redis) Config() *Redis {
	r.Host = "127.0.0.1" //主机
	r.Port = "6379"      //端口
	r.Password = ""      //密码
	r.Db = "0"           //硬盘
	r.Min = 2            //空闲数
	r.Max = 10           //最大数
	r.Time = 30          //最大空闲时间(秒)
	return r
}
