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
func Mysql() map[string]string {
	return map[string]string{
		// "host": "127.0.0.1", //主机
		"host":     "154.91.144.171",                   //主机
		"port":     "3306",                             //端口
		"user":     "webmis",                           //用户名
		"password": "e4b99adec618e653400966be536c45f8", //密码
		"db":       "data",                             //数据库名
		"charset":  "utf8mb4",                          //编码
	}
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
