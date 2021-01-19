<template>
  <div class="wm-load load1">
    <div class="loader" :style="{color: color, fontSize: size}"></div>
  </div>
</template>

<style scoped>
.wm-load{display: inline-block; width: 80px; height: 40px;}
.load1 .loader,
.load1 .loader:before,
.load1 .loader:after {width: 2.5em; height: 2.5em; border-radius: 50%;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation: load1 1.8s infinite ease-in-out;
  animation: load1 1.8s infinite ease-in-out;
}
.load1 .loader {font-size: 5px; position: relative; margin: 4px auto; text-indent: -9999em;
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.load1 .loader:before,.load1 .loader:after{content: ''; position: absolute; top: 0;}
.load1 .loader:before {left: -3.2em; -webkit-animation-delay: -0.32s; animation-delay: -0.32s;}
.load1 .loader:after {left: 3.2em;}
@-webkit-keyframes load1 { 0%,80%,100%{box-shadow: 0 2.5em 0 -1.3em;} 40% {box-shadow: 0 2.5em 0 0;} }
@keyframes load1 { 0%,80%,100%{box-shadow: 0 2.5em 0 -1.3em;} 40% {box-shadow: 0 2.5em 0 0;} }
</style>

<script>
export default {
  name: 'Loading',
  props: {
    color: {type: String, default: '#6FB737'},
    size: {type: String, default: '4px'},
  },
}
</script>