
import HtmlInfo from '../../libray/inc/html-info'

const app = getApp();

Component({
  mixins: [],
  props: {
    isScroll: true,
    scrollX: false,
    scrollY: true,
    upper: 64,
    lower: 64,
    upperLoad: true,
    lowerLoad: true,
    upperIcon: 'ui ui_loading',
    lowerIcon: 'ui ui_loading',
    upperBg: '',
    lowerBg: '',
    upperColor: '',
    lowerColor: '',
    // 事件
    onScroll: ()=>{},
    onSwipe: ()=>{},
    onLeft: ()=>{},
    onRight: ()=>{},
    onUp: ()=>{},
    onDown: ()=>{},
  },
  data: {
    sp:'', //滑动方向
    html: {w:0,h:0},  //容器
    body: {w:0,h:0,x:0,y:0},  //内容
    limit: 60,  //最小距离
    refUpper: {}, //左上内容
    refLower: {}, //左下内容
    refHtml: {}, //容器内容
    refBox: {}, //中间内容
    style: {box:'',upper:'',lower:'',html:''},  //样式
    cubicBezier: '0.25,0.46,0.45,0.94', //动画
    disable: false,
    platform: '',
  },
  didMount(){
    /* 滑动方向 */
    this.setData({ sp:this.props.scrollX?'x':'y' });
    /* 默认值 */
    if(this.data.sp=='x'){
      // 左
      this.setData({
        ['refUpper.left']:0,
        ['refUpper.width']:`${this.props.upper}px`,
        ['refUpper.height']:'100%',
        ['refUpper.transform']:`translate(-${this.props.upper}px,0)`,
        ['refUpper.background-color']: this.props.upperBg,
      });
      // 中
      this.setData({
        ['refBox.width']:'auto',
        ['refBox.height']:'inherit',
        ['refBox.min-width']:'100%',
      });
      // 右
      this.setData({
        ['refLower.right']:0,
        ['refLower.width']:`${this.props.lower}px`,
        ['refLower.height']:'100%',
        ['refLower.transform']:`translate(${this.props.lower}px,0)`,
        ['refLower.background-color']: this.props.lowerBg,
      });
    }else{
      // 上
      this.setData({
        ['refUpper.top']:0,
        ['refUpper.width']:'100%',
        ['refUpper.height']:`${this.props.upper}px`,
        ['refUpper.transform']:`translate(0,-${this.props.upper}px)`,
        ['refUpper.background-color']: this.props.upperBg,
      });
      // 中
      this.setData({
        ['refBox.width']:'inherit',
        ['refBox.height']:'auto',
        ['refBox.min-height']:'100%',
      });
      // 下
      this.setData({
        ['refLower.bottom']:0,
        ['refLower.width']:'100%',
        ['refLower.height']:`${this.props.lower}px`,
        ['refLower.transform']:`translate(0,${this.props.lower}px)`,
        ['refLower.background-color']: this.props.lowerBg,
      });
    }
    // 更新样式
    this.setStyle('upper',this.data.refUpper);
    this.setStyle('lower',this.data.refLower);
    this.setStyle('box',this.data.refBox);
    // 是否IOS
    setTimeout(()=>{
      this.setData({ platform:app.globalData.platform });
    },1000);
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
      this.isLower = false;
      // 容器-宽高
      HtmlInfo(this,'#html',(res)=>{
        this.setData({ ['html.w']:parseInt(res[0].width), ['html.h']:parseInt(res[0].height) });
      });
      // 开启滑动
      this.scrollEnabled(true);
    },
    
    /* 移动 */
    move(e){
      if(!this.props.isScroll) return false;
      // 开始
      const touch = e.touches?e.touches[0]:e;
      this.movePage = {
        x: parseInt(touch.clientX-this.startPage.x),
        y: parseInt(touch.clientY-this.startPage.y),
      }
      // 移动-距离
      this.tmpPage[this.data.sp] = this.movePage[this.data.sp];
      // 移动-方向
      if(this.data.body[this.data.sp]<=0 && this.tmpPage[this.data.sp]>0){
        this.isUpper = true;
        this.scrollEnabled(false);
        // 控制上限
        let x = this.props.upper-this.tmpPage[this.data.sp];
        if(x<0) this.tmpPage[this.data.sp] = this.props.upper;
        // 值变化
        if(this.tmpPage[this.data.sp]!=this.tmpUpper){
          this.tmpUpper = this.tmpPage[this.data.sp];
          // 加载
          this._translateUpper(x>0?x:0,100);
          // 位置
          if(this.data.platform!='iOS') this.translate(this.tmpPage[this.data.sp],100);
          // 事件
          if(this.data.sp=='x'){
            this.setData({
              ['body.x']:-this.tmpPage[this.data.sp],
              ['body.y']:0,
            });
            this.props.onScroll(this.res());
          }else{
            this.setData({
              ['body.x']:0,
              ['body.y']:-this.tmpPage[this.data.sp],
            });
            this.props.onScroll(this.res());
          }
        }
      }else if(this.data.body[this.data.sp]>0 && this.data.body[this.data.sp]>=this.data.body[this.data.sp=='x'?'w':'h']-this.data.html[this.data.sp=='x'?'w':'h'] && this.tmpPage[this.data.sp]<0){
        this.isLower = true;
        this.scrollEnabled(false);
        // 控制上限
        let y = this.props.lower+this.tmpPage[this.data.sp];
        if(y<0) this.tmpPage[this.data.sp] = -this.props.lower;
        // 值变化
        if(this.tmpPage[this.data.sp]!=this.tmpLower){
          this.tmpLower = this.tmpPage[this.data.sp];
          // 加载
          this._translateLower(y>0?y:0,100);
          // 位置
          if(this.data.platform!='iOS') this.translate(this.tmpPage[this.data.sp],100);
          // 事件
          if(this.data.sp=='x'){
            this.setData({
              ['body.x']:this.data.body.w-this.data.html.w-this.tmpPage[this.data.sp],
              ['body.y']:0,
            });
            this.props.onScroll(this.res());
          }else{
            this.setData({
              ['body.x']:0,
              ['body.y']:this.data.body.h-this.data.html.h-this.tmpPage[this.data.sp],
            });
            this.props.onScroll(this.res());
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
        this._translateUpper(this.props.upper,400);
        this.translate(0,400);
        this.scrollEnabled(true);
        // 事件
        if(this.data.sp=='x'){
          this.setData({
            ['body.x']:0,
            ['body.y']:0,
          });
          this.props.onScroll(this.res());
          if(this.tmpPage[this.data.sp]>=this.props.upper) this.props.onLeft(this.res());
        }else{
          this.setData({
            ['body.x']:0,
            ['body.y']:0,
          });
          this.props.onScroll(this.res());
          if(this.tmpPage[this.data.sp]>=this.props.upper) this.props.onDown(this.res());
        }
      }else if(this.isLower){
        // 重置
        this.isLower = false;
        this._translateLower(this.props.lower,400);
        this.translate(0,400);
        this.scrollEnabled(true);
        // 事件
        if(this.data.sp=='x'){
          this.setData({
            ['body.x']:this.data.body.h-this.data.html.h,
            ['body.y']:0,
          });
          this.props.onScroll(this.res());
          this.props.onRight(this.res());
        }else{
          this.setData({
            ['body.x']:0,
            ['body.y']:this.data.body.h-this.data.html.h,
          });
          this.props.onScroll(this.res());
          this.props.onUp(this.res());
        }
      }
      // 滑动方向
      const ratio = Math.abs(this.movePage.x/this.movePage.y) || 0;
      if(ratio>1 && this.movePage.x>this.data.limit){
        this.props.onSwipe('left');
      }else if(ratio>1 && this.movePage.x<-this.data.limit){
        this.props.onSwipe('right');
      }else if(ratio<1 && this.movePage.y>this.data.limit){
        this.props.onSwipe('down');
      }else if(ratio<1 && this.movePage.y<-this.data.limit){
        this.props.onSwipe('up');
      }
    },

    /* 滑动事件 */
    scroll(e){
      const x = parseInt(e.detail.scrollLeft);
      const y = parseInt(e.detail.scrollTop);
      const w = e.detail.scrollWidth;
      const h = e.detail.scrollHeight;
      this.setData({ ['body.x']:x,['body.y']:y,['body.w']:w,['body.h']:h });
      this.props.onScroll(this.res());
    },

    /* 滑动状态 */
    scrollEnabled(state){
      this.setData({ disable:!state });
    },
    toUpper(){
      console.log('toUpper');
      alert(1);
    },

    /* 滚动-位置 */
    translate(n,time){
      this.setData({
        ['refHtml.transition-duration']:`${time}ms`,
        ['refHtml.transition-timing-function']:'linear',
      });
      if(this.data.sp=='x') this.setData({ ['refHtml.transform']:`translate(${n}px,0)` });
      else this.setData({ ['refHtml.transform']:`translate(0,${n}px)` });
      this.setStyle('html',this.data.refHtml);
    },

    /* 加载-左/上 */
    _translateUpper(n,time){
      this.setData({
        ['refUpper.opacity']:(100-n/this.props.upper*100)/100,
        ['refUpper.transition-duration']:`${time}ms`,
        ['refUpper.transition-timing-function']:'linear',
      });
      if(this.data.sp=='x') this.setData({ ['refUpper.transform']:`translate(-${n}px,0)` });
      else this.setData({ ['refUpper.transform']:`translate(0,-${n}px)` });
      this.setStyle('upper',this.data.refUpper);
    },
    /* 加载-右/下 */
    _translateLower(n,time){
      this.setData({
        ['refLower.opacity']:(100-n/this.props.lower*100)/100,
        ['refLower.transition-duration']:`${time}ms`,
        ['refLower.transition-timing-function']:'linear',
      });
      if(this.data.sp=='x') this.setData({ ['refLower.transform']:`translate(${n}px,0)` });
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
