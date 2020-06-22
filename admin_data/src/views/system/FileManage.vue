<template>
  <div>
    <!-- 功能菜单 -->
    <el-input class="hide" v-model="actionType"></el-input>
    <!-- 内容 -->
    <el-row class="body">
      <!-- 文件信息 -->
      <el-row class="file_path">
        <span class="path">
          <span v-if="path=='/'">根目录</span>
          <span v-else @click="backDir()"><a>返回上级</a></span>
          <span class="split">|</span>
          <span>{{ path }}</span>
        </span>
        <span class="info">文件夹( {{ lists.dirNum }} ) 文件( {{ lists.fileNum }} ) 大小( {{ lists.size }} )</span>
      </el-row>
      <!-- 上传进度 -->
      <el-row class="file_load" :style="{backgroundImage: 'linear-gradient(to right, '+$config.themeColor+', '+$config.themeColor+' '+loaded+', #F2F4F6 '+loaded+', #F2F4F6 100%)'}">
        <span class="text" :style="{width:loaded}">{{loaded}}</span>
      </el-row>
      <ul class="file_body" v-if="lists.folder.length!=0 || lists.files.length!=0">
        <!-- 文件夹 -->
        <li v-for="(val,key) in lists.folder" :key="'dir'+key" :class="val.check?'file_active':'file_state'">
          <div class="file_click" @click="val.check=!val.check"><i class="el-icon-success"></i></div>
          <div class="file" @click="openFolder(val.name)">
            <div class="file_ct">
              <i class="icons icon_folder"></i>
            </div>
            <div class="name nowrap" :title="val.name">{{ val.name }}</div>
          </div>
        </li>
        <!-- 文件 -->
        <li v-for="(val,key) in lists.files" :key="'file'+key" :class="val.check?'file_active':'file_state'">
          <div class="file_click" @click="val.check=!val.check"><i class="el-icon-success"></i></div>
          <div class="file" @click="openFile(val.name)">
            <div class="file_ct">
              <div class="file_img bgImg" v-if="isImg(val.ext)" :style="{backgroundImage:'url('+url+lists.path+val.name+')'}"></div>
              <i class="icons icon_file_text" v-else></i>
            </div>
            <div class="name nowrap" :title="val.name">{{ val.name }}</div>
          </div>
        </li>
      </ul>
      <div class="null" v-else></div>
    </el-row>
    <!-- 内容 End -->

    <!-- 新建文件夹 -->
    <el-dialog title="新建文件夹" :visible.sync="folder.show" center width="480px" :close-on-click-modal="false">
      <el-form :model="folder.form" :label-width="LabelWidth">
        <el-form-item label="名称">
          <el-input v-model="folder.form.name" placeholder="文件夹名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="subDir()">新 建</el-button>
      </div>
    </el-dialog>
    <!-- 新建文件夹 End -->

    <!-- 打包 -->
    <el-dialog title="打包" :visible.sync="zipData.show" center width="480px" :close-on-click-modal="false">
      <el-form :model="zipData.form" :label-width="LabelWidth">
        <el-form-item label="名称">
          <el-input v-model="zipData.form.name" placeholder="压缩名称">
            <template slot="append">.zip</template>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="subZip()">在线打包</el-button>
      </div>
    </el-dialog>
    <!-- 打包 End -->

    <!-- 重命名 -->
    <el-dialog title="重命名" :visible.sync="renameData.show" center width="480px" :close-on-click-modal="false">
      <el-form :model="renameData.form" :label-width="LabelWidth">
        <el-form-item label="名称">
          <el-input v-model="renameData.form.name" placeholder="文件夹、文件的名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="subRename()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 重命名 End -->

    <!-- 删除 -->
    <el-dialog title="删除" :visible.sync="delData.show" center width="320px">
      <div>是否删除已选择文件？</div>
      <div slot="footer">
        <el-button type="primary" @click="subDel()">彻底删除</el-button>
      </div>
    </el-dialog>
    <!-- 删除 End -->

    <!-- 图片预览 -->
    <img-view v-model="imgView.show" ref="imgShow"></img-view>

  </div>
</template>

<style scoped>
.file_path{padding: 10px 0;}
.file_path .path{color: #999;}
.file_path .path span{padding: 5px 10px;}
.file_path .info{position: absolute; right: 0px; color: #999; background-color: #FFF; font-size: 12px;}
.file_load{width: 100%; height: 6px; line-height: 6px; font-size: 12px; background-color: #F2F4F6; border-radius: 3px;}
.file_load span{display: inline-block;}
.file_load .text{position: absolute; padding-top: 10px; text-align: right;}

.file_body{overflow: hidden; padding: 20px 5px;}
.file_body li{float: left; margin: 5px;}

.file{width: 128px; height: 128px; border: #FFF 1px solid; border-radius: 5px;}
.file:hover{background-color: #F2F4F6;}
.file .name{line-height: 38px; text-align: center; padding: 0 5px;}

.file_click{position: absolute; z-index: 10; opacity: 0.3; color: #6FB737; width: 40px; height: 40px; line-height: 40px; font-size: 20px; text-align: center;}
.file_state:hover .file_click{opacity: 0.8;}
.file_active .file_click{opacity: 1;}
.file_active:hover .file_click{opacity: 1;}
.file_active .file{border-color: #6FB737; background-color: #F2F4F6;}

.file_ct{width: 100%; height: 82px; line-height: 82px; text-align: center;}
.file_ct .icons{font-size: 48px; color: #B9C9D6;}
.file_ct .icon_folder{color: #FFD65D;}

.file_img{width: 100%; height: 100%; background-color: #F2F4F6;}
.file_img.bgImg{background-size: contain;}
</style>

<script src="./FileManage.js"></script>
