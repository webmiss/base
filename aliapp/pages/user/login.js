import store from '../../store'
import create from '../../libray/create'
import Inc from '../../libray/Inc'

create(store,{
  data:{
    isLogin: null,
    uInfo: null,
  },
  /* 分享 */
  onShareAppMessage(){
    return {title: '',desc: '',path: 'pages/index/index',};
  },
  /* 加载 */
  onLoad(e){
  },

  /* 返回 */
  goBack(){
    my.navigateBack({data:1});
  },

});