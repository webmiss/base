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
    const room: any = {show: false, title: '', id: '', groupid: '', role: ''};
    // 推流
    let pusher: any = null;
    // 拉流
    let player: any = null;
    // 即时通信
    let tim: any = null;
    let im: any = null;
    return {state, page, uinfo, room, pusher, player, tim, im}
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
      HtmlLoad(['/tweblive/trtc.js']);
      setTimeout(()=>{
        HtmlLoad(['/tweblive/tim-js.js']);
      },300);
      setTimeout(()=>{
        HtmlLoad(['/tweblive/tweblive.js']);
      },600);
      // 测试数据
      this.page.list = [
        {id: '1', group_id: '@TGS#aRHBAOFHK', name: 'xxx直播'},
        {id: '2', group_id: '@TGS#aRHBAOFHK', name: 'xxx直播'},
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
    RoomJoin(role: string, roomid: string, groupid: string) {
      const self = this;
      this.room.show = true;
      this.room.id = roomid;
      this.room.groupid = groupid;
      this.room.role = role;
      const uid: string = this.state.uInfo.uid;
      this.room.title = role=='anchor'?'主播ID: '+uid:'观众ID: '+uid;

      // @ts-ignore 主播
      if(role=='anchor' && !this.pusher) this.pusher = TWebLive.createPusher({ userID: uid, useStringRoomId: true });
      // @ts-ignore 观众
      if(role!='anchor' && !this.player) this.player = TWebLive.createPlayer();
      // 预览视频
      this.renderView();

      /* 即时通信 */
      if(!this.tim){
        // @ts-ignore
        this.tim = TIM.create({ SDKAppID: this.uinfo.sdk_app_id });
        // @ts-ignore 监听登录
        this.tim.on(TIM.EVENT.SDK_READY, this.roomReady);
        // @ts-ignore 监听消息
        this.tim.on(TIM.EVENT.MESSAGE_RECEIVED, this.roomMassage);
      }
      // 加入直播间
      this.roomJoin();
    },

    /* 直播间-加入 */
    roomJoin() {
      // @ts-ignore
      this.tim.joinGroup({groupID: this.room.groupid, type: TIM.TYPES.GRP_AVCHATROOM}).then((res: any) => {
        const status = res.data.status
        console.log('直播间-加入:', status);
        // 主播
        if(this.room.role == 'anchor'){
          // 登录
          // const userID = this.uinfo.user_id;
          // const userSig = this.uinfo.user_sig;
          // this.tim.login({userID: userID, userSig: userSig}).then(()=>{
          //   console.log('主播登录:', userID, userSig);
          // }).catch((err: any)=>{
          //   console.log('主播登录:', err);
          // });
        } else {
          console.log('观众:', '游客身份!');
        }
      }).catch((err: any) => {
        console.log('直播间-加入:', '失败!');
      });
    },

    /* 直播间-登录 */
    roomReady(event: any) {
      // setInterval(()=>{
      //   this.sendMsg();
      // },10000);
    },

    /* 直播间-消息 */
    roomMassage(event: any) {
      const total = event.data.length
      let msg;
      for (let i = 0; i < total; i++) {
        msg = event.data[i];
        switch (msg.type) {
          // @ts-ignore 文本消息
          case TIM.TYPES.MSG_TEXT: this.msgText(msg); break;
          // @ts-ignore 自定义消息
          case TIM.TYPES.MSG_CUSTOM: this.msgCustom(msg); break;
          // @ts-ignore 成员进群&退群
          case TIM.TYPES.MSG_GRP_TIP: this.msgGroupTip(msg); break;
          // @ts-ignore 系统通知
          case TIM.TYPES.MSG_GRP_SYS_NOTICE: this.msgSystemNotice(msg); break;
          default: break;
        }
      }
    },

    /* 消息-文本 */
    msgText(msg: any) {
      console.log('消息-文本:', msg);
    },
    /* 消息-自定义 */
    msgCustom(msg: any) {
      console.log('消息-自定义:', msg);
    },
    /* 消息-进群&退群 */
    msgGroupTip(msg: any) {
      console.log('消息-进群&退群:', msg);
    },
    /* 消息-系统通知 */
    msgSystemNotice(msg: any) {
      console.log('消息-系统通知:', msg);
    },

    /* 直播间-发送消息 */
    sendMsg() {
      // 消息
      let message = this.tim.createTextMessage({
        to: this.room.groupid,
        // @ts-ignore
        conversationType: TIM.TYPES.CONV_GROUP,
        // @ts-ignore
        priority: TIM.TYPES.MSG_PRIORITY_NORMAL,
        payload: {
          text: 'Hello world!'
        }
      });
      // 发送
      this.tim.sendMessage(message).then((res: any)=>{
        console.log('发送消息:', res);
      }).catch((err: any)=>{
        console.log('发送消息:', err);
      });
    },

    /* 预览视频 */
    renderView() {
      if(this.room.role=='anchor'){
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
      }else{
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
        // 观众
        this.player.stopPlay();
      }
    }

  }
});