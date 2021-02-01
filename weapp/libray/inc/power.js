/* 消息订阅授权 */
export default (tmplIds) => {
  wx.getSetting({
    withSubscriptions: true,
    success(res) {
      if (!res.subscriptionsSetting.mainSwitch) {
        wx.requestSubscribeMessage({
          tmplIds: tmplIds,
          success(res) {
            console.log('授权成功');
          },
          fail(res) {
            console.log('授权失败');
          }
        })
      }
    }
  })
}