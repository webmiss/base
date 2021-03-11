package config

// Kafka :Kafka配置
type Kafka struct {
	Log  bool
	Type string
	Host string
	Port string
}

// Config :获取
func (cfg *Kafka) Config() *Kafka {
	cfg.Log = false        //显示日志
	cfg.Type = "tcp"       //类型
	cfg.Host = "localhost" //主机
	cfg.Port = "9092"      //端口
	return cfg
}
