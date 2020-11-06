
Component({
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  properties: {
    show: {type: Boolean, value: false},
    opacity: {type: Number, value: 0.7},
    bgClose: {type: Boolean, value: true},
    position: {type: String, value: ''},
    bgColor: {type: String, value: ''},
  },
  data: {
    _show: false,
    refBg: {},  //背景
    refBody: {},  //容器
    style: {bg:'',body:''}, //样式
  },
  observers: {
    show(val){
      this.showBG(val);
      if(val) this.setData({_show: true});
      else{setTimeout(()=>{ this.setData({_show: false}); },1000)}
    },
  },
  attached(){
    // 背景
    this.setData({
      ['refBg.background-color']:'rgba(0,0,0,'+this.data.opacity+')',
      ['refBody.background-color']:this.data.bgColor,
    });
    // 容器
    if(this.data.position=='left'){
      this.setData({
        ['refBody.height']:'100%',
        ['refBody.left']:0,
        ['refBody.top']:0,
        ['refBody.opacity']:1,
        ['refBody.transform']:'translate(-110%,0)',
      });
    }else if(this.data.position=='right'){
      this.setData({
        ['refBody.height']:'100%',
        ['refBody.right']:0,
        ['refBody.top']:0,
        ['refBody.opacity']:1,
        ['refBody.transform']:'translate(110%,0)',
      });
    }else if(this.data.position=='top'){
      this.setData({
        ['refBody.width']:'100%',
        ['refBody.left']:0,
        ['refBody.top']:0,
        ['refBody.opacity']:1,
        ['refBody.transform']:'translate(0,-110%)',
      });
    }else if(this.data.position=='bottom'){
      this.setData({
        ['refBody.width']:'100%',
        ['refBody.left']:0,
        ['refBody.bottom']:0,
        ['refBody.opacity']:1,
        ['refBody.transform']:'translate(0,110%)',
      });
    }else{
      this.setData({
        ['refBody.left']:'50%',
        ['refBody.bottom']:'30%',
        ['refBody.opacity']:0,
        ['refBody.transform']:'translate(-50%,-50%)',
      });
    }
    // 更新样式
    this.setStyle('bg',this.data.refBg);
    this.setStyle('body',this.data.refBody);
  },
  methods: {

    /* 动画 */
    showBG(_show){
      setTimeout(()=>{
        // 背景
        this.setData({ ['refBg.opacity']:_show?1:0, });
        // 位置
        if(this.data.position=='left'){
          this.setData({ ['refBody.transform']:_show?'translate(-1px,0)':'translate(-110%,0)' });
        }else if(this.data.position=='right'){
          this.setData({ ['refBody.transform']:_show?'translate(1px,0)':'translate(110%,0)' });
        }else if(this.data.position=='top'){
          this.setData({ ['refBody.transform']:_show?'translate(0,-1px)':'translate(0,-110%)' });
        }else if(this.data.position=='bottom'){
          this.setData({ ['refBody.transform']:_show?'translate(0,1px)':'translate(0,110%)' });
        }else{
          this.setData({
            ['refBody.opacity']:_show?1:0,
            ['refBody.top']:_show?'50%':'30%',
          });
        }
        // 更新样式
        this.setStyle('bg',this.data.refBg);
        this.setStyle('body',this.data.refBody);
        // 当前状态
        setTimeout(()=>{ this.triggerEvent('_show',_show); },300);
      },300);
    },

    /* 点击背景 */
    clickBG(){
      if(this.data.bgClose) this.close();
    },

    /* 关闭 */
    close(){
      this.showBG(false);
      setTimeout(()=>{ this.setData({ _show:false }); },600);
    },

    /* Array to Style */
    setStyle(name,val){
      let str = '';
      for(let k in val) str += `${k}:${val[k]}; `;
      this.setData({ [`style.${name}`]:str });
    },
    
  }
})
