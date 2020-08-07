import HtmlInfo from '../../libray/inc/html-info'

Component({
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  properties: {
    active: {type: Number, value: 0},
    list: {type: Array, value: []},
    num: {type: Number, value: 4},
  },
  data: {
    scroll: false,
    w: 0,
    nw: 0,
    transform: 'translate(-100%,0)',
    maxWidth: 0,
  },
  attached(){
    this.init();
  },
  methods: {

    /* 初始化 */
    init(){
      /* 数量 */
      let t = this.data.list.length;
      let n = t;
      if(t>this.data.num){
        n = this.data.num;
        this.setData({ scroll:true });
      }
      /* 等分宽度 */
      this.setData({ w:100/n });
      this.setData({ nw:t*this.data.w+'%' });
      /* 底边 */
      this.moveLine(this.data.active);
    },

    /* 切换菜单 */
    tabClick(e){
      const k = e.currentTarget.dataset.k;
      const v = e.currentTarget.dataset.v;
      this.moveLine(k);
      this.setData({active:k});
      this.triggerEvent('change',[k,v]);
    },

    /* 动画 */
    moveLine(n){
      this.setData({ transform:'translate('+n*100+'%,0)' });
    },

    /* 开始 */
    start(){
      HtmlInfo(this,'#body',(res)=>{
        this.setData({ maxWidth:res[0].width });
      });
    },
    
  }
})
