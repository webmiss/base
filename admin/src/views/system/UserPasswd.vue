<template>
  <div>
    <!-- 内容 -->
    <el-row class="body mTop10">
      <el-form :model="form" :label-width="LabelWidth">
        <el-form-item label="当前密码">
          <el-input type="password" show-password v-model="form.passwd" placeholder="登录密码" maxlength="32" style="max-width: 320px;"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input type="password" show-password v-model="form.passwd1" placeholder="请输入新密码" maxlength="32" style="max-width: 320px;"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码">
          <el-input type="password" show-password v-model="form.passwd2" placeholder="确认密码" maxlength="32" style="max-width: 320px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()">修改并重新登录</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <!-- 内容 End -->
  </div>
</template>

<style scoped>

</style>

<script src="./UserPasswd.js"></script>
