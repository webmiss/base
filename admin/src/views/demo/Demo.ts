import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import Env from '@/env'

export default defineComponent({
  components: {},
  data(){
    // 状态
    const store: any = useStore();
    const state: any = store.state;
    return {state}
  },
  computed:{
  },
  mounted(){
  },
  beforeUnmount(){
    // 页面销毁
  },
  methods:{

  }
});