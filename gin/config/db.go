package config

/* 数据库配置 */
type MySQL struct {
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

/* 默认 */
func (d *MySQL) Default() *MySQL {
	d.Driver = "mysql"                              //类型
	d.Host = "127.0.0.1"                            //主机
	d.Port = "3306"                                 //端口
	d.User = "webmis"                               //账号
	d.Password = "e4b99adec618e653400966be536c45f8" //密码
	d.Database = "data"                             //数据库名
	d.Charset = "utf8mb4"                           //编码
	d.Min = 200                                     //空闲连接数
	d.Max = 300                                     //最大连接数
	d.Time = 30                                     //连接超时(秒)
	return d
}

/* 其它 */
func (d *MySQL) Other() *MySQL {
	d.Driver = "mysql"                              //类型
	d.Host = "127.0.0.1"                            //主机
	d.Port = "3306"                                 //端口
	d.User = "webmis"                               //账号
	d.Password = "e4b99adec618e653400966be536c45f8" //密码
	d.Database = "data"                             //数据库名
	d.Charset = "utf8mb4"                           //编码
	d.Min = 200                                     //空闲连接数
	d.Max = 300                                     //最大连接数
	d.Time = 30                                     //连接超时(秒)
	return d
}
