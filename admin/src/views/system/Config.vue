<template>
  <div>
    <!-- 内容 -->
    <el-row class="body mtop">
      <el-form :model="form" :label-width="LabelWidth">
        <el-form-item label="LOGO">
          <label for="logo" class="upload bgimg radius" v-if="!form.logo"></label>
          <label for="logo" class="upload bgimg radius bgcover" v-else :style="{backgroundImage:'url('+$config.baseUrl+form.logo+')'}"></label>
          <input type="file" id="logo" @change="upImage($event,'logo')" class="hide">
        </el-form-item>
        <el-form-item label="系统名称">
          <el-input v-model="form.title" placeholder="请输入系统名称、公司名称等" style="max-width: 320px;"></el-input>
        </el-form-item>
        <el-form-item label="网站域名">
          <el-input v-model="form.http" placeholder="请输入网站域名" style="max-width: 320px;"></el-input>
        </el-form-item>
        <el-form-item label="版权信息">
          <el-input v-model="form.copy" placeholder="请输入版权信息" style="max-width: 320px;"></el-input>
        </el-form-item>
        <el-form-item label="登录背景">
          <label for="login_bg" class="upload bgimg" v-if="!form.login_bg"></label>
          <label for="login_bg" class="upload bgimg bgcover" v-else :style="{backgroundImage:'url('+$config.baseUrl+form.login_bg+')'}"></label>
          <input type="file" id="login_bg" @change="upImage($event,'bg')" class="hide">
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()">保存设置</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <!-- 内容 End -->
  </div>
</template>

<style scoped>
.upload{display: inline-block; width: 80px; height: 80px;}
</style>

<script src="./Config.js"></script>
