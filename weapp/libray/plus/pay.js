import Env from '../../env.js'
import Toast from '../ui/index.js';
import Post from '../ui/request-post'
/* 微信支付 */
/* 拉起支付必需参数
	appId: "wx859a486c158abb8e"
	nonceStr: "9a0c417fd654c76648bcbd8212764d3f"
	package: "prepay_id=wx30164748180621c833574aca1581688700"
	paySign: "AAC91488993BF713BE9C334C686CDF47"
	signType: "MD5"
	timeStamp: "1596098868"
 */
export default (url, data, success, fail) => {
  const str = url.substr(0, 4);
  url = str == 'http' ? url : Env.apiUrl + url;
  data.type = 'JSAPI';
  // 获取code
  wx.login({
    success(resCode) {
      if (resCode.errMsg != 'login:ok') return Toast('授权失败请重试');
      data.code = resCode.code;
      Post(url, data, (res) => {
        const d = res.data;
        if (d.code != 0) return Toast(d.msg);
        d.data.success = success;
        d.data.fail = fail;
        wx.requestPayment(
          d.data,
        );
      });
    }
  });
}