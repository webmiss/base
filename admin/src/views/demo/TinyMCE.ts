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
    const tinymce: any = {init:{}, content: ''};
    return {state, tinymce}
  },
  mounted(){
  },
  beforeUnmount(){
    // 页面销毁
  },
  methods:{

    /* 获取内容 */
    getContent(){
      const obj: any = this.$refs.TinyMCE;
      let ct = obj.getContent();
      console.log(ct);
    },

  }
});