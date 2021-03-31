package config

type SocketType struct {
	URL  string
	Host string
	Port string
}

/* Socket配置 */
func Socket() *SocketType {
	cfg := &SocketType{}
	cfg.URL = "/websocket" //地址
	cfg.Host = "localhost" //主机
	cfg.Port = "9031"      //端口
	return cfg
}
