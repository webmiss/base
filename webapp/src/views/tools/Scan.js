import PageView from '@/components/page-view'

export default {
  components: {PageView},
  data(){
    return {
      info: '调用摄像头',
    }
  },
  mounted(){
  },
  activated(){
    // 扫码
    setTimeout(()=>{this.getScan();},600);
  },
  methods:{

    /* 返回 */
    goBack(){
      if(this.$obj.scan) this.$obj.scan.close();
      this.$router.goBack(-1);
    },

    /* 扫二维码 */
    getScan(){
      try{
        // 创建
        this.$obj.scan = new plus.barcode.Barcode('code');
        // 结果
        this.$obj.scan.onmarked = (type,result)=>{
          console.log(type,result);
        }
        // 打开
        this.$obj.scan.start();
      }catch(e){
        this.info = '请下载APP应用';
      }
    },

  }
}
