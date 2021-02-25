package config

type Mysql struct {
	Type     string
	Host     string
	Port     string
	User     string
	Password string
	Db       string
	Charset  string
	Min      int
	Max      int
	Time     int64
}

func (db Mysql) Init() Mysql {
	// db.Host = "154.91.144.171";	//主机
	db.Host = "127.0.0.1"                            //主机
	db.Port = "3306"                                 //端口
	db.Type = "mysql"                                //类型
	db.User = "webmis"                               //用户名
	db.Password = "e4b99adec618e653400966be536c45f8" //密码
	db.Db = "data"                                   //数据库名
	db.Charset = "utf8mb4"                           //编码
	db.Min = 20                                      //空闲数
	db.Max = 30                                      //最大数
	db.Time = 30                                     //最大空闲时间(秒)
	return db
}
