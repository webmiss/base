<template>
  <wm-main>
    <wm-form class="max_width">
      <wm-form-item label="头像" height="auto">
        <wm-img-upload :url="upload.url" :param="upload.param" @upload="upImg">
          <wm-img width="80px" height="80px" radius="50%" :url="form.img"></wm-img>
        </wm-img-upload>
      </wm-form-item>
      <wm-form-item label="昵称">
        <wm-input v-model:value="form.nickname" maxlength="12" placeholder="用户昵称" />
      </wm-form-item>
      <wm-form-item label="姓名">
        <wm-input v-model:value="form.name" maxlength="8" placeholder="填写姓名" />
      </wm-form-item>
      <wm-form-item label="性别">
        <wm-radio v-model:value="form.gender" :data="gender"></wm-radio>
      </wm-form-item>
      <wm-form-item label="生日">
        <wm-date v-model:value="form.birthday"></wm-date>
      </wm-form-item>
      <wm-form-item label="部门">
        <wm-input v-model:value="form.department" maxlength="8" placeholder="部门名称" />
      </wm-form-item>
      <wm-form-item label="职务">
        <wm-input v-model:value="form.position" maxlength="8" placeholder="职务、职称" />
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

<script lang="ts" src="./UserInfo.ts"></script>