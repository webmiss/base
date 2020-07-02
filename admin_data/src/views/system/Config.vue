<template>
  <div>
    <!-- 内容 -->
    <el-row class="body mTop10">
      <el-form :model="form" :label-width="LabelWidth">
        <el-form-item label="LOGO">
          <div for="logo" class="upload bgImg bgTu tu" v-if="!form.logo" @click="upImage('logo')">
            <i class="icons icon_img"></i>
          </div>
          <div for="logo" class="upload bgImg bgTu" v-else :style="{backgroundImage:'url('+form.logo+')'}" @click="upImage('logo')"></div>
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
          <div for="login_bg" class="upload bgImg tu" v-if="!form.login_bg" @click="upImage('bg')">
            <i class="icons icon_img"></i>
          </div>
          <div for="login_bg" class="upload bgImg" v-else :style="{backgroundImage:'url('+form.login_bg+')'}" @click="upImage('bg')"></div>
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
.upload{display: inline-block; width: 80px; height: 80px; line-height: 80px; text-align: center; border: #F2F2F2 1px solid;}
.upload.tu{background-color: #F2F2F2;}
.upload.tu .icons{font-size: 40px; color: #999;}
</style>

<script src="./Config.js"></script>
