<template>
  <div>

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
    <div class="file_load" :style="{backgroundImage: 'linear-gradient(to right, #6FB737, #6FB737 '+info.loaded+', #F2F4F6 '+info.loaded+', #F2F4F6 100%)'}">
      <span class="text" :style="{width:info.loaded}">{{info.loaded!='0%'&&info.loaded!='100%'?info.loaded:''}}</span>
    </div>
    <!-- 文件信息 End -->

    <!-- 列表 -->
    <ul class="file_body" v-if="lists.folder.length!=0 || lists.files.length!=0">
        <!-- 文件夹 -->
        <li v-for="(val,key) in lists.folder" :key="'dir'+key" :class="val.check?'file_active':'file_state'">
          <div class="file_click" @click="val.check=!val.check"><i class="check"></i></div>
          <div class="file" @click="openFolder(val.name)">
            <div class="file_ct">
              <i class="icons icon_folder"></i>
            </div>
            <div class="name nowrap" :title="val.name">{{ val.name }}</div>
          </div>
        </li>
        <!-- 文件 -->
        <li v-for="(val,key) in lists.files" :key="'file'+key" :class="val.check?'file_active':'file_state'">
          <div class="file_click" @click="val.check=!val.check"><i class="check"></i></div>
          <div class="file" @click="openFile(val.name)">
            <div class="file_ct">
              <div class="file_img bgImg" v-if="isImg(val.ext)" :style="{backgroundImage:'url('+url+lists.path+val.name+')'}"></div>
              <i class="icons icon_file_text" v-else></i>
            </div>
            <div class="name nowrap" :title="val.name">{{ val.name }}</div>
          </div>
        </li>
      </ul>
      <!-- 列表 End -->

  </div>
</template>

<style scoped>
/* 信息 */
.file_path{line-height: 20px; padding: 16px;}
.file_path a{color: #333; user-select: none;}
.file_path a:hover{color: #6FB737;}
.file_path .path{color: #999;}
.file_path .path span{padding: 5px 8px;}
.file_path .info{position: absolute; right: 16px; color: #999; background-color: #FFF; font-size: 12px;}
.file_load{width: 100%; height: 4px; line-height: 4px; font-size: 12px; background-color: #F2F4F6;}
.file_load span{display: inline-block;}
.file_load .text{position: absolute; padding-top: 10px; text-align: right;}

/* 列表 */
.file_body{overflow: hidden; padding: 20px 5px;}
.file_body li{float: left; margin: 5px;}
.file{width: 128px; height: 128px; border: #FFF 1px solid; border-radius: 5px;}
.file:hover{background-color: #F2F4F6;}
.file .name{line-height: 40px; text-align: center; padding: 0 5px;}

/* 选择 */
.check{position: absolute; width: 18px; height: 18px; margin: 10px 0 0 -10px; background-color: #24292E; border-radius: 50%;}
.check:after{content: ""; position: absolute; width: 4px; height: 6px; border: 2px solid #fff; border-left: 0; border-top: 0; left: 6px; top: 4px; transform-origin: center; transform: rotate(45deg) scaleY(1);}

.file_click{position: absolute; z-index: 10; opacity: 0.1; color: #6FB737; width: 40px; height: 40px; line-height: 40px; font-size: 20px; text-align: center;}
.file_state:hover .file_click{opacity: 0.5;}
.file_state:hover .file_click .check{background-color: #6FB737;}
.file_active .file_click{opacity: 1;}
.file_active .file_click .check{background-color: #6FB737;}
.file_active:hover .file_click{opacity: 1;}
.file_active .file{border-color: #6FB737; background-color: #F2F4F6;}

/* 文件夹 */
.file_ct{width: 100%; height: 84px; line-height: 84px; text-align: center;}
.file_ct .icons{font-size: 64px; color: #B9C9D6;}
.file_ct .icon_folder{color: #FFD65D;}
/* 图片 */
.file_img{width: 100%; height: 100%; background-color: #F2F4F6;}
.file_img.bgImg{background-size: contain;}
</style>

<script src="./FileManage.js"></script>
