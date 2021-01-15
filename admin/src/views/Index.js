/* UI组件 */
import wmMain from '@/components/main'
/* ElementUI */
import { ElButton } from 'element-plus';
import '@/assets/themes/button.css'

export default {
  components: {wmMain,ElButton},
  data(){
    return {
      store: this.$store.state,
    }
  },
  activated(){
    // 动作菜单-获取
    this.store.action.url = '';
    this.store.action.menus = '';
  },
  mounted(){
  },
  methods:{

  }
}