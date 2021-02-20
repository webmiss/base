package app

/* 基础配置 */
func Env() map[string]string {
	return map[string]string{
		"debug": "true", //调试模式
		"port":  "9010", //端口
		/* 资源 */
		"base_url": "https://demo-python.webmis.vip/", //根目录
		/* 加密 */
		"key": "e4b99adec618e653400966be536c45f8", //KEY
	}
}

/* 数据库 */
func Mysql() map[string]interface{} {
	cfg := make(map[string]interface{})
	// cfg["host"] = "154.91.144.171"                       //主机
	cfg["host"] = "127.0.0.1"                            //主机
	cfg["type"] = "mysql"                                //类型
	cfg["port"] = "3306"                                 //端口
	cfg["user"] = "webmis"                               //用户名
	cfg["password"] = "e4b99adec618e653400966be536c45f8" //密码
	cfg["db"] = "data"                                   //数据库名
	cfg["charset"] = "utf8mb4"                           //编码
	cfg["min"] = 200                                     //空闲数
	cfg["max"] = 300                                     //最大数
	cfg["time"] = 3                                      //最大空闲时间
	return cfg
}

/* 缓存数据库 */
func Redis() map[string]string {
	return map[string]string{
		"host":     "127.0.0.1", //主机
		"port":     "6379",      //端口
		"password": "",          //密码
		"db":       "0",         //硬盘
		"min":      "2",         //空闲数
		"max":      "10",        //最大数
	}
}
