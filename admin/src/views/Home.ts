import { defineComponent } from 'vue';
import { useStore } from 'vuex';
/* JS组件 */
import Base64 from '@/library/inc/base64'
/* UI组件 */
import wmMain from '@/components/main/index.vue'
/* ElementUI */
// import { ElButton } from 'element-plus';
// import '@/assets/themes/button.css'

export default defineComponent({
  name: 'Home',
  components: {wmMain},
  data(){
    // 状态
    const store: any = useStore();
    const state: any = store.state;
    const data: any = [];
    return {state, data};
  },
  mounted(){
    let res = Base64.encode('123456');
    let data = Base64.decode(res);
    let tp = Base64.getType('jpg');
    console.log(res, data, tp);
  },
  activated(){
  },
  methods:{

  }
});
