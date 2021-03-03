package config

type User struct {
	Username string
	Password string
}

type Kafka struct {
	Type     string
	Host     string
	Port     string
	Producer *User
	Consumer *User
}

/* 配置 */
func (cfg *Kafka) Config() *Kafka {
	cfg.Type = "tcp"                              //类型
	cfg.Host = "localhost"                        //主机
	cfg.Port = "9092"                             //端口
	cfg.Producer.Username = "producer"            //生产者-用户名
	cfg.Producer.Password = "vip.webmis.producer" //生产者-密码
	cfg.Consumer.Username = "consumer"            //消费者-用户名
	cfg.Consumer.Password = "vip.webmis.consumer" //消费者-密码
	return cfg
}
