Component({
  options: {
    multipleSlots: true,
    addGlobalClass: true,
  },
  properties: {
    active: {type: Number, value: 0},
  },
  attached(){
  },
  data: {
  },
  methods: {

    /* 切换菜单 */
    navClick(e){
      const n = e.currentTarget.dataset.n;
      this.setData({active:n});
      // 返回值
      this.triggerEvent('change',n);
    },

  }
})
