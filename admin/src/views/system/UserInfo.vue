<template>
  <wm-main>
    <wm-form class="max_width">
      <wm-form-item label="头像">
        <wm-upimg :url="upload.url" :param="upload.param" @upload="upImg">
          <wm-img width="80px" height="80px" radius="50%" :url="form.img"></wm-img>
        </wm-upimg>
      </wm-form-item>
      <wm-form-item label="昵称">
        <wm-input :value="form.nickname" @update:value="form.nickname=$event" maxlength="12" placeholder="用户昵称" />
      </wm-form-item>
      <wm-form-item label="姓名">
        <wm-input :value="form.name" @update:value="form.name=$event" maxlength="8" placeholder="填写姓名" />
      </wm-form-item>
      <wm-form-item label="性别">
        
      </wm-form-item>
      <wm-form-item label="生日">
        
      </wm-form-item>
      <wm-form-item label="职务">
        <wm-input :value="form.position" @update:value="form.position=$event" maxlength="8" placeholder="职务、职称" />
      </wm-form-item>
      <wm-form-item type="botton">
        <wm-button @click="onSubmit()">保存设置</wm-button>
      </wm-form-item>
    </wm-form>
  </wm-main>
</template>

<style scoped>
.max_width{max-width: 420px;}
</style>

<script src="./UserInfo.js"></script>