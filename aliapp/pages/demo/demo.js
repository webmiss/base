import store from '../../store'
import create from '../../libray/store/create'
import {Back} from '../../libray/ui/index'

create(store,{
  data:{
    isLogin: null,
    uInfo: null,
    lists:[0,1,2,3,4,5,6,7,8,9],
  },
  /* 分享 */
  onShareAppMessage(){
    return {title: '',desc: '',path: 'pages/index/index',};
  },
  /* 加载 */
  onLoad(e){
    // 隐藏返回按钮
    my.setBackButton({color: '#FFFFFF'});
  },

  /* 返回 */
  back(e){
    if(e=='left') Back(1);
  },

});