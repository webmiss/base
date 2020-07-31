
Component({
  mixins: [],
  props: {
    reset: '',
    isScroll: true,
    scrollX: false,
    scrollY: true,
    upper: 50,
    lower: 50,
    upperLoad: true,
    lowerLoad: true,
    upperIcon: 'ui ui_loading',
    lowerIcon: 'ui ui_loading',
    upperBg: '',
    lowerBg: '',
    upperColor: '',
    lowerColor: '',
    moveMin: 30,
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
    body: {w:'',h:''}, //容器-宽高
    bodyObj: {w:'',h:''}, //内容-宽高
    bodyMax: {w:0,h:0},  //最大-宽高
    startPage: {x:0,y:0}, //开始-坐标
    movePage: {x:0,y:0},  //移动-坐标
    tmpPage: {x:0,y:0},  //滑动-坐标
    page: {x:0,y:0},  //当前-坐标
    startTime: 0, //开始时间
    limit: 60,  //最小距离
    cubicBezier: '0.25,0.46,0.45,0.94',
    isMove: false,  //是否滑动
    isUpper: false, //左拉、下拉
    isLower: false, //右拉、上拉
    refHtml: {},  //滑动内容
    refBody: {},  //滑动内容
    refUpper: {}, //左上内容
    refLower: {}, //左下内容
    style: {html:'',body:'',upper:'',lower:''},  //样式
  },
  didMount(){
    /* 滑动方向 */
    this.setData({ sp:this.props.scrollX?'x':'y' });
    /* 默认值 */
    if(this.props.scrollX){
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
        ['refBody.min-width']:'100%',
        ['refBody.height']:'100%',
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
        ['refBody.min-height']:'100%',
        ['refBody.width']:'100%',
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
    this.setStyle('body',this.data.refBody);
  },
  methods: {

    /* 返回 */
    res(){
      const data = {
        body: this.data.body,
        client: this.data.bodyMax,
        page: this.data.page,
        move: this.movePage,
      }
      return data;
    },

    /* 初始化 */
    init(){
      /* 容器 */
      this.getDomInfo('#html',(res)=>{
        // 容器-宽高
        this.setData({
          ['refHtml.left']:res.left,
          ['refHtml.top']:res.top,
          ['body.w']:res.width,
          ['body.h']:res.height,
        });
        // 对象-宽高、最大
        if(this.props.scrollX){
          this.getDomInfo('#body',(res)=>{
            this.setData({
              ['bodyObj.w']:res.width,
              ['bodyMax.w']:-(res.width-this.data.body.w),
            });
          });
        }else{
          this.getDomInfo('#body',(res)=>{
            this.setData({
              ['bodyObj.h']:res.height,
              ['bodyMax.h']:-(res.height-this.data.body.h),
            });
          });
        }
      });
    },

    /* 开始 */
    start(e){
      if(!this.props.isScroll) return false;
      let touch = e.touches?e.touches[0]:e;
      // 初始化
      this.init();
      // 开始时间
      this.startTime = e.timeStamp;
      // 开始坐标
      this.movePage= {x:0,y:0};
      this.tmpPage = {x:0,y:0};
      this.startPage= {x:touch.clientX,y:touch.clientY};
      // 重置动画
      clearInterval(this.timeMove);
      this.getTranslate((move)=>{
        this.setData({ isMove:false });
        if(this.data.page[this.data.sp]>0) move=0;
        else if(this.data.page[this.data.sp]<this.data.bodyMax[this.data.sp=='x'?'w':'h']) move=this.data.bodyMax[this.data.sp=='x'?'w':'h'];
        this.translate(move,0);
        this.setData({ ['page.'+this.data.sp]:move });
      });
    },

    /* 移动 */
    move(e){
      if(!this.props.isScroll) return false;
      // 开始
      const touch = e.touches?e.touches[0]:e;
      this.movePage = {
        x: parseInt((touch.clientX-this.startPage.x)*100)/100,
        y: parseInt((touch.clientY-this.startPage.y)*100)/100,
      }
      // 是否移动
      const move = Math.abs(this.movePage[this.data.sp]);
      if(move<this.props.moveMin) return false;
      // 移动距离
      this.setData({ isMove:true });
      this.tmpPage[this.data.sp] = parseInt((this.data.page[this.data.sp]+this.movePage[this.data.sp])*100)/100;
      // 方向
      if(this.tmpPage[this.data.sp]>0){
        // 控制上限
        let x = this.props.upper-this.tmpPage[this.data.sp];
        if(x<-this.props.upper) this.tmpPage[this.data.sp] = this.props.upper*2;
        // 加载
        this._translateUpper(x>0?x:0);
        // 触发-左拉、下拉
        this.isUpper = this.tmpPage[this.data.sp]>=this.props.upper?true:false;
      }else{
        // 控制下限
        let y = this.props.lower+(this.tmpPage[this.data.sp]-this.data.bodyMax[this.data.sp=='x'?'w':'h']);
        if(y<-this.props.lower) this.tmpPage[this.data.sp] = this.data.bodyMax[this.data.sp=='x'?'w':'h']-this.props.lower*2;
        // 加载
        this._translateLower(y>0?y:0);
        // 触发-左拉、下拉
        this.isLower = this.tmpPage[this.data.sp]<=this.data.bodyMax[this.data.sp=='x'?'w':'h']-this.props.lower?true:false;
      }
      // 位置
      this.translate(this.tmpPage[this.data.sp],16);
      // 事项
      if(this.props.scrollX) this.props.onScroll({x:this.tmpPage[this.sp],y:0});
      else this.props.onScroll({x:0,y:this.tmpPage[this.data.sp]});
    },

    /* 结束 */
    end(e){
      // 方向
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
      // 加速-是否滑动
      if(!this.props.isScroll || !this.data.isMove) return false;
      // 加速-比例
      let time = parseInt(e.timeStamp-this.startTime);
      let n = Math.abs(this.movePage[this.data.sp]/time);
      n = n<0.5?0:n;
      let move = parseInt(n*100*8*100)/100;
      let t = parseInt(move*2);
      // 加速-距离
      move = this.movePage[this.data.sp]>0?move:-move;
      this.tmpPage[this.data.sp] = parseInt((this.tmpPage[this.data.sp]+move)*100)/100;
      // 控制上限、下限
      if(this.tmpPage[this.data.sp]>0){
        // 触发-左拉、下拉
        if(this.data.isUpper){
          this.data.isUpper = false;
          if(this.props.scrollX) this.props.onLeft(this.res());
          else this.props.onDown(this.res());
        }
        // 限制距离
        t = parseInt(t-this.tmpPage[this.data.sp]*2);
        t = t<=0?300:t;
        this.tmpPage[this.data.sp] = 0;
        this._translateUpper(this.props.upper);
      }else if(this.tmpPage[this.data.sp]<this.data.bodyMax[this.data.sp=='x'?'w':'h']){
        // 触发-右拉、上拉
        if(this.data.isLower){
          this.data.isLower = false;
          if(this.props.scrollX) this.props.onRight(this.res());
          else this.props.onUp(this.res());
        }
        // 限制距离
        t = parseInt(t-(this.data.bodyMax[this.data.sp=='x'?'w':'h']-this.tmpPage[this.data.sp])*2);
        t = t<=0?300:t;
        this.tmpPage[this.data.sp] = parseInt(this.data.bodyMax[this.data.sp=='x'?'w':'h']);
        this._translateLower(this.props.lower);
      }
      // 加速-位置
      this.translate(this.tmpPage[this.data.sp],t);
      // 加速-实时
      this.progress = 0;
      this.t = t/10;
      clearInterval(this.timeMove);
      this.timeMove = setInterval(()=>{ this.render(); },10);
    },

    /* 动画时间 */
    render(){
      this.progress += 1;
      // 位置
      this.getTranslate((move)=>{
        // 事项
        if(this.props.scrollX) this.props.onScroll({x:move,y:0});
        else this.props.onScroll({x:0,y:move});
      });
      // 控制
      if(this.progress > this.t){
        clearInterval(this.timeMove);
      }
    },

    /* 滚动-位置 */
    translate(xy,time){
      if(this.props.scrollX) this.setData({ ['refBody.transform']:`translate(${xy}px,0)` });
      else this.setData({ ['refBody.transform']:`translate(0,${xy}px)` });
      this.setData({
        ['refBody.transition-duration']:`${time}ms`,
        ['refBody.transition-timing-function']:`cubic-bezier(${this.data.cubicBezier})`,
      });
      // 更新样式
      this.setStyle('body',this.data.refBody);
    },
    /* 实时位置 */
    getTranslate(callback){
      const xy = this.props.scrollX?'left':'top';
      this.getDomInfo('#body',(res)=>{
        let v = -parseInt((this.data.refHtml[xy]-res[xy])*100)/100 || 0;
        callback(v);
      });
    },
    /* 滚动-指定位置 */
    scrollTo(xy,time){
      // 初始化
      this.init();
      // 参数
      xy = xy || 0;
      if(xy=='max') xy=this.data.bodyMax[this.data.sp=='x'?'w':'h'];
      else if(xy=='min') xy=0;
      time = time || 600;
      // 位置
      this.translate(xy,time);
      this.setData({ ['page.'+this.data.sp]:xy });
    },

    /* 加载-左/上 */
    _translateUpper(n){
      this.setData({ ['refUpper.opacity']:(100-n/this.props.upper*100)/100 });
      if(this.props.scrollX) this.setData({ ['refUpper.transform']:`translate(-${n}px,0)` });
      else this.setData({ ['refUpper.transform']:`translate(0,-${n}px)` });
      this.setStyle('upper',this.data.refUpper);
    },
    /* 加载-右/下 */
    _translateLower(n){
      this.setData({ ['refLower.opacity']:(100-n/this.props.lower*100)/100 });
      if(this.props.scrollX) this.setData({ ['refLower.transform']:`translate(${n}px,0)` });
      else this.setData({ ['refLower.transform']:`translate(0,${n}px)` });
      this.setStyle('lower',this.data.refLower);
    },

    /* Dom Info */
    getDomInfo(dom,callback){
      my.createSelectorQuery().select(dom).boundingClientRect().exec((res)=>{
        return callback(res[0]);
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
