import { defineComponent } from 'vue';
import { useStore } from 'vuex';
/* UI组件 */
import wmMain from '@/components/main/index.vue'
/* ElementUI */
import { ElButton } from 'element-plus';
import '@/assets/themes/button.css'

export default defineComponent({
  name: 'Home',
  components: {wmMain,ElButton},
  data(){
    // 状态
    const store: any = useStore();
    const state: any = store.state;
    return {state};
  },
  mounted(){
  },
  activated(){
  },
  methods:{

  }
});
