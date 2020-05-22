<template>
  <div>
    <!-- 内容 -->
    <el-row class="body mTop10">
      <el-form :model="form" :label-width="LabelWidth">
        <el-form-item label="头像">
          <label for="logo" class="upload bgImg bgTu" v-if="!form.img"></label>
          <label for="logo" class="upload bgImg bgTu" v-else :style="{backgroundImage:'url('+form.img+')'}"></label>
          <input type="file" id="logo" @change="upImage($event,'img')" class="hide">
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.nickname" placeholder="用户昵称" maxlength="8" style="max-width: 320px;"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name" placeholder="请输入真实姓名" maxlength="8" style="max-width: 320px;"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="职务">
          <el-input v-model="form.position" placeholder="请输入职务" maxlength="8" style="max-width: 320px;"></el-input>
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
.upload{display: inline-block; width: 80px; height: 80px; border: #F2F2F2 1px solid;}
</style>

<script src="./UserInfo.js"></script>
