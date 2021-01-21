<template>
  <div class="html">
    <!-- Top -->
    <div class="top_body">
      <div class="limit top flex">
        <!-- Logo -->
        <div class="top_logo flex">
          <div class="logo"></div>
          <div class="title">{{config.title}}</div>
        </div>
        <!-- Info -->
        <div class="top_right">版本: v{{config.version}}</div>
      </div>
    </div>
    <!-- Body -->
    <div class="limit body flex">
      <div class="body_left">
        <!-- Search -->
        <div class="search">
          <wm-input :value="search.val" @update:value="seaVal" placeholder="搜索名称" />
        </div>
        <!-- Menus -->
        <div class="menus">
          <scroll-view style="height: 100%;" ref="menusScroll" :isUpper="false" :isLower="false">
            <wm-menu v-show="!search.val" ref="Menus" :data="menus" :defaultActive="menusActive" @select="menuClick"></wm-menu>
            <ul v-if="search.val && search.data.length>0" class="sea_list">
              <li v-for="(val,key) in search.data" :key="key" @click="request=val.data">{{val.title}}</li>
            </ul>
            <div v-else-if="search.val" class="sea_null">暂无结果</div>
          </scroll-view>
        </div>
        <!-- Copy -->
        <div class="copy">{{config.copy}}</div>
      </div>
      <!-- Right -->
      <div class="body_right">
        <!-- Request -->
        <div class="request">
          <!-- Url -->
          <div class="flex_left">
            <wm-input id="requestUrl" :value="request.url" @update:value="request.url=$event" placeholder="请求地址" />
            <wm-button @click="onSub()">发送请求</wm-button>
          </div>
        </div>
        <!-- Method -->
        <div class="method">
          <wm-radio :data="method" :value="request.method" @update:value="request.method=$event"></wm-radio>
        </div>
        <!-- Type -->
        <ul class="type">
          <li>
            <a :class="result.type=='param'?'active':''" @click="result.type='param'">参数</a>
          </li>
          <li>
            <a :class="result.type=='data'?'active':''" @click="result.type='data'">返回结果</a>
          </li>
        </ul>
        <!-- Content -->
        <div class="body_right_ct">
          <scroll-view class="result_body" ref="resultScroll" :isUpper="false" :isLower="false" :preventDefault="false">
            <!-- 表单 -->
            <wm-form v-if="result.type=='param'" class="max_width">
              <wm-form-item v-for="(val,key) in request.param" :key="key" :label="val.key">
                <wm-input :value="val.val" @update:value="val.val=$event" :placeholder="val.text" :title="val.text" />
              </wm-form-item>
            </wm-form>
            <!-- 结果 -->
            <wm-json-format v-if="result.type=='data'" :json="result.response"></wm-json-format>
          </scroll-view>
        </div>
        <!-- Content End -->
      </div>
      <!-- Right End -->
    </div>
  </div>
</template>

<style>
.body_left .search input{border-radius: 40px;}
.body_right .wm-form_item_label{width: 100px;}
.body_right .wm-form_item_body{margin-left: 100px;}
</style>
<style scoped>
.limit{overflow: hidden; max-width: 1280px; min-width: 768px; margin: 0 auto; padding: 0 16px;}
/* Top */
.top_body{height: 40px; line-height: 40px; padding: 8px 0; background-color: #24292E;}
.top{color: #FFF;}
.top_logo{min-width: 240px;}
.top_logo .logo{width: 40px; height: 40px; background: url(../assets/logo.svg) no-repeat center center #FFF; background-size: 70%; border-radius: 50%;}
.top_logo .title{width: calc(100% - 50px); font-size: 16px;}
.top_right{font-size: 12px; color: #999;}
/* Body */
.body{height: calc(100% - 56px);}
/* Left */
.body_left{position: relative; width: 240px; box-shadow: 1px 0 0 #F2F2F2;}
.body_left .search{height: 40px; padding: 16px; border-bottom: #F2F2F2 1px solid;}
.body_left .menus{overflow: hidden; position: absolute; width: 100%; height: calc(100% - 112px);}
.body_left .copy{position: absolute; width: 100%; bottom: 0; line-height: 40px; font-size: 12px; text-align: center; color: #999;}

.sea_list{overflow: hidden;}
.sea_list li{cursor: pointer; height: 40px; line-height: 40px; padding: 0 16px; border-radius: 4px; color: #24292E;}
.sea_list li:hover{color: #595; background-color: #F4F6F8;}
.sea_list .active{background-color: #595; color: #FFF;}
.sea_list .active:hover{background-color: #595; color: #FFF;}
.sea_null{line-height: 72px; text-align: center; color: #999;}

/* right */
.body_right{width: calc(100% - 256px); height: 100%;}
.body_right .request{height: 40px; padding: 16px 0; border-bottom: #F2F2F2 1px solid;}
.body_right .request .flex_left{width: 100%;}
.body_right .method{height: 32px; padding: 8px 0;}
.body_right .type{width: 100%; height: 32px; padding-top: 8px; border-bottom: #F2F2F2 4px solid;}
.body_right .type li{position: relative; float: left; width: 100px; height: 32px; line-height: 32px;}
.body_right .type a{position: absolute; width: 100%; height: 100%; text-align: center; color: #999; border-bottom: #F2F2F2 4px solid; border-radius: 4px 4px 0 0;}
.body_right .type a:hover{color: #595;}
.body_right .type .active{border-color: #595; color: #595;}
.body_right_ct{height: calc(100% - 200px); padding: 16px 0;}
.result_body{overflow: hidden; height: 100%;}
.max_width{max-width: 640px;}
</style>

<script src="./Index.js"></script>
