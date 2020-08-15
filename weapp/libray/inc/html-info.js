/* 获取DOM信息 */
export default (self,dom,callback)=>{
  const query = wx.createSelectorQuery();
  query.in(self);
  query.select(dom).boundingClientRect();
  query.selectViewport().scrollOffset();
  query.exec((res)=>{
    return callback(res);
  });
}