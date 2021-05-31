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
import wmDialog from '@/components/dialog/index.vue'
import wmInput from '@/components/form/input/index.vue'
import wmButton from '@/components/form/button/index.vue'

export default defineComponent({
  components: {
    wmMain,wmTable,wmTableTitle,wmTableTr,wmDialog,wmInput,wmButton
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
    // 表单
    const form: any = {login: false, content: '', isScroll: true, lists: []};
    const tools: any = {camera: true, microphone: true, push: false};
    return {state, page, uinfo, room, pusher, player, tim, im, form, tools}
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

      // 主播
      if(role=='anchor' && !this.pusher){
        // @ts-ignore
        this.pusher = TWebLive.createPusher({ userID: uid, useStringRoomId: true });
        this.pusher.setLogLevel(4);
      }
      if(role=='anchor'){
        this.setCamera(true);
        this.setMicrophone(true);
      }
      // @ts-ignore 观众
      if(role!='anchor' && !this.player){
        // @ts-ignore
        this.player = TWebLive.createPlayer();
        this.player.setLogLevel(4);
      }
      // 预览视频
      this.renderView();

      /* 即时通信 */
      if(!this.tim){
        // @ts-ignore
        this.tim = TIM.create({ SDKAppID: this.uinfo.sdk_app_id });
        this.tim.setLogLevel(4);
        // @ts-ignore 监听登录
        this.tim.on(TIM.EVENT.SDK_READY, ()=>{
          this.form.login = true;
        });
        // @ts-ignore 监听消息
        this.tim.on(TIM.EVENT.MESSAGE_RECEIVED, this.roomMassage);
      }
      // 加入直播群
      this.roomJoin();
    },

    /* 直播群-加入 */
    roomJoin() {
      // @ts-ignore
      this.tim.joinGroup({groupID: this.room.groupid, type: TIM.TYPES.GRP_AVCHATROOM}).then((res: any) => {
        const status = res.data.status
        console.log('[直播群] 加入:', status, this.room.groupid);
      }).catch((err: any) => {
        console.log('[直播群] 加入:', '失败!');
      });
    },

    /* 直播群-登录 */
    roomLogin() {
      const userID = this.uinfo.user_id;
      const userSig = this.uinfo.user_sig;
      this.tim.login({userID: userID, userSig: userSig}).then(()=>{
        console.log('[登录]:', userID, userSig);
        // 退出后加入
        this.tim.quitGroup(this.room.groupid).then((res: any) => {
          console.log('[直播群] 退出:', '成功');
          this.roomJoin();
        });
      }).catch((err: any)=>{
        console.log('[登录]:', err);
      });
    },

    /* 直播群-消息 */
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
    msgText(d: any) {
      console.log('消息-文本:', d);
      // 追加消息
      this.msgPush({uid: d.from, text: d.payload.text});
    },
    /* 消息-自定义 */
    msgCustom(d: any) {
      console.log('消息-自定义:', d);
    },
    /* 消息-进群&退群 */
    msgGroupTip(d: any) {
      console.log('消息-进群&退群:', d);
    },
    /* 消息-系统通知 */
    msgSystemNotice(d: any) {
      console.log('消息-系统通知:', d);
    },

    /* 点击发送 */
    SendSub() {
      const content = this.form.content;
      this.sendMsg({text: content});
    },

    /* 直播群-发送消息 */
    sendMsg(payload: object) {
      // 消息
      let message = this.tim.createTextMessage({
        to: this.room.groupid,
        // @ts-ignore
        conversationType: TIM.TYPES.CONV_GROUP,
        // @ts-ignore
        priority: TIM.TYPES.MSG_PRIORITY_NORMAL,
        payload: payload
      });
      // 发送
      this.tim.sendMessage(message).then((res: any)=>{
        console.log('[发送消息]:', res);
        const d = res.data.message;
        // 追加消息
        this.msgPush({uid: this.uinfo.user_id, text: d.payload.text});
        // 清空内容
        this.form.content = '';
      }).catch((err: any)=>{
        console.log('[发送消息]:', err);
      });
    },

    /* 直播群-监听 */
    onScroll(res: any) {
      const scrollTop = res.target.scrollTop;
      const msgBox: any = this.$refs.MsgBox;
      const msgObj: any = this.$refs.MsgList;
      console.log(scrollTop, msgObj.clientHeight, msgObj.scrollHeight);
      console.log(msgObj.clientHeight - msgBox.clientHeight - scrollTop);
    },

    /* 直播群-追加信息 */
    msgPush(data: object) {
      this.form.lists.push(data);
      // 触底
      if(this.form.isScroll){
        const msgObj: any = this.$refs.MsgList;
        console.log(msgObj.scrollTop, msgObj.scrollHeight);
        msgObj.scrollTop = msgObj.scrollHeight;
      }
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
          console.log('[本地流]:', '成功');
        }).catch((error: any) => {
          console.log('[本地流]:', error);
        });
      }else{
        this.player.setRenderView({ elementID: 'playerView' });
        const roomID = this.room.id;
        const SDKAppID = this.uinfo.sdk_app_id;
        const userID = this.uinfo.user_id;
        const userSig = this.uinfo.user_sig;
        let url = `room://sdkappid=${SDKAppID}&roomid=${roomID}&userid=${userID}&usersig=${userSig}`;
        this.player.startPlay(url).then(() => {
          console.log('[远程流]:', '成功');
        }).catch((error: any) => {
          console.log('[远程流]:', error);
        });
      }
    },

    /* 点击关闭 */
    clickClose(val: boolean) {
      this.room.show = val;
      if(val) return ;
      // 主播
      if(this.room.role=='anchor'){
        if(this.tools.camera) this.setCamera(false);
        if(this.tools.setMicrophone) this.setMicrophone(false);
        if(this.tools.push) this.setPush(false);
      } else {
        // 观众
        this.player.stopPlay();
      }
    },

    /* 摄像头 */
    setCamera(val: boolean) {
      this.tools.camera = val;
      if(val){
        console.log('[摄像头]:', '打开');
        this.pusher.startCamera();
      } else {
        console.log('[摄像头]:', '关闭');
        this.pusher.stopCamera();
      }
    },
    /* 麦克风 */
    setMicrophone(val: boolean) {
      this.tools.microphone = val;
      if(val){
        console.log('[麦克风]:', '打开');
        this.pusher.startMicrophone();
      } else {
        console.log('[麦克风]:', '关闭');
        this.pusher.stopMicrophone();
      }
    },
    /* 推流 */
    setPush(val: boolean) {
      if(this.room.role != 'anchor') return Toast('只有主播才能推流!');
      this.tools.push = val;
      if(val) {
        // 推流
        const roomID = this.room.id;
        const streamID = 'stream_'+this.room.id;
        const SDKAppID = this.uinfo.sdk_app_id;
        const userID = this.uinfo.user_id;
        const userSig = this.uinfo.user_sig;
        const liveDomainName = this.uinfo.live_domain_name;
        let url = `room://sdkappid=${SDKAppID}&roomid=${roomID}&userid=${userID}&usersig=${userSig}&livedomainname=${liveDomainName}&streamid=${streamID}`;
        this.pusher.startPush(url).then(() => {
          console.log('[推流]:', '成功');
        }).catch((error: any) => {
          console.log('[推流]:', error);
        });
      } else {
        this.pusher.stopPush().then(() => {
          console.log('[停止推流]:', '成功');
        }).catch((error: any) => {
          console.log('[停止推流]:', error);
        });
      }
    },

  }
});