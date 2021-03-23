package config

// SocketType :类型
type SocketType struct {
	URL  string
	Host string
	Port string
}

// Socket :配置
func Socket() *SocketType {
	cfg := &SocketType{}
	cfg.URL = "/websocket" //地址
	cfg.Host = "localhost" //主机
	cfg.Port = "9031"      //端口
	return cfg
}
