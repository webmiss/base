package config

type EnvType struct {
	MachineId        int64
	Mode             string
	Host             string
	Port             string
	Key              string
	Password         string
	BaseURL          string
	RootDir          string
	AdminTokenPrefix string
	AdminTokenTime   int64
	AdminTokenAuto   bool
	AdminTokenSso    bool
	ApiTokenPrefix   string
	ApiTokenTime     int64
	ApiTokenAuto     bool
	ApiTokenSso      bool
}

/* 公共配置 */
func Env() *EnvType {
	cfg := &EnvType{}
	cfg.MachineId = 1                            //机器标识
	cfg.Mode = "debug"                           //模式: debug, release, test
	cfg.Host = "127.0.0.1"                       //主机
	cfg.Port = "9030"                            //端口
	cfg.Key = "e4b99adec618e653400966be536c45f8" //Key
	cfg.Password = "123456"                      //默认密码
	/* 资源 */
	cfg.BaseURL = "https://go.webmis.vip/"
	// cfg.BaseURL = "http://localhost/gin/public/"
	cfg.RootDir = "public/"
	/* Token */
	cfg.AdminTokenPrefix = "Admin"   //前缀
	cfg.AdminTokenTime = 2 * 3600    //有效时长(2小时)
	cfg.AdminTokenAuto = true        //自动续期
	cfg.AdminTokenSso = false        //单点登录
	cfg.ApiTokenPrefix = "Api"       //前缀
	cfg.ApiTokenTime = 7 * 24 * 3600 //有效时长(7天)
	cfg.ApiTokenAuto = true          //自动续期
	cfg.ApiTokenSso = false          //单点登录
	return cfg
}
