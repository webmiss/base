package config

/* 百度 */
type (
	TongJiType struct {
		UserName    string
		PassWord    string
		Token       string
		AccountType int
	}
)

/* 统计-商业账号 */
func TongJi() *TongJiType {
	cfg := &TongJiType{}
	cfg.UserName = "kingsoul"                      //用户名
	cfg.PassWord = "eckingsoul"                    //密码
	cfg.Token = "c67cde72015a76798c707b170fc6987e" //Token
	cfg.AccountType = 1                            //账户类型
	return cfg
}
