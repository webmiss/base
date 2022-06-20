<template>
  <wm-main :padding="20">
    <div class="help_html">
      <h1>开发说明</h1>
      <p>WebMIS全栈开发基础框架.前后端分离，前端采用 Vue3 + TypeScript 在Node环境下开发并封装基础UI组件和JS组件，后端采用PHP、Python、Java、Go封装数据库多连接池、Redis连接池的高性能轻量级基础框架，技术包括 PHP / Python / SpringBoot / Gin / Phalcon / Flutter / NodeJS / Vue / Socket / Redis / ResultFul API 等技术。 </p>
      <h2>开发环境搭建</h2>
      <ul>
        <li>Vue: <a href="https://webmis.vip/docs/vue/install/install" target="_black">https://webmis.vip/docs/vue/install/install</a> </li>
        <li>PHP: <a href="https://webmis.vip/docs/phalcon/install/install" target="_black">https://webmis.vip/docs/phalcon/install/install</a> </li>
        <li>Python: <a href="https://webmis.vip/docs/python/install/install" target="_black">https://webmis.vip/docs/python/install/install</a> </li>
        <li>Java: <a href="https://webmis.vip/docs/java/install/install" target="_black">https://webmis.vip/docs/java/install/install</a> </li>
        <li>Go: <a href="https://webmis.vip/docs/gin/install/install" target="_black">https://webmis.vip/docs/gin/install/install</a> </li>
      </ul>
      <h2>一、创建菜单</h2>
      <p>系统 ><span class="link" @click="openUrl('/SysMenus')">系统菜单</span>, 创建需开发的预设菜单和动作权限</p>
      <h2>二、分配权限</h2>
      <p>系统 > <span class="link" @click="openUrl('/SysUser')">系统帐户</span>, 给指定用户勾选创建的菜单和动作权限。</p>
      <h2>三、API接口</h2>
      <p>modules > admin, 创建控制器，验证权限如下:</p>
<pre>
  // PHP
  $msg = AdminToken::Verify($token, '');                              // 验证Token
  $msg = AdminToken::Verify($token, $_SERVER['REQUEST_URI']);         // Token和Action
  // Python
  msg = AdminToken.Verify(token, '')                                  // 验证Token
  msg = AdminToken.Verify(token, request.path)                        // Token和Action
  // Java
  String msg = AdminToken.Verify(token, "");                          // 验证Token
  String msg = AdminToken.Verify(token, request.getRequestURI());     // Token和Action
  // Go
  msg := (&service.AdminToken{}).Verify(token, "")                    // 验证Token
  msg := (&service.AdminToken{}).Verify(token, c.Request.RequestURI)  // Token和Action
</pre>
      <h2>四、前端功能</h2>
      <p>views > Demo.vue, 复制基础模板，是否显示菜单下的动作权限</p>
<pre>
  getters.actionShow('add')
</pre>
    </div>
  </wm-main>
</template>

<style scoped>
.help_html{overflow: hidden; font-size: 14px; line-height: 24px; padding: 10px 0 40px;}
.help_html p{padding: 8px 0; color: #666;}
.help_html ul{list-style: inside; padding: 8px 0;}
.help_html ul li{line-height: 28px;}
.help_html h1{font-size: 24px; padding: 24px 0 16px; text-align: center; font-weight: 700;}
.help_html h2{font-size: 18px; padding: 16px 0 8px; font-weight: 700;}
.help_html pre{background-color: #F2F4F8; border-radius: 4px; padding: 8px;}
</style>

<script lang="ts" src="./Help.ts"></script>