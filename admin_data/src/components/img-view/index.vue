<template>
  <div v-if="show" class="imgview_bg" :style="{backgroundColor: 'rgba(0,0,0,'+opacity+')'}">
    <div class="imgview_close" @click="close()"><i class="el-icon-close"></i></div>
    <img class="verticalCenter" :src="img" />
  </div>
</template>

<style scoped>
.imgview_bg{position: fixed; z-index: 1000; width: 100%; height: 100%; top: 0; left: 0;}
.imgview_close{position: absolute; z-index: 11; border-radius: 50%; cursor: pointer; font-size: 28px; color: #FFF; text-align: center; width: 48px; height: 48px; line-height: 48px; top: 10px; right: 10px;}
.imgview_close:hover{color: #FF6600;}
.imgview_left{}
</style>

<script>
import Inc from '@/library/Inc'
export default {
  name:'ImageView',
  model: {
    prop: "show",
    event: 'show',
  },
  props: {
    show: {type: Boolean, default: false},
    opacity: {type: Number, default: 0.85},
  },
  data(){
    return {
      index: 0,
      imgs: [],
      img: '',
    }
  },
  mounted(){
  },
  methods:{

    /* 打开图片 */
    open(imgs,index){
      this.index = index || 0;
      this.imgs = imgs || [];
      this.img = this.imgs[this.index];
    },

    /* 关闭 */
    close(){
      this.$emit('show',false);
    },

    /* 动作菜单 */
    getAction(url){
      Inc.post('Usermain/getMenusAction',{token:Inc.storage.getItem('token'),url:url},(res)=>{
        const d = res.data;
        if(d.code==0) this.actions = d.menuAction;
      });
    },

    /* 触发事件 */
    openAction(action){
      this.$emit('action',action);
    }

  }
}
</script>
