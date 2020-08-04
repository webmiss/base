/* 获取DOM信息 */
export default (self,dom,callback)=>{
  wx.createSelectorQuery().in(self).select(dom).boundingClientRect().exec((res)=>{
    return callback(res);
  });
}