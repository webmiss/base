<template>
  <div class="wm-popover">
    <!-- Top -->
    <div class="wm-popover_top_body" v-if="type=='top'">
      <div class="wm-popover_top">
        <div class="tip_body">
          <div class="tip" :class="'tip_'+effect">
            <div :style="{width:width}"><slot name="body"></slot></div>
          </div>
        </div>
        <div class="arrow" :class="'arrow_'+effect"></div>
      </div>
      <slot name="reference"></slot>
    </div>
    <!-- Top End -->
    <!-- Bottom -->
    <div class="wm-popover_bottom_body" v-if="type=='bottom'">
      <slot name="reference"></slot>
      <div class="wm-popover_bottom">
        <div class="arrow" :class="'arrow_'+effect"></div>
        <div class="tip_body">
          <div class="tip" :class="'tip_'+effect">
            <div :style="{width:width}"><slot name="body"></slot></div>
          </div>
        </div>
      </div>
    </div>
    <!-- Bottom End -->
    <!-- Left -->
    <div class="wm-popover_left_body" v-if="type=='left'">
      <div class="wm-popover_left">
        <div class="arrow" :class="'arrow_'+effect"></div>
        <div class="tip_body">
          <div class="tip" :class="'tip_'+effect">
            <div :style="{width:width}"><slot name="body"></slot></div>
          </div>
        </div>
      </div>
      <slot name="reference"></slot>
    </div>
    <!-- Left End -->
    <!-- Right -->
    <div class="wm-popover_right_body" v-if="type=='right'">
      <slot name="reference"></slot>
      <div class="wm-popover_right">
        <div class="arrow" :class="'arrow_'+effect"></div>
        <div class="tip_body">
          <div class="tip" :class="'tip_'+effect">
            <div :style="{width:width}"><slot name="body"></slot></div>
          </div>
        </div>
      </div>
    </div>
    <!-- Right End -->
  </div>
</template>

<style scoped>
.wm-popover{display: inline-flex; position: relative;}
.wm-popover .tip_body{position: absolute;}
.wm-popover .tip{padding: 8px 16px; line-height: 24px; border-radius: 4px; box-shadow: 0 2px 12px rgba(0,0,0,.1);}
.wm-popover .tip_plain{border: #DCDFE6 1px solid; background-color: rgba(255,255,255,.9); color: #333;}
.wm-popover .tip_dark{border: #000 1px solid; background-color: rgba(0,0,0,.8); color: #FFF;}
/* Top */
.wm-popover_top_body{display: inline-flex; flex-direction: column;}
.wm-popover_top{display: none; position: absolute; width: 0; height: 0; left: 50%; transform: translate(-50%,0);}
.wm-popover_top .tip_body{bottom: 0; padding-bottom: 10px; transform: translate(-50%,0);}
.wm-popover_top .arrow{position: absolute; top: -10px; left: -8px; width: 0px; height: 0px; border: 8px solid; border-color: transparent;}
.wm-popover_top .arrow_plain{border-top-color: #DCDFE6;}
.wm-popover_top .arrow_dark{border-top-color: #000;}
.wm-popover_top_body:hover .wm-popover_top{display: block;}
/* bottom */
.wm-popover_bottom_body{display: inline-flex; flex-direction: column;}
.wm-popover_bottom{display: none; position: absolute; z-index: 99; width: 0; height: 0; bottom: 0; left: 50%; transform: translate(-50%,0);}
.wm-popover_bottom .tip_body{top: 0; padding-top: 10px; transform: translate(-50%,0);}
.wm-popover_bottom .arrow{position: absolute; top: -6px; left: -8px; width: 0px; height: 0px; border: 8px solid; border-color: transparent;}
.wm-popover_bottom .arrow_plain{border-bottom-color: #DCDFE6;}
.wm-popover_bottom .arrow_dark{border-bottom-color: #000;}
.wm-popover_bottom_body:hover .wm-popover_bottom{display: block;}
/* Left */
.wm-popover_left_body{display: inline-flex; flex-direction: row;}
.wm-popover_left{display: none; position: absolute; width: 0; height: 0; top: 50%; transform: translate(0,-50%);}
.wm-popover_left .tip_body{left: 0; padding-right: 10px; transform: translate(-100%,-50%);}
.wm-popover_left .arrow{position: absolute; left: -11px; top: -8px; width: 0px; height: 0px; border: 8px solid; border-color: transparent;}
.wm-popover_left .arrow_plain{border-left-color: #DCDFE6;}
.wm-popover_left .arrow_dark{border-left-color: #000;}
.wm-popover_left_body:hover .wm-popover_left{display: block;}
/* Right */
.wm-popover_right_body{display: inline-flex; flex-direction: row-reverse;}
.wm-popover_right{display: none; position: absolute; width: 0; height: 0; top: 50%; transform: translate(0,-50%);}
.wm-popover_right .tip_body{right: 0; padding-left: 10px; transform: translate(100%,-50%);}
.wm-popover_right .arrow{position: absolute; right: -11px; top: -8px; width: 0px; height: 0px; border: 8px solid; border-color: transparent;}
.wm-popover_right .arrow_plain{border-right-color: #DCDFE6;}
.wm-popover_right .arrow_dark{border-right-color: #000;}
.wm-popover_right_body:hover .wm-popover_right{display: block;}
</style>

<script>
export default {
  name: 'Popover',
  props: {
    type: {type: String, default: 'top'}, //位置: top、bottom、left、right
    width: {type: String, default: '160px'}, //内容宽度
    effect: {type: String, default: 'plain'}, //样式: plain、dark
  },
}
</script>