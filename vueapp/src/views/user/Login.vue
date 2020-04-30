<template>
<v-touch v-on:swiperight="back()">
  <page-view>
    <div slot="left"><i class="back icons icon_left" @click="back()"></i></div>
    <div slot="title">登录</div>
    <div slot="body" class="html">
      <!-- 滑动 -->
      <div class="html" ref="index">
        <!-- 测试 -->
        <div class="test">
          <div>内容</div><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div><div>7</div><div>8</div><div>9</div>
        </div>
      </div>
      <!-- 滑动 End -->
    </div>
  </page-view>
</v-touch>
</template>

<style scoped>

</style>

<script src="./Login.js"></script>