<template>
  <wm-main>
    <wm-form>
      <wm-form-item label="Upload" height="auto">
        <wm-img-upload :width="200" :height="200" :url="upload.url" :param="upload.param" @upload="upImg($event,'logo')">
          <wm-img width="80px" height="80px" radius="50%" :url="form.logo"></wm-img>
        </wm-img-upload>
      </wm-form-item>
      <wm-form-item label="Input">
        <wm-input v-model:value="form.input" width="240px" clearable />
      </wm-form-item>
      <wm-form-item label="Select">
        <wm-select v-model:value="form.select" width="240px" clearable :data="select" />
      </wm-form-item>
      <wm-form-item label="Cascader">
        <wm-cascader v-model:value="form.cascader" width="240px" :data="cascader" />
      </wm-form-item>
      <wm-form-item label="Radio">
        <wm-radio v-model:value="form.radio" :data="radio"></wm-radio>
      </wm-form-item>
      <wm-form-item label="Checkbox">
        <wm-checkbox-group v-model:value="form.checkbox" :data="checkbox"></wm-checkbox-group>
      </wm-form-item>
      <wm-form-item label="Switch">
        <wm-switch :value="form.switch" @update:value="form.switch=$event"></wm-switch>
      </wm-form-item>
      <wm-form-item label="none" height="auto">
        <wm-tinymce v-model:value="form.tinymce" :menubar="true" :height="280" :upload="tinymce.upload"></wm-tinymce>
      </wm-form-item>
      <wm-form-item type="botton">
        <wm-button @click="onSubmit()">保存设置</wm-button>
      </wm-form-item>
    </wm-form>
  </wm-main>
</template>

<style scoped>
</style>

<script lang="ts" src="./Config.ts"></script>