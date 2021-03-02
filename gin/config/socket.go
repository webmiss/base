package config

type Socket struct {
	Url  string
	Host string
	Port string
}

/* 公共配置 */
func (cfg *Socket) Config() *Socket {
	cfg.Url = "/websocket" //地址
	cfg.Host = "localhost" //主机
	cfg.Port = "9021"      //端口
	return cfg
}
