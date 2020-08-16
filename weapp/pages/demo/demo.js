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
  onShareAppMessage(res){
    return {title:'',path:'',imageUrl:''};
  },
  /* 加载 */
  onLoad(e){
  },

  /* 返回 */
  back(e){
    let name = e.currentTarget.dataset.swipe || e.detail;
    if(name=='left') return Back(1);
  },

  /* 滑动 */
  scroll(e){
    // console.log(e.detail);
  },

});