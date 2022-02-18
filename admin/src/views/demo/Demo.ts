import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import Env from '@/env'
/* JS组件 */
import Storage from '@/library/Storage'
/* UI组件 */
import wmMain from '@/components/main/index.vue'

export default defineComponent({
  components: {wmMain},
  data(){
    // 状态
    const store: any = useStore();
    const state: any = store.state;
    return {state}
  },
  computed: {
  },
  watch:{
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