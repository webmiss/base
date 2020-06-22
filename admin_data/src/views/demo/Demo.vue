<template>
  <div>
    <!-- 功能菜单 -->
    <el-input class="hide" v-model="actionType"></el-input>
    <!-- 功能菜单 -->
    <Action url="Demo" @action="openAction"></Action>
    <!-- 内容 -->
    <el-row class="body">
      暂无数据！
    </el-row>
    <!-- 内容 End -->
  </div>
</template>

<style scoped>
</style>

<script src="./Demo.js"></script>
