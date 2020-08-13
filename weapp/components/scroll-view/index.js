
import HtmlInfo from '../../libray/inc/html-info'

Component({
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  properties: {
    reset: {type: String, value: ''},
    isScroll: {type: Boolean, value: true},
    scrollX: {type: Boolean, value: false},
    scrollY: {type: Boolean, value: true},
    upper: {type: Number, value: 64},
    lower: {type: Number, value: 64},
    upperLoad: {type: Boolean, value: true},
    lowerLoad: {type: Boolean, value: true},
    upperIcon: {type: String, value: 'ui ui_loading'},
    lowerIcon: {type: String, value: 'ui ui_loading'},
    upperBg: {type: String, value: ''},
    lowerBg: {type: String, value: ''},
    upperColor: {type: String, value: ''},
    lowerColor: {type: String, value: ''},
    moveMin: {type: Number, value: 30},
    maxWidth: {type: Number, value: 0},
  },
  data: {
    sp:'', //滑动方向
    html: {w:0,h:0},  //容器
    body: {w:0,h:0,x:0,y:0},  //内容
    limit: 60,  //最小距离
    cubicBezier: '0.25,0.46,0.45,0.94',
    refUpper: {}, //左上内容
    refLower: {}, //左下内容
    refBody: {}, //中间内容
    style: {upper:'',lower:'',body:''},  //样式
  },
  attached(){
    /* 滑动方向 */
    this.setData({ sp:this.data.scrollX?'x':'y' });
    /* 默认值 */
    if(this.data.scrollX){
      // 左
      this.setData({
        ['refUpper.left']:0,
        ['refUpper.width']:`${this.data.upper}px`,
        ['refUpper.height']:'100%',
        ['refUpper.transform']:`translate(-${this.data.upper}px,0)`,
        ['refUpper.background-color']: this.data.upperBg,
      });
      // 右
      this.setData({
        ['refLower.right']:0,
        ['refLower.width']:`${this.data.lower}px`,
        ['refLower.height']:'100%',
        ['refLower.transform']:`translate(${this.data.lower}px,0)`,
        ['refLower.background-color']: this.data.lowerBg,
      });
    }else{
      // 上
      this.setData({
        ['refUpper.top']:0,
        ['refUpper.width']:'100%',
        ['refUpper.height']:`${this.data.upper}px`,
        ['refUpper.transform']:`translate(0,-${this.data.upper}px)`,
        ['refUpper.background-color']: this.data.upperBg,
      });
      // 下
      this.setData({
        ['refLower.bottom']:0,
        ['refLower.width']:'100%',
        ['refLower.height']:`${this.data.lower}px`,
        ['refLower.transform']:`translate(0,${this.data.lower}px)`,
        ['refLower.background-color']: this.data.lowerBg,
      });
    }
    // 更新样式
    this.setStyle('upper',this.data.refUpper);
    this.setStyle('lower',this.data.refLower);
  },
  methods: {

    /* 返回 */
    res(){
      return {
        x: this.data.body.x,
        y: this.data.body.y,
        w: this.data.body.w,
        h: this.data.body.h,
        boxW: this.data.html.w,
        boxH: this.data.html.h,
      }
    },

    /* 开始 */
    start(e){
      if(!this.data.isScroll) return false;
      // 开始坐标
      let touch = e.touches?e.touches[0]:e;
      this.movePage = {x:0,y:0};
      this.tmpPage = {x:0,y:0};
      this.startPage = {x:touch.clientX,y:touch.clientY};
      // 容器-宽高
      HtmlInfo(this,'#html',(res)=>{
        this.setData({ ['html.w']:parseInt(res[0].width), ['html.h']:parseInt(res[0].height) });
      });
      // 内容-宽高
      HtmlInfo(this,'#body',(res)=>{
        this.setData({ ['body.w']:parseInt(res[0].width), ['body.h']:parseInt(res[0].height) });
      });
    },
    
    /* 移动 */
    move(e){
      // 开始
      const touch = e.touches?e.touches[0]:e;
      this.movePage = {
        x: parseInt(touch.clientX-this.startPage.x),
        y: parseInt(touch.clientY-this.startPage.y),
      }
      // 移动-距离
      this.tmpPage[this.data.sp] = parseInt(this.movePage[this.data.sp]*100)/100;
      // 移动-方向
      if(this.tmpPage[this.data.sp]>0){
        // 控制上限
        let x = this.data.upper-this.tmpPage[this.data.sp];
        if(x<0) this.tmpPage[this.data.sp] = this.data.upper;
        // 值变化
        if(this.tmpPage[this.data.sp]!=this.tmpUpper){
          // 加载
          this._translateUpper(x>0?x:0,64);
          // 位置
          this.translate(this.tmpPage[this.data.sp],64);
          this.tmpUpper = this.tmpPage[this.data.sp];
          // 事件
          if(this.data.scrollX){
            this.setData({
              ['body.x']:-this.tmpPage[this.data.sp],
              ['body.y']:0,
            });
            this.triggerEvent('scroll',this.res());
          }else{
            this.setData({
              ['body.x']:0,
              ['body.y']:-this.tmpPage[this.data.sp],
            });
            this.triggerEvent('scroll',this.res());
          }
        }
      }else{
        // 控制上限
        let y = this.data.lower+this.tmpPage[this.data.sp];
        if(y<0) this.tmpPage[this.data.sp] = -this.data.lower;
        // 值变化
        if(this.tmpPage[this.data.sp]!=this.tmpLower){
          // 加载
          this._translateLower(y>0?y:0,64);
          // 位置
          this.isLower = true;
          this.translate(this.tmpPage[this.data.sp],64);
          this.tmpLower = this.tmpPage[this.data.sp];
          // 事件
          if(this.data.scrollX){
            this.setData({
              ['body.x']:this.data.body.w-this.data.html.w-this.tmpPage[this.data.sp],
              ['body.y']:0,
            });
            this.triggerEvent('scroll',this.res());
          }else{
            this.setData({
              ['body.x']:0,
              ['body.y']:this.data.body.h-this.data.html.h-this.tmpPage[this.data.sp],
            });
            this.triggerEvent('scroll',this.res());
          }
        }
      }
    },

    /* 结束 */
    end(e){
      // 控制上限、下限
      if(this.tmpPage[this.data.sp]>0){
        this._translateUpper(this.data.upper,400);
        this.translate(0,400);
        // 事件
        if(this.data.scrollX){
          this.setData({ ['body.x']:0,['body.y']:0 });
          this.triggerEvent('left',this.res());
          this.triggerEvent('scroll',this.res());
        }else{
          this.setData({ ['body.x']:0,['body.y']:0 });
          this.triggerEvent('down',this.res());
          this.triggerEvent('scroll',this.res());
        }
      }else if(this.isLower){
        this.isLower = false;
        this._translateLower(this.data.lower,400);
        this.translate(0,400);
        // 事件
        if(this.data.scrollX){
          this.setData({ ['body.x']:this.data.body.h-this.data.html.h,['body.y']:0 });
          this.triggerEvent('right',this.res());
          this.triggerEvent('scroll',this.res());
        }else{
          this.setData({ ['body.x']:0,['body.y']:this.data.body.h-this.data.html.h });
          this.triggerEvent('up',this.res());
          this.triggerEvent('scroll',this.res());
        }
      }
    },

    /* 滑动事件 */
    scroll(e){
      const x = parseInt(e.detail.scrollLeft);
      const y = parseInt(e.detail.scrollTop);
      this.setData({ ['body.x']:x,['body.y']:y });
      this.triggerEvent('scroll',this.res());
    },

    /* 滑动方向 */
    startBody(e){
      let touch = e.touches?e.touches[0]:e;
      this.startBodyPage = {x:touch.clientX,y:touch.clientY};
      this.moveBodyPage = {x:0,y:0};
    },
    moveBody(e){
      // 开始
      const touch = e.touches?e.touches[0]:e;
      this.moveBodyPage = {
        x: parseInt(touch.clientX-this.startBodyPage.x),
        y: parseInt(touch.clientY-this.startBodyPage.y),
      }
    },
    endBody(e){
      const ratio = Math.abs(this.moveBodyPage.x/this.moveBodyPage.y) || 0;
      if(ratio>1 && this.moveBodyPage.x>this.data.limit){
        this.triggerEvent('swipe','left');
      }else if(ratio>1 && this.moveBodyPage.x<-this.data.limit){
        this.triggerEvent('swipe','right');
      }else if(ratio<1 && this.moveBodyPage.y>this.data.limit){
        this.triggerEvent('swipe','down');
      }else if(ratio<1 && this.moveBodyPage.y<-this.data.limit){
        this.triggerEvent('swipe','up');
      }
    },

    /* 滚动-位置 */
    translate(n,time){
      this.setData({
        ['refBody.transition-duration']:`${time}ms`,
        ['refBody.transition-timing-function']:`cubic-bezier(${this.data.cubicBezier})`,
      });
      if(this.data.scrollX) this.setData({ ['refBody.transform']:`translate(${n}px,0)` });
      else this.setData({ ['refBody.transform']:`translate(0,${n}px)` });
      this.setStyle('body',this.data.refBody);
    },

    /* 加载-左/上 */
    _translateUpper(n,time){
      this.setData({
        ['refUpper.opacity']:(100-n/this.data.upper*100)/100,
        ['refUpper.transition-duration']:`${time}ms`,
        ['refUpper.transition-timing-function']:`cubic-bezier(${this.data.cubicBezier})`,
      });
      if(this.data.scrollX) this.setData({ ['refUpper.transform']:`translate(-${n}px,0)` });
      else this.setData({ ['refUpper.transform']:`translate(0,-${n}px)` });
      this.setStyle('upper',this.data.refUpper);
    },
    /* 加载-右/下 */
    _translateLower(n,time){
      this.setData({
        ['refLower.opacity']:(100-n/this.data.lower*100)/100,
        ['refLower.transition-duration']:`${time}ms`,
        ['refLower.transition-timing-function']:`cubic-bezier(${this.data.cubicBezier})`,
      });
      if(this.data.scrollX) this.setData({ ['refLower.transform']:`translate(${n}px,0)` });
      else this.setData({ ['refLower.transform']:`translate(0,${n}px)` });
      this.setStyle('lower',this.data.refLower);
    },

    /* Array to Style */
    setStyle(name,val){
      let str = '';
      for(let k in val) str += `${k}:${val[k]}; `;
      this.setData({ [`style.${name}`]:str });
    },
    
  }
})
