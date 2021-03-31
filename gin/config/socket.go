package config

type SocketType struct {
	Type string
	URL  string
	Host string
	Port string
}

/* Socket配置 */
func Socket() *SocketType {
	cfg := &SocketType{}
	cfg.Type = "ws"        //类型
	cfg.URL = "/websocket" //地址
	cfg.Host = "localhost" //主机
	cfg.Port = "9031"      //端口
	return cfg
}
