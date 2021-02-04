import { defineComponent } from 'vue';
import { useStore } from 'vuex';
/* JS组件 */
/* UI组件 */

export default defineComponent({
  name: 'Home',
  components: {},
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
