import Env from '@/env'

export default {

  /* 去数组重复 */
  unique(arr){
    let data = [];
    for(let i=0,l=arr.length; i<l; i++) {
      for(var j=i+1; j<l; j++) if (arr[i] === arr[j]) j = ++i;
      data.push(arr[i]);
    }
    return data;
  },

  /* 获取日期 */
  getDay(n,day){
    let now = day?new Date(day):new Date();
    now.setDate(now.getDate()+n);
    let y = now.getFullYear();
    let m = (now.getMonth()+1)<10?'0'+(now.getMonth()+1):(now.getMonth()+1);
    let d = now.getDate()<10?'0'+now.getDate():now.getDate();
    return y+'-'+m+'-'+d;
  },
  /* 获取星期几 */
  getWeek(day){
    let date=new Date(day);
    let week = ['日','一','二','三','四','五','六'];
    return week[date.getDay()];
  },
  /* 年月日时分秒 */
  getDate(){
    const time = new Date();
    const y = time.getFullYear();
    const m = time.getMonth()+1<10?'0'+(time.getMonth()+1):time.getMonth()+1;
    const d = time.getDate()<10?'0'+time.getDate():time.getDate();
    const h = time.getHours()<10?'0'+time.getHours():time.getHours();
    const i = time.getMinutes()<10?'0'+time.getMinutes():time.getMinutes();
    const s = time.getSeconds()<10?'0'+time.getSeconds():time.getSeconds();
    return y+'-'+m+'-'+d+' '+h+':'+i+':'+s;
  },

  /* 坐标转角度 */
  getAngle(x,y){
    let l = Math.sqrt(x*x + y*y);
    let a = Math.acos(x/l);
    let res = parseInt(a*180/Math.PI);
    if(x==0 && y==0) return 0;
    else if(x>=0 && y>=0) return -res;
    else if(x<0 && y>=0) return -res;
    return res;
  },

  /* 格式化价格 */
  formatPrice(price){
    return (parseInt(price).toString()).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
  },

  /* 隐藏手机号码 */
  formatTel(tel){
    const reg = /^(\d{3})\d{4}(\d{4})$/;
    return tel.replace(reg, '$1****$2');
  },

  /* 获取Html图片地址 */
  getimgsrc(htmlstr){
    const reg = /<img.+?src=('|")?([^'"]+)('|")?(?:\s+|>)/gim;
    let imgs = [];
    let tem = null;
    while (tem=reg.exec(htmlstr)) imgs.push(tem[2]);
    return imgs;
  },

  /* 时间大小 */
  timeSize(t){
    const now = new Date().getTime();
    const last = new Date(t).getTime();
    return now-last;
  },

  /* 时间转换 */
  formatTime(t){
    let time = t;
    let now = new Date();
    let y = now.getFullYear();
    let m = (now.getMonth()+1)<10?'0'+(now.getMonth()+1):(now.getMonth()+1);
    let d = now.getDate()<10?'0'+now.getDate():now.getDate();
    // 判断
    let tmp_y = t.substr(0,4);
    let tmp_m = t.substr(5,2);
    let tmp_d = t.substr(8,2);
    let tmp_t1 = t.substr(11,5);
    let tmp_t2 = t.substr(5,11);
    // 时
    let h = parseInt(t.substr(11,2));
    // 当天
    if(tmp_y==y && tmp_m==m && tmp_d==d){
      let str = '';
      if(h<6) str='凌晨';
      else if(h<9) str='早上';
      else if(h<12) str='上午';
      else if(h<14) str='中午';
      else if(h<17) str='下午';
      else if(h<20) str='晚上';
      time = str+' '+tmp_t1;
    }else if(tmp_y==y && tmp_m==m && tmp_d==d-1){
      // 本月
      time = '昨天 '+tmp_t1
    }else if(tmp_y==y && tmp_m==m){
      // 本月
      time = tmp_t2
    }
    return time;
  },

}