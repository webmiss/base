<template>
<div class="wm-load">
  <!-- Flow -->
  <div v-if="theme=='flow'" class="wm-load_flow">
    <div class="bounce1" :style="{backgroundColor: color}"></div>
    <div class="bounce2" :style="{backgroundColor: color}"></div>
    <div class="bounce3" :style="{backgroundColor: color}"></div>
  </div>
  <!-- Swing -->
  <div v-else-if="theme=='swing'" class="wm-load_swing">
    <div class="dot1" :style="{backgroundColor: color}"></div>
    <div class="dot2" :style="{backgroundColor: color}"></div>
  </div>
  <!-- Circle -->
  <div v-else-if="theme=='circle'" class="wm-load_circle">
    <div class="sk-circle1 sk-child"></div>
    <div class="sk-circle2 sk-child"></div>
    <div class="sk-circle3 sk-child"></div>
    <div class="sk-circle4 sk-child"></div>
    <div class="sk-circle5 sk-child"></div>
    <div class="sk-circle6 sk-child"></div>
    <div class="sk-circle7 sk-child"></div>
    <div class="sk-circle8 sk-child"></div>
    <div class="sk-circle9 sk-child"></div>
    <div class="sk-circle10 sk-child"></div>
    <div class="sk-circle11 sk-child"></div>
    <div class="sk-circle12 sk-child"></div>
  </div>
  <!-- Wave -->
  <div v-else-if="theme=='wave'" class="wm-load_wave">
    <div class="rect1" :style="{backgroundColor: color}"></div>
    <div class="rect2" :style="{backgroundColor: color}"></div>
    <div class="rect3" :style="{backgroundColor: color}"></div>
    <div class="rect4" :style="{backgroundColor: color}"></div>
    <div class="rect5" :style="{backgroundColor: color}"></div>
  </div>
</div>
</template>

<style scoped>
.wm-load{display: inline-block;}

/* Flow */
.wm-load_flow { width: 60px; height: 45px; text-align: center; }
.wm-load_flow > div {
  width: 10px; height: 10px; border-radius: 100%; display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}
.wm-load_flow .bounce1,.wm-load_flow .bounce2,.wm-load_flow .bounce3{ margin: 0 1px; }
.wm-load_flow .bounce1 { -webkit-animation-delay: -0.32s; animation-delay: -0.32s; }
.wm-load_flow .bounce2 {
  -webkit-animation-delay: -0.16s; animation-delay: -0.16s;
}
@-webkit-keyframes sk-bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0) }
  40% { -webkit-transform: scale(1.0) }
}
@keyframes sk-bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0); transform: scale(0); }
  40% { -webkit-transform: scale(1.0); transform: scale(1.0); }
}

/* Swing */
.wm-load_swing {
  margin: 100px auto; width: 24px; height: 24px; position: relative; text-align: center;
  -webkit-animation: sk-rotate 2.0s infinite linear;
  animation: sk-rotate 2.0s infinite linear;
}
.dot1, .dot2 {
  width: 60%; height: 60%; display: inline-block; position: absolute; top: 0; border-radius: 100%;
  -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
  animation: sk-bounce 2.0s infinite ease-in-out;
}
.dot2 { top: auto; bottom: 0; -webkit-animation-delay: -1.0s; animation-delay: -1.0s; }
@-webkit-keyframes sk-rotate { 100% { -webkit-transform: rotate(360deg) }}
@keyframes sk-rotate { 100% { transform: rotate(360deg); -webkit-transform: rotate(360deg) }}
@-webkit-keyframes sk-bounce {
  0%, 100% { -webkit-transform: scale(0.0) }
  50% { -webkit-transform: scale(1.0) }
}
@keyframes sk-bounce {
  0%, 100% { transform: scale(0.0); -webkit-transform: scale(0.0); }
  50% { transform: scale(1.0); -webkit-transform: scale(1.0); }
}

/* Circle */
.wm-load_circle { position: relative; width: 32px; height: 32px; }
.wm-load_circle .sk-child { position: absolute; width: 80%; height: 80%; left: 0; top: 0; }
.wm-load_circle .sk-child:before {
  width: 20%; height: 20%; content: ''; display: block; margin: 0 auto; background-color: #6FB737; border-radius: 50%;
  -webkit-animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;
  animation: sk-circleBounceDelay 1.2s infinite ease-in-out both;
}
.wm-load_circle .sk-circle2 { -webkit-transform: rotate(30deg); -ms-transform: rotate(30deg); transform: rotate(30deg); }
.wm-load_circle .sk-circle3 { -webkit-transform: rotate(60deg); -ms-transform: rotate(60deg); transform: rotate(60deg); }
.wm-load_circle .sk-circle4 { -webkit-transform: rotate(90deg); -ms-transform: rotate(90deg); transform: rotate(90deg); }
.wm-load_circle .sk-circle5 { -webkit-transform: rotate(120deg); -ms-transform: rotate(120deg); transform: rotate(120deg); }
.wm-load_circle .sk-circle6 { -webkit-transform: rotate(150deg); -ms-transform: rotate(150deg); transform: rotate(150deg); }
.wm-load_circle .sk-circle7 { -webkit-transform: rotate(180deg); -ms-transform: rotate(180deg); transform: rotate(180deg); }
.wm-load_circle .sk-circle8 { -webkit-transform: rotate(210deg); -ms-transform: rotate(210deg); transform: rotate(210deg); }
.wm-load_circle .sk-circle9 { -webkit-transform: rotate(240deg); -ms-transform: rotate(240deg); transform: rotate(240deg); }
.wm-load_circle .sk-circle10 { -webkit-transform: rotate(270deg); -ms-transform: rotate(270deg); transform: rotate(270deg); }
.wm-load_circle .sk-circle11 { -webkit-transform: rotate(300deg); -ms-transform: rotate(300deg); transform: rotate(300deg); }
.wm-load_circle .sk-circle12 { -webkit-transform: rotate(330deg); -ms-transform: rotate(330deg); transform: rotate(330deg); }
.wm-load_circle .sk-circle2:before { -webkit-animation-delay: -1.1s; animation-delay: -1.1s; }
.wm-load_circle .sk-circle3:before { -webkit-animation-delay: -1s; animation-delay: -1s; }
.wm-load_circle .sk-circle4:before { -webkit-animation-delay: -0.9s; animation-delay: -0.9s; }
.wm-load_circle .sk-circle5:before { -webkit-animation-delay: -0.8s; animation-delay: -0.8s; }
.wm-load_circle .sk-circle6:before { -webkit-animation-delay: -0.7s; animation-delay: -0.7s; }
.wm-load_circle .sk-circle7:before { -webkit-animation-delay: -0.6s; animation-delay: -0.6s; }
.wm-load_circle .sk-circle8:before { -webkit-animation-delay: -0.5s; animation-delay: -0.5s; }
.wm-load_circle .sk-circle9:before { -webkit-animation-delay: -0.4s; animation-delay: -0.4s; }
.wm-load_circle .sk-circle10:before { -webkit-animation-delay: -0.3s; animation-delay: -0.3s; }
.wm-load_circle .sk-circle11:before { -webkit-animation-delay: -0.2s; animation-delay: -0.2s; }
.wm-load_circle .sk-circle12:before { -webkit-animation-delay: -0.1s; animation-delay: -0.1s; }
@-webkit-keyframes sk-circleBounceDelay {
  0%, 80%, 100% { -webkit-transform: scale(0); transform: scale(0); }
  40% { -webkit-transform: scale(1); transform: scale(1); }
}
@keyframes sk-circleBounceDelay {
  0%, 80%, 100% { -webkit-transform: scale(0); transform: scale(0); }
  40% { -webkit-transform: scale(1); transform: scale(1); }
}

/* Wave */
.wm-load_wave { width: 48px; height: 32px; text-align: center; }
.wm-load_wave > div {
  width: 4px; height: 80%; display: inline-block; margin: 0 1px;
  -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
  animation: sk-stretchdelay 1.2s infinite ease-in-out;
}
.wm-load_wave .rect2 { -webkit-animation-delay: -1.1s; animation-delay: -1.1s; }
.wm-load_wave .rect3 { -webkit-animation-delay: -1.0s; animation-delay: -1.0s; }
.wm-load_wave .rect4 { -webkit-animation-delay: -0.9s; animation-delay: -0.9s; }
.wm-load_wave .rect5 { -webkit-animation-delay: -0.8s; animation-delay: -0.8s; }
@-webkit-keyframes sk-stretchdelay {
  0%, 40%, 100% { -webkit-transform: scaleY(0.4) }  
  20% { -webkit-transform: scaleY(1.0) }
}
@keyframes sk-stretchdelay {
  0%, 40%, 100% { transform: scaleY(0.4); -webkit-transform: scaleY(0.4); }
  20% { transform: scaleY(1.0); -webkit-transform: scaleY(1.0); }
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import Env from '../../env'
export default defineComponent({
  name: 'Loading',
  props: {
    theme: {type: String, default: 'flow'},             //样式: flow、swing、circle、wave
    color: {type: String, default: Env.themes.primary.plain[0]}, //颜色
  },
});
</script>