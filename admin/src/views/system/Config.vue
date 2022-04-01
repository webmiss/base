<template>
  <wm-main>
    <wm-form>
      <wm-form-item label="Upload" height="auto">
        <wm-img-upload :width="200" :height="200" :url="upload.url" :param="upload.param" @upload="upImg($event,'logo')">
          <wm-img width="80px" height="80px" radius="50%" :url="form.logo"></wm-img>
        </wm-img-upload>
      </wm-form-item>
      <wm-form-item label="Input">
        <wm-input v-model:value="form.input" maxlength="32" placeholder="请输名称" />
      </wm-form-item>
      <wm-form-item label="Select">
        <wm-select v-model:value="form.select1" placeholder="选择所属" :data="[{label:'Option1', value:'option1'},{label:'Option2', value:'option2'}]" />
      </wm-form-item>
      <wm-form-item label="Select">
        <wm-select v-model:value="form.select2" :data="[{label:'Option1', value:'option1'},{label:'Option2', value:'option2'}]" />
      </wm-form-item>
      <wm-form-item label="Radio">
        <wm-radio v-model:value="form.radio" :data="[{label:'男',value:'男'},{label:'女',value:'女'}]"></wm-radio>
      </wm-form-item>
      <wm-form-item label="Checkbox">
        <wm-checkbox v-for="(v,k) in checkbox" :key="k" :label="v.label" :value="v.value" v-model:checked="v.checked"></wm-checkbox>
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