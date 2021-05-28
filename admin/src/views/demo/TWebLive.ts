import { defineComponent } from 'vue';
import { useStore } from 'vuex';
/* JS组件 */
import Storage from '@/library/Storage'
import Toast from '@/library/ui/toast'
import Post from '@/library/request/post'
import HtmlLoad from '@/library/html/load'
/* UI组件 */
import wmMain from '@/components/main/index.vue'
import wmTable from '@/components/table/index.vue'
import wmTableTitle from '@/components/table/title/index.vue'
import wmTableTr from '@/components/table/tr/index.vue'
import wmButton from '@/components/form/button/index.vue'
import wmDialog from '@/components/dialog/index.vue'
import wmRow from '@/components/main/row/index.vue'

export default defineComponent({
  components: {
    wmMain,wmTable,wmTableTitle,wmTableTr,wmButton,wmDialog,wmRow
  },
  data(){
    // 状态
    const store: any = useStore();
    const state: any = store.state;
    // 分页
    const page: any = {list:[], page:1, limit:10, total:0};
    // 用户信息
    const uinfo: any = {};
    // 直播间
    const room: any = {show: false, title: '', id: '', role: ''};
    // 推流
    let pusher: any = null;
    // 拉流
    let player: any = null;
    // 即时通信
    let im: any = null;
    return {state, page, uinfo, room, pusher, player, im}
  },
  mounted(){
    // 加载数据
    if(Storage.getItem('token')) this.loadData();
  },
  beforeUnmount(){
    // 页面销毁
    this.pusher = null;
  },
  methods:{

    /* 加载数据 */
    loadData(){
      // 直播组件
      HtmlLoad(['/tweblive/trtc.js', '/tweblive/tim-js.js']);
      setTimeout(()=>{
        HtmlLoad(['/tweblive/tweblive.js']);
      },600);
      // 测试数据
      this.page.list = [
        {id: '1', name: 'xxx直播'},
        {id: '2', name: 'xxx直播'},
      ];
      // 用户信息
      Post('/demo/tweblive/userInfo',{
        token: Storage.getItem('token'),
      },(res: any)=>{
        const d = res.data;
        if(d.code!=0) return Toast(d.msg);
        this.uinfo = d.uinfo;
      });
    },

    /* 进入房间 */
    RoomJoin(roomid: string, role: string) {
      const self = this;
      this.room.show = true;
      this.room.id = roomid;
      this.room.role = role;
      const uid: string = this.state.uInfo.uid;
      /* 即时通信 */
      if(!this.im){
        // @ts-ignore
        this.im = TWebLive.createIM({ SDKAppID: this.uinfo.sdk_app_id });
        this.im.createRoom({name: 'xxx直播间', roomID: roomid}).then((res: any) => {
          console.log(res);
        });

        
        // @ts-ignore
        // this.im.on(TWebLive.EVENT.IM_TEXT_MESSAGE_RECEIVED, (event: any) => {
        //   event.data.forEach((message: any) => {
        //     console.log((message.from || message.nick) + ' : ', message.payload.text);
        //   });
        // });
        // @ts-ignore
        // this.im.on(TWebLive.EVENT.IM_READY, (event: any) => {
        //   this.im.sendTextMessage({ roomID: roomid, text: 'hello from TWebLive' });
        // });
        
      }
      // 类型
      if(role=='anchor'){
        this.room.title = '主播ID: '+uid;
        if(!this.pusher){
          // @ts-ignore
          this.pusher = TWebLive.createPusher({ userID: uid });
          // 显示视频
          this.pusher.setRenderView({
            elementID: 'playerView',
            audio: true,
            video: {
              width: 480, height: 280, frameRate: 10, bitrate: 400
            },
          }).then(() => {
            console.log('视频流: 创建成功!');
          }).catch((error: any) => {
            console.log('视频流:', error);
          });
        }
      // 观众
      } else {
        this.room.title = '观众ID: '+uid;
        if(!this.player){
          // @ts-ignore
          this.player = TWebLive.createPlayer();
          this.player.setRenderView({ elementID: 'playerView' });
          const roomID = this.room.id;
          const SDKAppID = this.uinfo.sdk_app_id;
          const userID = this.uinfo.user_id;
          const userSig = this.uinfo.user_sig;
          let url = `room://sdkappid=${SDKAppID}&roomid=${roomID}&userid=${userID}&usersig=${userSig}`;
          this.player.startPlay(url).then(() => {
            console.log('远程拉流: 成功!');
          }).catch((error: any) => {
            console.log('远程拉流:', error);
          });
        }
      }
      
    },

    /* 开始推流 */
    pusherPush() {
      if(this.room.role != 'anchor') return Toast('只有主播才能推流!');
      // 推流
      const roomID = this.room.id;
      const streamID = 'stream_'+this.room.id;
      const SDKAppID = this.uinfo.sdk_app_id;
      const userID = this.uinfo.user_id;
      const userSig = this.uinfo.user_sig;
      const liveDomainName = this.uinfo.live_domain_name;
      let url = `room://sdkappid=${SDKAppID}&roomid=${roomID}&userid=${userID}&usersig=${userSig}&livedomainname=${liveDomainName}&streamid=${streamID}`;
      this.pusher.startPush(url).then(() => {
        console.log('远程推流: 成功!');
      }).catch((error: any) => {
        console.log('远程推流:', error);
      });
    },

    /* 停止-推流&拉流 */
    pusherClose(val: boolean) {
      this.room.show = val;
      if(val) return ;
      // 主播
      if(this.room.role=='anchor'){
        this.pusher.stopPush().then(() => {
          this.pusher.stopCamera(); //关闭摄像头
          this.pusher.stopMicrophone(); //关闭麦克风
          console.log('停止推流: 成功!');
        }).catch((error: any) => {
          console.log('停止推流:', error);
        });
      } else {
        // this.player.stopPlay().then(() => {
        //   console.log('停止播放: 成功!');
        // }).catch((error: any) => {
        //   console.log('停止播放:', error);
        // });
      }
    }

  }
});