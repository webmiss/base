package config

// Socket :配置
type Socket struct {
	URL  string
	Host string
	Port string
}

// Config :获取
func (cfg *Socket) Config() *Socket {
	cfg.URL = "/websocket" //地址
	cfg.Host = "localhost" //主机
	cfg.Port = "9021"      //端口
	return cfg
}
