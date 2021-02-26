package config

type Env struct {
	Mode string
	Host string
	Port string
}

/* 公共配置 */
func (cfg *Env) Config() *Env {
	cfg.Mode = "debug"     //模式: debug, release, test
	cfg.Host = "127.0.0.1" //主机
	cfg.Port = "9030"      //端口
	return cfg
}
