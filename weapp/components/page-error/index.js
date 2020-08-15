
Component({
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  properties: {
    loading: {type: Boolean, value: true},
    title: {type: String, value: ''},
    text: {type: String, value: ''},
    icon: {type: String, value: 'ui ui_loading'},
    iconColor: {type: String, value: '#CCC'},
    button: {type: Boolean, value: true},
    buttonText: {type: String, value: '刷新'},
    butColor: {type: String, value: '#6FB737'},
    buttonBg: {type: String, value: '#FFF'},
    bgColor: {type: String, value: '#F2F4F6'},
  },
  data: {
  },
  attached(){
  },
  methods: {
    
    /* 提交 */
    sub(){
      this.triggerEvent('change');
    }
    
  }
})
