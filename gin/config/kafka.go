package config

type KafkaType struct {
	Log  bool
	Type string
	Host string
	Port string
}

/* Kafka配置 */
func Kafka() *KafkaType {
	cfg := &KafkaType{}
	cfg.Log = false        //显示日志
	cfg.Type = "tcp"       //类型
	cfg.Host = "localhost" //主机
	cfg.Port = "9092"      //端口
	return cfg
}
