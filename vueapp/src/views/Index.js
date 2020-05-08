import Vue from 'vue'
import Inc from '@/library/Inc'
import Plus from '@/library/Plus'
// Scroll
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
BScroll.use(Pullup);

/* 组件 */
import PageView from '@/components/page-view'
import Tabbar from '@/components/tabbar'
Vue.component('page-view',PageView);
Vue.component('wm-tabbar',Tabbar);

// UI
import { SwipeCell } from 'vant';
import 'vant/lib/swipe-cell/style'
Vue.use(SwipeCell);

// import { Toast,Dialog,ActionSheet } from 'vant'
// import 'vant/lib/toast/style'
// import 'vant/lib/dialog/style'
// import 'vant/lib/action-sheet/style'
// Vue.use(Toast).use(Dialog).use(Dialog).use(ActionSheet);

// import { Swipe,SwipeItem } from 'vant'
// import 'vant/lib/swipe/style'
// import 'vant/lib/swipe-item/style'
// Vue.use(Swipe).use(SwipeItem);

// import { Icon,ImagePreview } from 'vant'
// import 'vant/lib/image-preview/style'
// Vue.use(Icon).use(ImagePreview);

export default {
  data(){
    return {
      navColor: 0,
      // 底部导航
      tabBar: {active: 0,},
      // 首页、商城、购物车、我的
      indexData:{scroll: null,},
      msgData:{scroll: null,},
      meData:{scroll: null,},
      // 轮播图片
      imgUrls: [
        'https://goss.veer.com/creative/vcg/veer/800water/veer-150270653.jpg',
        'https://goss.veer.com/creative/vcg/veer/800water/veer-300200262.jpg',
        'https://goss.veer.com/creative/vcg/veer/800water/veer-162551332.jpg',
      ],
      // 支付方式
      payData: {
        show: false,
        actions: [{type: 'wxpay', name: '微信支付'},{type: 'alipay', name: '支付宝'}],
      },
    }
  },
  computed:{
    mode(){ return this.$store.state.mode; },
  },
  mounted(){
    // setTimeout(()=>{
    //   this.$store.state.mode='dark';
    // },3000);
  },
  activated(){
  },
  methods:{

    /* 切换导航 */
    navTab(index){
      if(index==0){
      }else if(index==1){
      }else if(index==2){
        this.meLoad();
      }
    },

    /* 打开路由 */
    openUrl(url,login){
      login = login || false;
      if(login && !this.$store.state.isLogin) return this.$router.push('/user/login');
      else return this.$router.push(url);
    },

    /* 我的 */
    meLoad(){
      this.meScroll();
    },
    meScroll(){
      setTimeout(()=>{
        /* 滑动 */
        if(this.meData.scroll) this.meData.scroll.refresh();
        else this.meData.scroll = new BScroll(this.$refs.me,{click:true,pullUpLoad:true});
        this.meData.scroll.on('scroll',(res) =>{
          let top = -res.y;
          let n = 0;
          if(top<10) n=0;
          else if(top>200) n=1;
          else n = top/100/2;
          this.navColor = n;
        });
        /* 首页-下拉刷新、上拉加载 */
        this.meData.scroll.on('touchEnd',(res) =>{
          if(res.y>30){
            console.log('下拉');
          }else if(res.y<(this.meData.scroll.maxScrollY - 30)){
            console.log('加载');
          }
        });
      },300);
    },

    /* 定位 */
    getCity(){
      Toast.loading({message: '正在获取定位',forbidClick: true});
      Plus.geoLocation((res)=>{
        Toast.clear();
        Dialog.alert({title: '定位成功',message: JSON.stringify(res)});
      });
    },

    /* 附近地址 */
    getAddress(){
      Toast.loading({message: '志远大厦',forbidClick: true});
      Plus.getAddress('志远大厦',(res)=>{
        Toast.clear();
        Dialog.alert({title: '志远大厦',message: JSON.stringify(res)});
      });
    },

    /* 请求 */
    getPost(){
      Toast.loading({message: 'POST请求',forbidClick: true});
      this.$ajax.post(this.$config.baseUrl+'xxx').then((res)=>{
        Toast.clear();
        Dialog.alert({title: 'POST请求',message: JSON.stringify(res.data)});
      });
    },

    /* 本地存储 */
    getStorage(){
      Inc.storage.setItem('test','测试存储数据');
      let test = Inc.storage.getItem('test');
      Dialog.alert({title: '本地存储',message: test});
    },

    /* 图片裁切 */
    compressImage(){
      Plus.photo((obj)=>{
        Plus.readerCompress(obj[0],{width:200, height: 200},(base64)=>{
          ImagePreview([base64]);
        });
      });
    },

    /* 二维码 */
    getQRcode(){
      this.$qrcode.toDataURL('https://webmis.vip',{width:120,margin:2}).then((base64)=>{
        ImagePreview([base64]);
      });
    },

    /* 支付 */
    getPay(item){
      this.payData.show = false;
      Toast.loading({message: item.name,forbidClick: true});
      if(item.type=='wxpay'){
        Plus.pay(item.type,this.$config.apiUrl+'index/wechatPay',{order_sn:123},(res)=>{
          console.log(JSON.stringify(res));
        },(e)=>{
          console.log(JSON.stringify(e));
        });
      }else if(item.type=='alipay'){
        Plus.pay(item.type,this.$config.apiUrl+'index/alipay',{order_sn:123},(res)=>{
          console.log(JSON.stringify(res));
        },(e)=>{
          console.log(JSON.stringify(e));
        });
      }
    },

  }
}