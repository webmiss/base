import store from '../../store'
import create from '../../libray/store/create'

const app = getApp();

create(store,{
  data:{
    isLogin: null,
    uInfo: null,
  },
  /* 分享 */
  onShareAppMessage(res){
    console.log(res);
    return {title:'',path:'',imageUrl:''};
  },
  /* 加载 */
  onLoad(e){
  },

  /* 返回 */
  goBack(){
    wx.navigateBack({data:1});
  },

});