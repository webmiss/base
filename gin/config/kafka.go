package config

type Kafka struct {
	Type string
	Host string
	Port string
}

/* 配置 */
func (cfg *Kafka) Config() *Kafka {
	cfg.Type = "tcp"       //类型
	cfg.Host = "localhost" //主机
	cfg.Port = "9092"      //端口
	return cfg
}
