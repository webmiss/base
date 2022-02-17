<template>
  <wm-main>

    <!-- Action -->
    <div class="app_action flex_left">
      <ul class="app_action_list flex_left">
        <li v-if="getters.actionShow('upload')" @click="uploadData()">上传</li>
        <li v-if="getters.actionShow('mkdir')" @click="folder.show=true">新建文件夹</li>
        <li v-if="getters.actionShow('rename')" @click="renameData()">重命名</li>
        <li v-if="getters.actionShow('remove')" @click="delData()">删除</li>
      </ul>
    </div>

    <!-- 文件信息 -->
    <div class="file_path">
      <span class="path">
        <span v-if="info.path=='/'">根目录</span>
        <span v-else @click="backDir()"><a>返回上级</a></span>
        <span class="split">|</span>
        <span @click="selectAll()"><a>全选</a></span>
        <span class="split">|</span>
        <span>{{ info.path }}</span>
      </span>
      <span class="info">文件夹( {{ lists.dirNum }} ) 文件( {{ lists.fileNum }} ) 大小( {{ lists.size }} )</span>
    </div>
    <!-- 上传进度 -->
    <div class="file_load" :style="{backgroundImage: 'linear-gradient(to right, #595, #595 '+info.loaded+', #F2F4F6 '+info.loaded+', #F2F4F6 100%)'}">
      <span class="text" :style="{width:info.loaded}">{{info.loaded!='0%'&&info.loaded!='100%'?info.loaded:''}}</span>
    </div>
    <!-- 文件信息 End -->

    <div class="file_body">
      <!-- 列表 -->
      <ul v-if="lists.folder.length!=0 || lists.files.length!=0">
        <!-- 文件夹 -->
        <li v-for="(val,key) in lists.folder" :key="'dir'+key" :class="val.check?'file_active':'file_state'">
          <div class="file_click" @click="val.check=!val.check"><i class="check"></i></div>
          <div class="file" @click="openFolder(val.name)">
            <div class="file_ct">
              <i class="icons icon_folder_solid"></i>
            </div>
            <div class="name nowrap" :title="val.name">{{ val.name }}</div>
          </div>
        </li>
        <!-- 文件 -->
        <li v-for="(val,key) in lists.files" :key="'file'+key" :class="val.check?'file_active':'file_state'">
          <div class="file_click" @click="val.check=!val.check"><i class="check"></i></div>
          <div class="file" @click="openFile(val.name)">
            <div class="file_ct">
              <div class="file_img bgImg" v-if="isImg(val.ext)" :style="{backgroundImage:'url('+info.url+lists.path+val.name+')'}"></div>
              <i class="icons icon_file_solid" v-else></i>
            </div>
            <div class="name nowrap" :title="val.name">{{ val.name }}</div>
          </div>
        </li>
      </ul>
      <!-- 列表 End -->
      <div v-else class="folder_null">文件夹为空</div>
    </div>

    <!-- 新建文件夹 -->
    <wm-dialog title="新建文件夹" width="480px" :show="folder.show" @update:close="folder.show=$event">
      <wm-form class="form">
        <wm-form-item label="名称">
          <wm-input v-model:value="folder.form.name" width="90%" placeholder="文件夹名称" />
        </wm-form-item>
      </wm-form>
      <template #footer>
        <wm-button @click="subDir()">新 建</wm-button>
      </template>
    </wm-dialog>
    <!-- 新建文件夹 End -->

    <!-- 重命名 -->
    <wm-dialog title="重命名" width="480px" :show="rename.show" @update:close="rename.show=$event">
      <wm-form class="form">
        <wm-form-item label="名称">
          <wm-input v-model:value="rename.form.name" width="90%" placeholder="重命名的名称" />
        </wm-form-item>
      </wm-form>
      <template #footer>
        <wm-button @click="subRename()">重命名</wm-button>
      </template>
    </wm-dialog>
    <!-- 重命名 End -->

    <!-- 上传 -->
    <wm-uploader class="hide" ref="Uploader" :url="upload.url" :name="upload.name" :param="upload.param" @progress="upProgress"></wm-uploader>

    <!-- 下载 -->
    <wm-dialog title="下载文件" width="480px" :show="down.show" @update:close="down.show=$event">
      <wm-row>{{down.filename}}</wm-row>
      <template #footer>
        <wm-button @click="downFile()">确定</wm-button>
      </template>
    </wm-dialog>
    <!-- 下载 End -->

    <!-- 删除 -->
    <wm-dialog title="删除" width="400px" :show="del.show" @update:close="del.show=$event">
      <wm-row>是否删除已选择文件夹或文件？</wm-row>
      <template #footer>
        <wm-button @click="subDel()">彻底删除</wm-button>
      </template>
    </wm-dialog>
    <!-- 删除 End -->

    <!-- 图片预览 -->
    <wm-img-view ref="imgShow" :show="imgView.show" @update:close="imgView.show=$event"></wm-img-view>

  </wm-main>
</template>

<style scoped>
.folder_null{position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); color: #999;}
/* 信息 */
.file_path{line-height: 20px; padding: 16px;}
.file_path a{color: #333; user-select: none;}
.file_path a:hover{color: #595;}
.file_path .path{color: #999;}
.file_path .path span{padding: 5px 8px;}
.file_path .info{position: absolute; right: 16px; color: #999; background-color: #FFF; font-size: 12px;}
.file_load{width: 100%; height: 2px; line-height: 2px; font-size: 12px; background-color: #F2F4F6;}
.file_load span{display: inline-block;}
.file_load .text{position: absolute; padding-top: 10px; text-align: right;}

/* 列表 */
.file_body{padding: 16px;}
.file_body ul{overflow: hidden;}
.file_body li{position: relative; float: left; margin: 5px;}
.file{width: 128px; height: 128px; border: #FFF 1px solid; border-radius: 5px;}
.file:hover{background-color: #F2F4F6;}
.file .name{line-height: 24px; text-align: center; padding: 8px 5px;}

/* 选择 */
.check{position: absolute; width: 18px; height: 18px; margin: 10px 0 0 -10px; background-color: #24292E; border-radius: 50%;}
.check:after{content: ""; position: absolute; width: 4px; height: 6px; border: 2px solid #fff; border-left: 0; border-top: 0; left: 6px; top: 4px; transform-origin: center; transform: rotate(45deg) scaleY(1);}

.file_click{position: absolute; z-index: 10; opacity: 0; color: #595; width: 40px; height: 40px; line-height: 40px; font-size: 20px; text-align: center;}
.file_state:hover .file_click{opacity: 0.7;}
.file_active .file_click{opacity: 1;}
.file_active .file_click .check{background-color: #595;}
.file_active:hover .file_click{opacity: 1;}
.file_active .file{border-color: #595; background-color: #F2F4F6;}

/* 文件夹 */
.file_ct{width: 100%; height: 84px; line-height: 84px; text-align: center;}
.file_ct .icons{font-size: 64px; color: #B9C9D6;}
.file_ct .icon_folder_solid{color: #FFD65D;}

/* 图片 */
.file_img{width: 100%; height: 100%; background-color: #F2F4F6;}
.file_img.bgImg{background-size: contain;}
</style>

<script lang="ts" src="./FileManage.ts"></script>
