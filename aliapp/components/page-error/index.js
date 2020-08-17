
Component({
  mixins: [],
  props: {
    loading: true,
    title: '',
    text: '',
    icon: 'ui ui_loading',
    iconColor: '#CCC',
    button: true,
    buttonText: '刷新',
    butColor: '#6FB737',
    buttonBg: '#FFF',
    bgColor: '#F2F4F6',
    // 事件
    onChange: ()=>{},
  },
  data: {
  },
  didMount(){
  },
  methods: {
    
    /* 提交 */
    sub(){
      this.props.onChange();
    }
    
  }
})
