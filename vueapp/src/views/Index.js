import Vue from 'vue'
import PageView from '@/components/page-view'
import Inc from '@/library/Inc'
import Plus from '@/library/Plus'
// Scroll
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
BScroll.use(Pullup);
// UI
import { Toast,Dialog,ActionSheet } from 'vant'
import 'vant/lib/toast/style'
import 'vant/lib/dialog/style'
import 'vant/lib/action-sheet/style'
Vue.use(Toast).use(Dialog).use(Dialog).use(ActionSheet);

import { Tabbar,TabbarItem,PullRefresh,Swipe,SwipeItem } from 'vant'
import 'vant/lib/tabbar/style'
import 'vant/lib/tabbar-item/style'
import 'vant/lib/pull-refresh/style'
import 'vant/lib/swipe/style'
import 'vant/lib/swipe-item/style'
Vue.use(Tabbar).use(TabbarItem);
Vue.use(PullRefresh);
Vue.use(Swipe).use(SwipeItem);

import { Grid,GridItem,ImagePreview } from 'vant'
import 'vant/lib/grid/style'
import 'vant/lib/grid-item/style'
import 'vant/lib/image-preview/style'
Vue.use(Grid).use(GridItem);
Vue.use(ImagePreview);

export default {
  components: {PageView},
  data(){
    return {
      navColor: 0,
      // 底部导航
      tabBar: {
        active: 0,
        list: [
          {title: '首页', ico: 'icons icon_home', info: ''},
          {title: '商城', ico: 'icons icon_shop', info: ''},
          {title: '购物车', ico: 'icons icon_cart', info: 2},
          {title: '我的', ico: 'icons icon_me', info: ''},
        ],
      },
      // 首页、商城、购物车、我的
      indexData:{scroll: null,isLoading: false},
      shopData:{scroll: null,isLoading: false},
      cartData:{scroll: null,isLoading: false},
      meData:{scroll: null,isLoading: false},
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
  mounted(){

    /* 首页滑动 */
    this.indexData.scroll = new BScroll(this.$refs.index,{click:true,pullUpLoad:true});
    this.indexData.scroll.on('scroll',(res) =>{
      let top = -res.y;
      let n = 0;
      if(top<10) n=0;
      else if(top>200) n=1;
      else n = top/100/2;
      this.navColor = n;
    });
    /* 首页-下拉刷新、上拉加载 */
    this.indexData.scroll.on('touchEnd',(res) =>{
      if(res.y>30){
        console.log('下拉');
        setTimeout(()=>{
          this.indexData.isLoading = false;
          this.indexData.scroll.refresh();
        },1000);
      }else if(res.y<(this.indexData.scroll.maxScrollY - 30)){
        console.log('加载');
      }
    });

  },
  activated(){
    console.log('更新数据');
  },
  methods:{

    /* 切换导航 */
    navTab(index){
      // 滑动效果
      if(index==1){
        if(!this.shopData.scroll){
          setTimeout(()=>{
            this.shopData.scroll = new BScroll(this.$refs.shop,{click:true});
          },300);
        }
      }else if(index==2){
        if(!this.cartData.scroll){
          setTimeout(()=>{
            this.cartData.scroll = new BScroll(this.$refs.cart,{click:true});
          },300);
        }
      }else if(index==3){
        if(!this.meData.scroll){
          setTimeout(()=>{
            this.meData.scroll = new BScroll(this.$refs.me,{click:true});
          },300);
        }
      }
    },

    /* 首页下拉动画 */
    indexRefresh(){
      setTimeout(()=>{
        this.indexData.isLoading = false;
      },3000);
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
      this.$storage.setItem('test','测试存储数据');
      let test = this.$storage.getItem('test');
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