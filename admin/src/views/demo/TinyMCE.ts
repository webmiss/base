import { defineComponent } from 'vue';
import { useStore } from 'vuex';
/* UI组件 */
import wmMain from '@/components/main/index.vue'
import wmTinymce from '@/components/tinymce/index.vue'
import wmButton from '@/components/form/button/index.vue'

export default defineComponent({
  components: {wmMain,wmTinymce, wmButton},
  data(){
    // 状态
    const store: any = useStore();
    const state: any = store.state;
    const tinymce: any = {init:{}, content: '', content1: ''};
    return {state, tinymce}
  },
  computed: {
    // 动作菜单-监听
    actionType(){
      const active: any = this.state.action.active;
      return active;
    }
  },
  watch:{
    // 动作菜单-点击
    actionType(val){
      if(!val) return false;
      console.log(val);
    }
  },
  mounted(){
  },
  beforeUnmount(){
    // 页面销毁
  },
  methods:{

    /* 获取内容 */
    getContent(){
      console.log(this.tinymce.content);
    },

  }
});