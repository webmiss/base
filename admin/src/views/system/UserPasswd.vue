<template>
  <wm-main>
    <wm-form class="max_width">
      <wm-form-item label="当前密码">
        <wm-input type="password" :value="form.passwd" @update:value="form.passwd=$event" maxlength="16" placeholder="登录密码" />
      </wm-form-item>
      <wm-form-item label="新密码">
        <wm-input type="password" :value="form.passwd1" @update:value="form.passwd1=$event" maxlength="16" placeholder="新密码" />
      </wm-form-item>
      <wm-form-item label="确认密码">
        <wm-input type="password" :value="form.passwd2" @update:value="form.passwd2=$event" maxlength="16" placeholder="确认新密码" />
      </wm-form-item>
      <wm-form-item type="botton">
        <wm-button @click="onSubmit()">修改并重新登录</wm-button>
      </wm-form-item>
    </wm-form>
  </wm-main>
</template>

<style scoped>
.max_width{max-width: 400px;}
</style>

<script src="./UserPasswd.js"></script>
