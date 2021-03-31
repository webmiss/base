package config

type EnvType struct {
	Mode             string
	Host             string
	Port             string
	Key              string
	BaseURL          string
	RootDir          string
	AdminTokenPrefix string
	AdminTokenTime   int64
	AdminTokenAuto   bool
	ApiTokenPrefix   string
	ApiTokenTime     int64
	ApiTokenAuto     bool
}

/* 公共配置 */
func Env() *EnvType {
	cfg := &EnvType{}
	cfg.Mode = "debug"                           //模式: debug, release, test
	cfg.Host = "127.0.0.1"                       //主机
	cfg.Port = "9030"                            //端口
	cfg.Key = "e4b99adec618e653400966be536c45f8" //Key
	// cfg.BaseURL = "https://demo-go.webmis.vip/"  //资源
	cfg.BaseURL = "http://localhost/gin/public/" //资源
	cfg.RootDir = "public/"                      //根目录
	cfg.AdminTokenPrefix = "Admin"               //前缀
	cfg.AdminTokenTime = 2 * 3600                //有效时长(2小时)
	cfg.AdminTokenAuto = true                    //自动续期
	cfg.ApiTokenPrefix = "Api"                   //前缀
	cfg.ApiTokenTime = 7 * 24 * 3600             //有效时长(7天)
	cfg.ApiTokenAuto = true                      //自动续期
	return cfg
}
