Component({
  mixins: [],
  props: {
    active: 0,
    list: [],
    num: 4,
    // 事件
    onChange: ()=>{},
  },
  data: {
    scroll: false,
    w: 0,
    nw: 0,
    transform: 'translate(-100%,0)',
  },
  didMount(){
    this.init();
  },
  methods: {

    /* 初始化 */
    init(){
      /* 数量 */
      let t = this.props.list.length;
      let n = t;
      if(t>this.props.num){
        n = this.props.num;
        this.setData({ scroll:true });
      }
      /* 等分宽度 */
      this.setData({ w:100/n });
      this.setData({ nw:t*this.data.w+'%' });
      /* 底边 */
      this.moveLine(this.props.active);
    },

    /* 切换菜单 */
    tabClick(e){
      const k = e.target.dataset.k;
      const v = e.target.dataset.v;
      this.moveLine(k);
      this.setData({active:k});
      this.props.onChange([k,v]);
    },

    /* 动画 */
    moveLine(n){
      this.setData({ transform:'translate('+n*100+'%,0)' });
    },
    
  }
})
