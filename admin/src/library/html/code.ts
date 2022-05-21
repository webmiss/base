/* 扫码枪监听 */
export default (callback: Function)=>{
  let code: string = '';      // 号码
  let lastTime: number;   // 上次时间
  let nextTime: number;   // 最新时间
  let lastCode: number;   // 上次按键
  let nextCode: number;   // 最新按键

  /* 监听 */
  document.onkeypress = (e)=>{

    // 获取按键
    if(window.event) nextCode = e.keyCode;
    else if(e.which) nextCode = e.which;
    
    // 触发回车
    if(nextCode===13){
      if(code.length < 3) return;
      callback(code);
      // 重置
      code = '';
      lastCode = 0;
      lastTime = 0;
      return;
    }

    // 获取号码
    nextTime = new Date().getTime();
    if(!lastTime && !lastCode) code += e.key;
    if(lastCode && lastTime && nextTime-lastTime>30) code = e.key;
    else if(lastCode && lastTime) code = e.key;
    lastCode = nextCode;
    lastTime = nextTime;

  }

}