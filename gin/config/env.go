package config

// Env :公共配置
type Env struct {
	Mode             string
	Host             string
	Port             string
	Key              string
	BaseURL          string
	AdminTokenPrefix string
	AdminTokenTime   int64
	AdminTokenAuto   bool
	ApiTokenPrefix   string
	ApiTokenTime     int64
	ApiTokenAuto     bool
}

// Config :获取
func (cfg *Env) Config() *Env {
	cfg.Mode = "debug"                            //模式: debug, release, test
	cfg.Host = "127.0.0.1"                        //主机
	cfg.Port = "9030"                             //端口
	cfg.Key = "e4b99adec618e653400966be536c45f8"  //Key
	cfg.BaseURL = "https://demo-iris.webmis.vip/" //资源
	cfg.AdminTokenPrefix = "AdminToken_"          //前缀
	cfg.AdminTokenTime = 1 * 3600                 //有效时长(1小时)
	cfg.AdminTokenAuto = true                     //自动续期
	cfg.ApiTokenPrefix = "ApiToken_"              //前缀
	cfg.ApiTokenTime = 7 * 24 * 3600              //有效时长(7天)
	cfg.ApiTokenAuto = true                       //自动续期
	return cfg
}
