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
