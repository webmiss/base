package config

type Redis struct {
	Host     string
	Port     string
	Password string
	Db       string
	Min      int
	Max      int
	Time     int64
}

func (db Redis) Init() Redis {
	db.Host = "127.0.0.1" //主机
	db.Port = "6379"      //端口
	db.Password = ""      //密码
	db.Db = "0"           //硬盘
	db.Min = 2            //空闲数
	db.Max = 10           //最大数
	db.Time = 30          //最大空闲时间(秒)
	return db
}
