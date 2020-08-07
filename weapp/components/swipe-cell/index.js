
import HtmlInfo from '../../libray/inc/html-info'

Component({
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  properties: {
  },
  data: {
    sp: 'x',  //移动方向
    startPage: {x:0,y:0}, //开始-坐标
    movePage: {x:0,y:0},  //移动-坐标
    tmpPage: {x:0,y:0},  //滑动-坐标
    page: {x:0,y:0},  //当前-坐标
    min: 50,  //最小移动
    max: 0, //最大移动
    time: 300,  //时间
    cubicBezier: '0.25,0.46,0.45,0.94', //动画
    refHtml: {}, //容器
    refBody: {}, //内容
    refRight: {},  //右侧
    style: {body:'',right:''},  //样式
  },
  attached(){
  },
  methods: {
    
    /* 开始 */
    start(e){
      // 开始坐标
      const touch = e.touches?e.touches[0]:e;
      this.movePage = {x:0,y:0};
      this.tmpPage = {x:0,y:0};
      this.startPage = {x:touch.clientX,y:touch.clientY};
      // 容器
      HtmlInfo(this,'#html',(res)=>{
        this.setData({
          ['refHtml.left']:res[0].left,
          ['refHtml.top']:res[0].top,
        });
      });
      // 对象
      this.setData({
        ['refBody.transition-duration']:'0ms',
        ['refRight.transition-duration']:'0ms',
        ['refBody.transition-timing-function']:`cubic-bezier(${this.data.cubicBezier})`,
        ['refRight.transition-timing-function']:`cubic-bezier(${this.data.cubicBezier})`,
      });
      // 最大移动
      HtmlInfo(this,'#right',(res)=>{
        this.setData({ max:res[0].width });
      });
      // 当前位置
      this.getTranslate((move)=>{
        this.setData({ ['page.'+this.data.sp]:move });
        this.translate(move,0);
      });
    },

    /* 移动 */
    move(e){
      let touch = e.touches?e.touches[0]:e;
      this.movePage = {
        x: parseInt((touch.clientX-this.startPage.x)*100)/100,
        y: parseInt((touch.clientY-this.startPage.y)*100)/100,
      }
      // 移动距离
      this.tmpPage[this.data.sp] = parseInt((this.data.page[this.data.sp]+this.movePage[this.data.sp])*100)/100;
      // 控制距离
      if(this.tmpPage[this.data.sp]>0) this.tmpPage[this.data.sp]=0;
      if(this.tmpPage[this.data.sp]<-this.data.max) this.tmpPage[this.data.sp] = -this.data.max;
      // 位置
      this.translate(this.tmpPage[this.data.sp],0);
    },

    /* 结束 */
    end(e){
      // 控制距离
      if(this.movePage[this.data.sp]<0) this.tmpPage[this.data.sp]=-this.data.max;
      else if(this.movePage[this.data.sp]>0) this.tmpPage[this.data.sp]=0;
      else return false;
      // 位置
      this.setData({ ['page.'+this.data.sp]:this.tmpPage[this.data.sp] });
      this.translate(this.tmpPage[this.data.sp],this.data.time);
    },

    /* 滚动-位置 */
    translate(x,time){
      this.setData({
        ['refBody.transform']:`translate(${x}px,0)`,
        ['refBody.transition-duration']:`${time}ms`,
        ['refRight.transform']:`translate(${this.data.max+x}px,0)`,
        ['refRight.transition-duration']:`${time}ms`,
      });
      // 更新样式
      this.setStyle('body',this.data.refBody);
      this.setStyle('right',this.data.refRight);
    },
    /* 实时位置 */
    getTranslate(callback){
      HtmlInfo(this,'#body',(res)=>{
        let v = -parseInt((this.data.refHtml['left']-res[0]['left'])*100)/100 || 0;
        callback(v);
      });
    },
    
    /* Array to Style */
    setStyle(name,val){
      let str = '';
      for(let k in val) str += `${k}:${val[k]}; `;
      this.setData({ [`style.${name}`]:str });
    },
    
  }
})
