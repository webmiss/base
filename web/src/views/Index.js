import Inc from '@/library/Inc'
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'

export default {
  data(){
    return {
    }
  },
  mounted(){
    // Swiper
    new Swiper('.in_slide_ct', {
      effect:'cube',
      lazy: true,
      // 速度
      speed:1000,
      // 禁止滑动
      noSwiping : true,
      noSwipingClass : 'in_slide_right',
      // 分页
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      // 左右菜单
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    // Code刷新
    Inc.load(['/prism/prism.css','/prism/prism.js'],true);
  },
  methods:{
  }
}