
import HtmlInfo from '../../libray/inc/html-info'

Component({
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  properties: {
    isScroll: {type: Boolean, value: true},
    scrollX: {type: Boolean, value: false},
    scrollY: {type: Boolean, value: true},
    upper: {type: Number, value: 64},
    lowerBoundary: {type: Number, value: 50},
    upperLoad: {type: Boolean, value: true},
    upperIcon: {type: String, value: 'ui ui_loading'},
    upperBg: {type: String, value: ''},
    upperColor: {type: String, value: ''},
    limit: {type: Number, value: 120},
  },
  data: {
    sp:'', //滑动方向
    html: {w:0,h:0},  //容器
    body: {w:0,h:0,x:0,y:0},  //内容
    isUp: false, //之前内容的高度
    refUpper: {}, //左上内容
    refHtml: {}, //容器内容
    refBox: {}, //中间内容
    style: {box:'',upper:'',lower:'',html:''},  //样式
    cubicBezier: '0.25,0.46,0.45,0.94', //动画
  },
  attached(){
    /* 滑动方向 */
    this.setData({ sp:this.data.scrollX?'x':'y' });
    /* 默认值 */
    if(this.data.sp=='x'){
      // 左
      this.setData({
        ['refUpper.left']:0,
        ['refUpper.width']:`${this.data.upper}px`,
        ['refUpper.height']:'100%',
        ['refUpper.transform']:`translate(-${this.data.upper}px,0)`,
        ['refUpper.background-color']: this.data.upperBg,
      });
      // 中
      this.setData({
        ['refBox.width']:'inherit',
        ['refBox.height']:'inherit',
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
      // 中
      this.setData({
        ['refBox.width']:'inherit',
        ['refBox.height']:'inherit',
      });
    }
    // 更新样式
    this.setStyle('upper',this.data.refUpper);
    this.setStyle('box',this.data.refBox);
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
      // 开始坐标
      let touch = e.touches?e.touches[0]:e;
      this.movePage = {x:0,y:0};
      this.tmpPage = {x:0,y:0};
      this.startPage = {x:touch.clientX,y:touch.clientY};
      this.isUpper = false;
      this.isLower = true;
      // 容器-宽高
      HtmlInfo(this,'#html',(res)=>{
        this.setData({ ['html.w']:parseInt(res[0].width), ['html.h']:parseInt(res[0].height) });
      });
      // 开启滑动
      this.scrollEnabled(true);
      this.setData({'isUp':true});
    },
    /* 移动 */
    move(e){
      if(!this.data.isScroll) return false;
      // 开始
      const touch = e.touches?e.touches[0]:e;
      this.movePage = {
        x: parseInt(touch.clientX-this.startPage.x),
        y: parseInt(touch.clientY-this.startPage.y),
      }
      // 移动-距离
      this.tmpPage[this.data.sp] = this.movePage[this.data.sp];
      // 移动-方向
      if(this.tmpPage[this.data.sp]>0){
        this.isUpper = true;
        this.scrollEnabled(false);
        // 控制上限
        let x = this.data.upper-this.tmpPage[this.data.sp];
        if(x<0) this.tmpPage[this.data.sp] = this.data.upper;
        // 值变化
        if(this.tmpPage[this.data.sp]!=this.tmpUpper){
          this.tmpUpper = this.tmpPage[this.data.sp];
          // 加载
          this._translateUpper(x>0?x:0,200);
          // 位置
          this.translate(this.tmpPage[this.data.sp],200);
          // 事件
          if(this.data.sp=='x'){
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
      }
    },
    /* 结束 */
    end(e){
      // 控制上限、下限
      if(this.isUpper){
        // 重置
        this.isUpper = false;
        this._translateUpper(this.data.upper,400);
        this.translate(0,400);
        this.scrollEnabled(true);
        // 事件
        if(this.data.sp=='x'){
          this.setData({
            ['body.x']:0,
            ['body.y']:0,
          });
          this.triggerEvent('scroll',this.res());
          if(this.tmpPage[this.data.sp]>=this.data.upper) this.triggerEvent('left',this.res());
        }else{
          this.setData({
            ['body.x']:0,
            ['body.y']:0,
          });
          this.triggerEvent('scroll',this.res());
          if(this.tmpPage[this.data.sp]>=this.data.upper) this.triggerEvent('down',this.res());
        }
      }
    },
    /* 滑动事件 */
    scroll(e){
      const x = parseInt(e.detail.scrollLeft);
      const y = parseInt(e.detail.scrollTop);
      const w = e.detail.scrollWidth;
      const h = e.detail.scrollHeight;
      this.setData({ ['body.x']:x,['body.y']:y,['body.w']:w,['body.h']:h });
      this.triggerEvent('scroll',this.res());
      if(y > this.data.body.h-this.data.html.h-this.data.lowerBoundary&&y < this.data.body.h-this.data.html.h&&this.data.isUp){
        const ratio = Math.abs(this.moveBodyPage.x/this.moveBodyPage.y) || 0;
        if(ratio<1 && this.moveBodyPage.y<1){
          this.setData({'isUp':false});
          this.triggerEvent('up',this.res());
        }
      }
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
    /* 滑动状态 */
    scrollEnabled(state){
      if(this.data.sp=='x') this.setData({ scrollX:state });
      else this.setData({ scrollY:state });
    },
    /* 滚动-位置 */
    translate(n,time){
      this.setData({
        ['refHtml.transition-duration']:`${time}ms`,
        ['refHtml.transition-timing-function']:'linear',
      });
      if(this.data.sp=='x'){
        this.setData({ ['refHtml.padding-left']:`${n}px` });
        // this.setData({ ['refHtml.transform']:`translate(${n}px,0)` });
      }else{
        this.setData({ ['refHtml.padding-top']:`${n}px` });
        // this.setData({ ['refHtml.transform']:`translate(0,${n}px)` });
      }
      this.setStyle('html',this.data.refHtml);
    },
    /* 加载-左/上 */
    _translateUpper(n,time){
      this.setData({
        ['refUpper.opacity']:(100-n/this.data.upper*100)/100,
        ['refUpper.transition-duration']:`${time}ms`,
        ['refUpper.transition-timing-function']:'linear',
      });
      if(this.data.sp=='x') this.setData({ ['refUpper.transform']:`translate(-${n}px,0)` });
      else this.setData({ ['refUpper.transform']:`translate(0,-${n}px)` });
      this.setStyle('upper',this.data.refUpper);
    },
    /* Array to Style */
    setStyle(name,val){
      let str = '';
      for(let k in val) str += `${k}:${val[k]}; `;
      this.setData({ [`style.${name}`]:str });
    },
  }
})
