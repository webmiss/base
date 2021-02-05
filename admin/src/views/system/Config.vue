<template>
  <wm-main>
    <wm-form class="max_width">
      <wm-form-item label="LOGO">
        <wm-img-upload :url="upload.url" :param="upload.param_logo" @upload="upImg($event,'logo')">
          <wm-img width="80px" height="80px" radius="50%" :url="form.logo"></wm-img>
        </wm-img-upload>
      </wm-form-item>
      <wm-form-item label="系统名称">
        <wm-input :value="form.title" @update:value="form.title=$event" maxlength="32" placeholder="请输入系统名称" />
      </wm-form-item>
      <wm-form-item label="网站域名">
        <wm-input :value="form.http" @update:value="form.http=$event" maxlength="16" placeholder="例如: https://webmis.vip" />
      </wm-form-item>
      <wm-form-item label="版权信息">
        <wm-input :value="form.copy" @update:value="form.copy=$event" maxlength="64" placeholder="请输入版权信息" />
      </wm-form-item>
      <wm-form-item label="登录背景">
        <wm-img-upload :width="0" :height="0" :url="upload.url" :param="upload.param_login_bg" @upload="upImg($event,'login_bg')">
          <wm-img width="80px" height="80px" radius="4px" :url="form.login_bg"></wm-img>
        </wm-img-upload>
      </wm-form-item>
      <wm-form-item type="botton">
        <wm-button @click="onSubmit()">保存设置</wm-button>
      </wm-form-item>
    </wm-form>
  </wm-main>
</template>

<style scoped>
.max_width{max-width: 400px;}
</style>

<script lang="ts" src="./Config.ts"></script>