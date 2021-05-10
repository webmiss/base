import { defineComponent } from 'vue';
import { useStore } from 'vuex';
/* UI组件 */
import wmMain from '@/components/main/index.vue'
import wmTree from '@/components/tree/index.vue'
/* ElementUI */
// import { ElButton } from 'element-plus';
// import '@/assets/themes/button.css'

export default defineComponent({
  name: 'Home',
  components: {wmMain,wmTree},
  data(){
    // 状态
    const store: any = useStore();
    const state: any = store.state;
    const data: any = [];
    return {state, data};
  },
  mounted(){
    this.data = [
      {id: 1, label: '一级 1', checked: false, children: [
        {id: 4, label: '二级 1-1', checked: true, children: [
          {id: 5, label: '三级 1-1-1', checked: false, children: []},
          {id: 6, label: '三级 1-1-2', checked: true, children: []},
        ]},
        {id: 7, label: '二级 1-2', checked: false, children: []},
      ]},
      {id: 2, label: '一级 2', checked: false, children: [
        {id: 8, label: '二级 2-1', checked: false, children: []},
      ]},
      {id: 3, label: '一级 3', checked: false, children: [
        {id: 9, label: '二级 3-1', checked: false, children: []},
      ]},
    ];
  },
  activated(){
    
  },
  methods:{

  }
});
