import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import Env from '@/env'
/* JS组件 */
import Storage from '@/library/ui/storage'
/* UI组件 */
import wmMain from '@/components/main/index.vue'
/* ElementUI */
import { ElButton } from 'element-plus';
import '@/assets/themes/button.css'

export default defineComponent({
  components: {wmMain,ElButton},
  data(){
    // 状态
    const store: any = useStore();
    const state: any = store.state;
    return {state}
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
    // 加载数据
    if(Storage.getItem('token')) this.loadData();
  },
  beforeUnmount(){
    // 页面销毁
  },
  methods:{

    /* 加载数据 */
    loadData(){

    },

  }
});