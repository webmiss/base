import Post from './request-post'
import Storage from './storage'
import store from '../../store'

/* 重置用户信息 */
let cTime = null;
export default (self) => {
  clearTimeout(cTime);
  cTime = setTimeout(() => {
    Post('user/token', { token: Storage.getItem('token'), uinfo: 1 }, (res) => {
      const d = res.data;
      if (d.code == 0) {
        if (d.uinfo) store.data.uInfo = d.uinfo;
        self.update();
      }
    });
  }, 1000);
}