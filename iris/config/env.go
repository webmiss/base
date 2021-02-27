package config

type Env struct {
	Mode    string
	Host    string
	Port    string
	Key     string
	BaseUrl string
}

/* 公共配置 */
func (cfg *Env) Config() *Env {
	cfg.Mode = "debug"                            //模式: debug, release
	cfg.Host = "127.0.0.1"                        //主机
	cfg.Port = "9020"                             //端口
	cfg.Key = "e4b99adec618e653400966be536c45f8"  //Key
	cfg.BaseUrl = "https://demo-iris.webmis.vip/" //资源
	return cfg
}
