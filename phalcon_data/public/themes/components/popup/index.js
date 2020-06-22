const template = `
<div v-show="show">
  <div ref="PopupBG" class="popup_bg" :style="{backgroundColor:'rgba(0,0,0,'+opacity+')'}" @click="clickBG()"></div>
  <div ref="PopupBody" class="popup_body"><slot></slot></div>
</div>
`;
export default {
  template: template,
  name:'PopUp',
  model: {
    prop: "show",
    event: 'show',
  },
  props: {
    show: {type: Boolean, default: false},
    opacity: {type: Number, default: 0.8},
    bgClose: {type: Boolean, default: true},
  },
  data(){
    return {
    }
  },
  watch:{
    show(val){
      if(val) this.showBG(true);
    },
  },
  mounted(){
  },
  methods:{

    /* 动画 */
    showBG(show){
      setTimeout(()=>{
        let bg = this.$refs.PopupBG || '';
        let body = this.$refs.PopupBody || '';
        if(!bg || !body) return false;
        if(show){
          bg.style.opacity = 1;
          body.style.opacity = 1;
          body.style.top = '50%';
        }else{
          bg.style.opacity = 0;
          body.style.opacity = 0;
          body.style.top = '30%'
        }
        setTimeout(()=>{
          this.$emit('show',show);
        },200);
      },200);
    },

    /* 点击背景 */
    clickBG(){
      if(this.bgClose) this.showBG(false);
    },

  }
}
