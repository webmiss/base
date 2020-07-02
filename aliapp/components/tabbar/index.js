import Env from '../../env'

Component({
  mixins: [],
  props: {
    active: 0,
    onChange: null,
  },
  data: {
  },
  /* 初始化 */
  didMount(){},
  methods: {

    /* 切换菜单 */
    navClick(e){
      const n = e.currentTarget.dataset.n;
      this.setData({active:n});
      // 返回值
      this.props.onChange(n);
    },

  },
});
