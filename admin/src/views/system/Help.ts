import { defineComponent } from 'vue';
import { useStore } from 'vuex';
/* JS组件 */
import NavigateTo from '@/library/ui/navigate-to'
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
  mounted(){
  },
  methods:{

    /* 打开URL */
    openUrl(url: string) {
      NavigateTo(url);
    },

  }
});