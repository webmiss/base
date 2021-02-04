import { defineComponent } from 'vue';
import { useStore } from 'vuex';
export default defineComponent({
  name: 'HomeIndex',
  data(){
    // 状态
    const store: any = useStore();
    const state: any = store.state;
    return {state};
  },
  computed:{
    // @ts-ignore 深色模式
    mode(){ return this.state.mode; },
  },
  mounted(){
    // 调试深色模式
    // setTimeout(()=>{ this.state.mode='dark'; },3000);
  },
  methods:{
    
  }
});