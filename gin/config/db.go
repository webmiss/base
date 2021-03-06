package config

type MySql struct {
	Driver   string
	Host     string
	Port     string
	User     string
	Password string
	Database string
	Charset  string
	Min      int
	Max      int
	Time     int64
}

/* 数据库配置 */
func (cfg *MySql) Config() *MySql {
	cfg.Driver = "mysql"                              //类型
	cfg.Host = "127.0.0.1"                            //主机
	cfg.Port = "3306"                                 //端口
	cfg.User = "webmis"                               //账号
	cfg.Password = "e4b99adec618e653400966be536c45f8" //密码
	cfg.Database = "data"                             //数据库名
	cfg.Charset = "utf8mb4"                           //编码
	cfg.Min = 20                                      //空闲连接数
	cfg.Max = 30                                      //最大连接数
	cfg.Time = 30                                     //连接超时(秒)
	return cfg
}
