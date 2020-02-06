<template>
  <div class="notify_body" :style="{backgroundColor:bgColor,color:color}">
    <div class="notify_title flex">
      <div class="logo"></div>
      <h2 class="nowrap">{{title}}</h2>
      <div class="close"></div>
    </div>
    <div class="notify_content" v-if="content" v-html="content"></div>
  </div>
</template>

<style scoped>
.notify_body{margin: 10px 0; padding: 5px; box-shadow: 0 0 12px rgba(0,0,0,.2); border-radius: 6px; transform: translate(0, -100%); opacity: 0;}
.notify_title{line-height: 32px;}
.notify_title div{width: 32px; height: 32px;}
.notify_title .logo{background: url('../../assets/logo.svg') no-repeat center; background-size: 70%;}
.notify_title .close{cursor: pointer; background: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTczMDM0MDUwOTE4IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjMxOTEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNODQ2Ljg0MSA3OTkuMDI0bC0yODQuODM5LTI4NC44MzkgMjg0LjgzOS0yODQuOTZjMTMuNzE0LTEzLjcxNCAxMy43MTQtMzYuMDQ1IDAtNDkuNzU5cy0zNi4wNDUtMTMuNzE0LTQ5Ljc1OSAwbC0yODQuODM5IDI4NC44MzktMjg0Ljk2LTI4NC44MzljLTEzLjcxNC0xMy43MTQtMzYuMDQ1LTEzLjcxNC00OS43NTkgMHMtMTMuNzE0IDM2LjA0NSAwIDQ5Ljc1OWwyODQuOTYgMjg0Ljk2LTI4NC45NiAyODQuODM5Yy0xMy43MTQgMTMuNzE0LTEzLjcxNCAzNi4wNDUgMCA0OS43NTlzMzYuMDQ1IDEzLjcxNCA0OS43NTkgMGwyODQuOTYtMjg0Ljk2IDI4NC45NiAyODQuOTZjMTMuNzE0IDEzLjcxNCAzNi4wNDUgMTMuNzE0IDQ5Ljc1OSAwIDEzLjU5My0xMy43MTQgMTMuNTkzLTM2LjA0NS0wLjEyMi00OS43NTl6IiBmaWxsPSIiIHAtaWQ9IjMxOTIiPjwvcGF0aD48L3N2Zz4=') no-repeat center; background-size: 50%;}
.notify_title h2{font-size: 16px; width: calc(100% - 70px);}
.notify_content{padding: 0px 10px 6px; line-height: 21px; font-size: 14px;}
</style>

<script>
export default {
  name:'Notify',
  props: {
    title: {type: String, default: '消息'},
    content: {type: String, default: ''},
    bgColor: {type: String, default: '#FFF'},
    color: {type: String, default: '#333'},
  },
  data(){
    return {
    }
  },
  mounted(){
  },
  methods:{
  }
}
</script>