<template>
  <div id="app">

    <!-- 声音 -->
    <audio id="msg" style="display: none"></audio>
    
    <!-- 更新APP -->
    <div v-if="update.show" class="update_body" :style="{backgroundColor: upDateColor.bg || $config.themeColor}">
      <div class="update_ct">
        <div class="logo" :style="{backgroundColor: upDateColor.logoBg}"><div></div></div>
        <div class="loading" :style="{backgroundImage: 'linear-gradient(to right, '+upDateColor.loading+', '+upDateColor.loading+' '+update.loading+', '+upDateColor.loaded+' '+update.loading+', '+upDateColor.loaded+' 100%)'}"></div>
        <div class="load_msg" v-html="update.msg">正在加载应用</div>
        <div class="load_button">
          <van-button round size="small" v-if="update.down" @click="updateDown()" :style="{color: $config.themeColor}">下载并安装</van-button>
        </div>
      </div>
      <div class="update_logo" :style="{color:upDateColor.copy}"><h1>{{$config.title}}</h1><h2>{{$config.copy}}</h2></div>
    </div>
    <!-- 更新APP End -->

    <!-- 页面 -->
    <transition :name="transitionName">
      <keep-alive :max="keepAlive">
        <router-view class="view" :class="mode=='dark'?'view_dark':''" v-if="$route.meta.keepAlive"></router-view>
        <router-view class="view" :class="mode=='dark'?'view_dark':''" v-if="!$route.meta.keepAlive" :key="'time'+new Date().getTime()"></router-view>
      </keep-alive>
    </transition>
    <!-- 页面 End -->

  </div>
</template>

<style>
*{margin: 0; padding: 0;}
html,body,#app{height: 100%;}
body{font-size: 14px; color: #333;
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
img{vertical-align: top;}
i{font-style: normal;}
/* 公共 */
.html{height: 100%;}
.Link{color: #6FB737;}
.back{display: inline-block; width: 32px; text-align: center;}
.loading{line-height: 100px; color: #999; background-color: #F2F2F2; text-align: center;}
.redNum{position: absolute; padding: 0 5px; margin-top: -5px; line-height: 16px; color: #FFF; font-size: 12px; font-weight: normal; border-radius: 10px; background-color: #FF0000;}
.bgImg{background-size: cover; background-position: center; background-repeat: no-repeat;}
.bgTu{width: 100%; height: 100%; border-radius: 50%;}
.bgLogo{background-image: url(./assets/icon/camera.svg); background-size: 60%;}
.bgImage{background-image: url(./assets/icon/img.svg); background-size: 60%;}
.divCenter{position: absolute; left: 0; right: 0; top: 0; bottom: 0; margin: auto;}
.ctCenter{position: absolute; margin: 0 auto; left: 0; right: 0;}
.verticalCenter{position: absolute; z-index: 10; top: 50%; left: 0; right: 0; margin: 0 auto; transform: translate3d(0,-50%,0);}
.null{text-align: center; color: #999; line-height: 100px;}
.null::before{content: '暂无数据！';}
.bLine{text-align: center; color: #999; line-height: 50px;}
.bLine::before{content: '我是有底线的';}
.noDisplay{display: none;}

/* 箭头 */
.arrow_left{width: 0px; height: 0px; border: 10px solid; border-color:transparent #FFF transparent transparent;}
.arrow_right{width: 0px; height: 0px; border: 10px solid; border-color:transparent transparent transparent #FFF;}
.arrow_up{width: 0px; height: 0px; border: 10px solid; border-color:transparent transparent #FFF transparent;}
.arrow_down{width: 0px; height: 0px; border: 10px solid; border-color:#FFF transparent transparent transparent;}

/* 切换动画 */
.view{position: fixed; z-index: 0; width:100%; height: 100%; transition: all .6s cubic-bezier(0.075, 0.82, 0.165, 1); background-color: #F2F2F2;}
.view_dark{background-color: #242628;}
.slide-left-enter,.slide-right-leave-active{z-index: 1; transform: translate(100%,0);}
.slide-right-enter,.slide-left-leave-active{z-index: -1; transform: translate(-30%,0);}

/* 更新 */
.update_body{position: absolute; z-index: 999; width: 100%; height: 100%}
.update_logo{position: fixed; width: 100%; left: 0; bottom: 15px; line-height: 20px; text-align: center; padding: 10px 0;}
.update_logo h1{font-size: 16px;}
.update_logo h2{font-size: 10px; font-weight: normal;}
.update_ct{position: absolute; width: 220px; height: 220px; margin: auto; left: 0; right: 0; top: 0; bottom: 0;}
.update_ct .logo{width: 120px; height: 120px; margin: 0px auto 20px; border-radius: 50%;}
.update_ct .logo div{height: 100%; background: url('./assets/logo.svg') no-repeat center; background-size: 65%;}
.update_ct .loading{height: 5px; border-radius: 5px;}
.update_ct .load_msg{color: #FFF; text-align: center; padding: 8px 0; font-size: 14px;}
.update_ct .load_button{text-align: center;}

/* 布局 */
.flex{display: flex; justify-content: space-between; flex-wrap: wrap;}
.flex.center{align-items: center;}
.flex_left{display: flex; justify-content: flex-start; flex-wrap: wrap;}
.flex_right{display: flex; justify-content: flex-end; flex-wrap: wrap;}
.flex_center{display: flex; align-items: center; justify-content: center; height: 100%;}
.flex_nowrap{display: flex; justify-content: space-around; flex-direction: row; white-space:nowrap;}
.flex_in{display: flex; justify-content: center; align-items:center;}
.nowrap{overflow: hidden; white-space: nowrap; text-overflow: ellipsis;}
.nowrap_text{overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;}
.nowrap_three{overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;}

/* 底部导航 */
.nav_body{height: calc(100% - 50px);}

/* Html */
.htmlBody{margin: 1px 0; padding: 15px; background-color: #FFF;}
.htmlOther{padding: 10px 0; font-size: 14p; color: #999;}
.htmlCt{overflow: hidden; font-size: 16px; line-height: 28px;}
.htmlCt img{width: 100%; height: auto; padding: 10px 0;}

/* 搜索 */
.Search{margin: 0 auto;}
.Search .input{height: 40px; line-height: 40px; font-size: 14px; padding: 0 10px; border-radius: 20px; background-color: #F2F2F2; color: #999;}
.Search .input span{padding-left: 10px;}

/*
* ICO-字体图标
* 图标生成: https://icomoon.io/app/#/select
* 转Base64: https://transfonter.org/
*/
@font-face {
    font-family: 'icomoon';
    src: url(data:application/font-woff2;charset=utf-8;base64,d09GMgABAAAAABGQAA0AAAAAIEAAABE4AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP0ZGVE0cGh4GYACCbhEICrMIqnoLNgABNgIkA2gEIAWDGweCDRsTG1GUjlqF7KsEbk5sHWSFj4yGY4nNMVTYrZYSqZ6edCK8ZbqNkGTWAn7OfvZZ9IUIJRACJIiHEoLVk+ClLUGsGjRQw+QMqlCn4v/3vGJ6Hs4UTpxzww/XPudtipOFAutTFb4Vsmp/9gggYyd2oaCOwIiWJaBJt003fdEoTLgX6okSTvwr+f3rtlNVmf3ab+KwVnB1DInJOVvvXhGiBLYbC/nGLHazLf9zKe2AH4iSxslChNPl7D/sJDiU2U50KIRvhWcNW+YWEs//zZV2Zu/mvbScAoAjYa4VsqpKTv7kYCab9zZzmBznrpDdYvYAyNVWke9VVR5CDlBWgSLhKlSF8FWKZPtYLkFZxbEqzNcN5WlYx2h7DDnwtdcOA6Ao3ng8SiqffPdiiAeRBSVgv8sZEAgBBhdZDsCy39EW8ACzh/EC2My9DX0NG8mg3orUGNQOGjOxt8Y77KyG50mgmkAmyxrGiAo0GHRUOcxauApSMBBAMI3JxgLGTOP/2jYAqAMYU9ca/1TP+437/YnZg6pMCliFhO3EZhJTs+YQPzMABzWeQOPj8GETDDgZzVdkd3fIx02Ox9QTaZcz4KEHF2PBQBkV0kCDCMcOA0REpaVFW9IjRBVxDqK8jJPyrqXgMqnkuOF9tLtfYNsq8h539/f5Xt1Pu1kE4+zOmJ1lbiVpOvu8pbOts6WjvRjHaOvnS0tdVY1NFLPxKQhgyHZYCfC6VE00XMpSgyJN3BzbJjEEENHc9yZqkWI6KM3IWKM5QHi+GC4zkrZsWZCADrsXx8MLDd3QhR+MXqQ+kBpS0n/GGm2wCUt71IgljRAnUcSQE7pGDCXvPPmGQmyf+NX35RLMzYycOYpC/4UVKtRqVgBzK+eUWiVc6YQBSK+FeQn4rblPILGKGL9SrpM3FP3q5YcjwYXyEM69ccq9IJCCUumqGAduaDgKGzb/71eSvzSsW1jPLqY/iSeUO6Ram9yYmXRxM7b8hZhsIASmFEweKyxKE0WfXD9+DQRTgDmmy4KpAGLJMX/XURoAU4eCx5isY4kR0WMw9W52ZHE5TNwB3qWrj8ZR8rLQJCNfIoJgkBY5EJ1+mrNZpp3weAYYlY+2fKiGLL7I6cTEL4qieE51eOhgEnhrqC/WC1zzl07CNa/LldCfBAbX4uvCeSNWlkjI09piyPjFmjlF14YnnhwAcRyOcIbNZmdl5Pg/5VsQ5t6/lr0DoHghNVk/lAbIN6xNwOijypcqAlFb+QJsbVUFQlNSNKbbUphWcnr8BSRr79of0TxwuosveWcL8JR2FrJO64ZFv+oAyA1ZeVmIqijQqcD5jRgCtvBgLHgXX6n+sCxFptuH4AYBGtyIiXsDb62UaTLY/tAe55mGsMHxYXNh4rHDj9PGcOYeLCgm8qF25XsvkVqVhvRW1mGqcfocZY+/48KenvngDiXf7HmBB9HGqGdAmh8m7vEkp2Rvl8UWt+Vs3uLCDq9pnaXCBdSyCDb5ULvUxUW/s61GKTaCO53OxnysfYiFiSGv2DRw6iEOLwYuk+eQmQcIu1INZxuY7r3Pr0dP6FejdnxxLFXKVAdNlaVwxhbR/FvQBpcu1pAAh5QNlviTK8DzdE8vDaKiZhdtAnVIuc6OhAhbq2aJ2gjtI4U71OVS6gVgJGSZZKsZ9rpxhALoCjdmEYEUIT6HkxYcLVQWiqin5Qk7cB6n5hAKmLgBpdSIPCNGSGOFRiupcS1hdiqsTbJSFgJHTrVHYDAakDFEIw1OAkgGRUEO4NloPGCRqRNLJZTXUoGlKbNBlu9pHTMrATHEhAWDg7RPblgLDPtmt470xeBRpQQb2ZMKtqYA3cX2h+NHTs+HJr55t0fI7nJirMKlXznJddjmM6cmn5SW+svy26DgzuWFaFPBW4+zxlbRVvJK/TFU/kB9kiuK1pIuohGujIeISyIP1yDzzfpLh2vQfqEXwETYKGYerbBRomM0HA3LAq4Gd8g4bzQ0LQGCU9A1AVtWJHBWuUPxdvDMSqAGbga29z9J5aNDC4pe3MV6cEbmREAgI0RchXPZmSfJX0fa0nKMERQrNtOi9YhSbRzDOUYaZK/rS8pT6FRk4m35pMN4nTlskPFU2iLe5LjBOv/5SzhQQuK4JJ0NKzhgDw6PojlDcjiPswT+bjXS9dAXKvQizxIwWZgpBdyH+QckkosyZjK4+0l/5aOTACjA7fYbwhgK20xYil4IfXlNyT+mgHArQ6rEtphCBZJcYkr3O7asaqZ7Erkxfc9boydn0pMKyu1rAm0j/6uwxrbb8E/GBnPPdtMtaXHkdXH/Yhb06kKYKZg35Ga3hgHzVPW+ZpIX7H/N3ykWD3BKgytiMJo3zlF0NmtpOkqh1OA7SEDMTqOU5Van1/JjZ5xn51NBmDtxxD7O0uFYxjiJLV4tOIbjDH0101crNnJhdKMu3Tl9eQ6UqHH+1zzpEK+PXmQQedQZE9D1yIIBFCabWghDPzmDO9RpILuBkGwhemo8VuCauhMla/GvpuN4CbyoxOv9qoi4LSULX90Ue39z3xqXhpKq2teYrLL5/WqrS/aR7e08pHlqVLonLVS2rXPpUm+wL1iSd2uvUui/0ytyPRC35CmLlNs7IZovXL+oyIw+AqBI96C+WqHcsRaNOe39ckVfB5an1rcp9NDLuBKgMWX1CAsCEHqsAw05q8IfBmEnAVBGe6isVaF8Im1rdt25OjSllim/1O5vSNlhh12tdwdpT95CQP3BIyMazcgVSJjDw5vtPYJ7Fe3IEQw/u35lu0WriRzxfqLhpT11DSkv3xjYKQaWBoqNA0REA41S4s7UK8K2robPeUc3iDDFFXPo8Y+TV+cXO4Y6gNqt04rjujx5wb/yV9A+Y0uxa8r6ZFp7hedzg7q6YrMfiE0FDj5e+rtM9nspshZKZQuzYP3xMDl27y4r2bXb4dy9tqykuoLsINgHBgYa2OWQAXDsGihV6gDsi0rbct40atqXs296Wdn0gzkHfzyYe1CwH8l5RHoKKDV5f0CIeztydjy2PUjT2gGJ4PhiQ+/cXuw84HA4ymwrV69se87pcH6/e1WVs3rweYw85Sjp4N8d6lzpbHfeKNvvGh12y54kDfT/XxcuWHhFECS/nH0UOwfiHHh5xg9PO1bhpPR9nkLO90sXtEqcdUChtdthd1Q4FzjhAH9OznvO93KWUuHnJsu8G9DVmgKEU7rDOt0RfVCA2aP76MV7QV1Bv5F9z7h2XchaI+5a7slGZek/pcu9cmNG+D0TbMNPG+QjMiQzicb0yUVF+fkREZMnI0V6Vp8MpBv10N9Cs4HbuC4twV/q7etPSOjv80r9E4D0W7rfG2412JqgHFfiUAEsE/U3YTXZvr6UmTNTcFP+Mau1tx6g/P4Hb2k1tzaC8vs23dKseRQAM6YHZgYCWAMgdEgBhNF8SMXWsDWBWQYAuMm5fQCc4UMWiqEi8PDqM1lPS8/VAJVZFM2qD3XNmRRgHVGrKsM/5yPrDYIozEldx2HgoFHtmu+02xc47ZaLA+BSB+dIRIHMV17USgL9KPPFNFpdLwLAuWvHXA6tJo3hGRDPpGu0BfZrx84yRKS+fJm+zLcTFyj4Mu9hfoGPMZhd9kDBTIHxTFISA/ieUYlnfIlhVAvn4VFlt0lc0wWbx/bOyq2ZSf/blMAKapC9NGvWnOwcJ3i5mFHRbh5zzfjZFPlNe+JYsfFNYKPbZ+g11dCNh8+Ja+8tjxUHN6gGN8aeENduvfGwaug0ADFUiYCWmMv6RtEsrlUNzm/UN55WDa4FIJqVCFoZtPaeuPZHndIsAjitGnom5B1DpkG3AOzBHA6MH1skPt++2TfHNzdu+59SxneXEC45IsWgEr8GgyJytWi8v15bB/QnKQDESiUK/zFSYCplGWWuVKQ9kIW03VLrCoGIQERctRncG5yx+dUqZuXBtqPvTQTLsWJ9Hun0nCQ/GT4lb1dTG9PW8rGbAQOuVYsMD4eJsmdx+AUNMQQQNF9fxpHo+8mWtpJvlhJLwhkn2pi21rdLUH0wGaFRHBiAiCTxERSVKOOkLMTLgyiTbkH1T1KGU0NaKzVy61f9kO2SknSGjRiS7q9G+CfHsfeqBgCIZVSXD2HDys/oh7AYnhgiYjPKFmQivTeN99hCq3kwqNRiQtEaJuf77EQ3jiDr/iiKsBSrJiyc1qaYOpJTOM8IBnzQZm36jBnSyzh09QeASP32M7iUvpC4BltOK0cMUxW3j2snMUBGbyRpIzkiAidwaUlyPpM0cZUd8fpPMC5W3Pk4hVY/+zw7MxperWTyH5xKDEniwmHr5Jjty3HkuJpYAoh81t1Hve57xEVw1VcjcbVYvzuNSeNHMVrYwtjLJ0C/ro1WVA1j9LeHJBW+RIRyinR1LP833SgYImelHzF729yjgXzrJgCJH9fevrXnsk/wnmCffXtwfjr37InGCLthDYGICFYr1ERqQpfBHmH8+VNiWIbdZ0gKMIQaAsIMCLAFoOXREG+ISc8xIYTuH3ZpurWANRFoIbbfa01E2/+tUJceHVx2/PpCHiCAUD+diEBA6k8/hc70em0/Tsm5EPbEuuzJHwJEPUvn/6PX424HCESEni/naAECEd5dNh/bbQCICKn1RCAQhgYGF4d0dPQSQ4wawOYfdoJgKQgdhtc8O94iCHvcLgtZZpm9GAktsICAnZgoiwawp2l6eYUIEEI6k5E5YAawE3vxpoFM2Dwh6Gfi3e69ghAfb57txXBBKCN2YqKdKyRLaMEIvLPM8dj9xvSK8pdBpvIMEiCqgFlJ7nwMwuE3SpBHgNy8oCge783DniYsyP3dJnq5vFwEoXCZeOSygzB8SJzF7d4jCJY406xrJeyHAOyYzucQ0CkV02l+IMRjq4jxiQkOR4IhIPbsStz84Y+MqVrjfVU+Dj+/qu+WVo/WVbf84mtriD0aeypyGyJOx16NbbD5/tJSVfeiS7tCXXlAd1TX84euV3tCs073R/ftAx5YzCZpGU6zvKY0Wi7Xe+6v1vCEveJrC2dJSPKhu1zIN+eblzeEOEMyZhWF54TlPNBYElwc7HZrutKT3un711KkOHw4Mu/kDSnMrZx8WCbkJWHxjAfyWAlDuSPvLanI9c/zLy/P8c/2r6+46s119vZUVv7zzxyhUA9A7pUTAQ/nO8PJ9bKEc7MI7M9EtK9coYsh3l9Hfhcl8lEZwxExPAO/YKkkSKCC3DfpROzRx1aJDEOQoR+lL7VNGJ7wC7faufiFYng0YXRivHsAoJTXPsnMmjYnJWXOtPrOJ6+lpF7uAkByQNgBuJqaXAVNzew2NxeAs5qb1mDtxZJiYWnk0Bbb1Hnz768qCCoILilFCvQsmj9vqk2iMnVRd9C2GXU5fA4/37+kJMgCLHZlBGQG5OYxXelZBFiCJCrD0251n6d+fzwnOdK3yGfqr1IFh0/jx8b4h1w2+zAAKRgM9gm6A94/TB0KqLmaaeC4rVRqAEl7K3aOz2D0sEXuRP4qmlvupfD4Q/Ewd5jdjjg8dGo6J8DEWGwHPpbIXkRwrmcNNAb9MxioMRVOgLiHBAnUAWZINGaJHXOk4jwPBbq5AGS7J4cBryaoxMmwSucwQ/wxSxIxR3LP8/CDmwtIVg0uRzL2oxE1aMIy9jVhOdD49SRv2mYrQh086MBSVKEV+JOHvgC2jfz1ZahDK9rQWN8EKxKQCPwy5DmtCYl4RnaUtyfEPKjDciq8Cu061IJdjZ7ZyMMjs50E4CewzX424OTVNP2zsK8BMFA/vAEgBgyxYIkjngSSkJRkJCcFKUkkFfmQmjSkJR350gTyIz35C56lPc0NVknH8sZExZxI1iRKZomVJBEbSSYpJJWkkfTESaaVFrESK7ESK7ESK7ESK7HKpEQAAAA=) format('woff2'),
        url(data:application/font-woff;charset=utf-8;base64,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) format('woff');
    font-weight: normal;
    font-style: normal;
}
.icons{font-family: 'icomoon' !important; font-size: 16px; color: #666;}
.icon_up:before{content: "\e900";}
.icon_down:before{content: "\e901";}
.icon_left:before{content: "\e902";}
.icon_right:before{content: "\e903";}
.icon_yes:before{content: "\e904";}
.icon_close:before{content: "\e905";}
.icon_search:before{content: "\e906"; font-size: 22px;}
.icon_scan:before{content: "\e907"; font-size: 22px;}
.icon_qrcode:before{content: "\e908"; font-size: 22px;}
.icon_tel:before{content: "\e909";}
.icon_passwd:before{content: "\e910";}
.icon_code:before{content: "\e911";}
.icon_service:before{content: "\e912";}
.icon_cart:before{content: "\e913";}
.icon_config:before{content: "\e914";}
.icon_clear:before{content: "\e915";}
.icon_menu:before{content: "\e916";}
.icon_more:before{content: "\e917";}

.icon_home:before{content: "\e918"; font-size: 22px; }
.icon_msg:before{content: "\e919"; font-size: 24px; }
.icon_me:before{content: "\e920"; font-size: 22px; }

/* UI */
body .van-grid-item__content::after,body .van-hairline--top::after{border-color: #FFF;}
.van-overlay{z-index: 1000;}
.van-popup{overflow-y: initial;}
.van-popup--bottom.van-popup--round{border-radius: 10px 10px 0 0; max-height: calc(100% - 80px);}
body .van-tab--active{color: #6FB737;}
body .van-tabs__line{background-color: #6FB737;}
body .van-dialog__header{font-size: 18px;}
</style>

<script src="./App.js"></script>
