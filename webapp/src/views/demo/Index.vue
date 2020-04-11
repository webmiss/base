<template>
<v-touch v-on:swiperight="$router.goBack(-1)">
  <!-- Demo -->
  <page-view>
    <div slot="left"><i class="icons icon_left" @click="$router.goBack(-1)"></i></div>
    <div slot="title">Demo</div>
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
  <!-- Demo End -->
</v-touch>
</template>

<style scoped>
.test{margin: 1px 0;}
.test div{margin: 1px 0; line-height: 120px; background-color: #FFF; text-align: center;}
</style>

<script src="./Index.js"></script>

