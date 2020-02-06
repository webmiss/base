<template>
  <div class="in_body">
    <!-- Slide -->
    <div class="in_slide_ct">
      <ul class="swiper-wrapper">
        <li class="swiper-slide">
          <div class="ct">
            <div class="in_slide_left">
              <h1>JavaScript</h1>
              <h2>模拟Jquery写法</h2>
              <div class="text">
                <p>JavaScript一种直译式脚本语言，是一种动态类型、弱类型、基于原型的语言，内置支持类型。</p>
                <ol>
                  <li>掌握变量、函数、对象等基础知识</li>
                  <li>文档对象模型（DOM）</li>
                  <li>正则表达式和面向对象编程</li>
                </ol>
              </div>
            </div>
            <div class="in_slide_right">
  <pre><code class="language-javascript">// 变量
  var $ = function (el){
    var obj = '';
    // 选择器
    var id = /^#(.*)/;
    if(id.test(el)){
      var name = el.substr(1,el.length);
      obj = document.getElementById(name);
    }
    // 返回
    return {
      html:function(html){
        obj.innerHTML = html;
        return this;
      },
      text:function(text){
        obj.innerText = text;
        return this;
      }
    }
  }

  // 调用
  $('#id').html('&lt;h1&gt;Html&lt;/h1&gt;').text('Text');
  </code></pre>
            </div>
          </div>
        </li>
        <li class="swiper-slide">
          <div class="ct">
            <div class="in_slide_left">
              <h1>PHP</h1>
              <h2>搭建HMVC框架</h2>
              <div class="text">
                <p>PHP是一种通用开源脚本语言。语法吸收了C语言、Java和Perl的特点，主要适用于Web开发领域。</p>
                <ol>
                  <li>命名空间和自动加载类</li>
                  <li>路由参数拆分</li>
                  <li>数组和面向对象编程</li>
                </ol>
              </div>
            </div>
            <div class="in_slide_right">
  <pre><code class="language-php">// 命名空间和自动加载类
  spl_autoload_register(function($class){
    $file = strtr(__DIR__.'/../'.$class.'.php','\\',DIRECTORY_SEPARATOR);
    require $file;
  });

  // 路由参数拆分
  if(isset($_GET['_url'])){
    $arr = array_values(array_filter(explode('/',$_GET['_url'])));
    unset($_GET['_url']);
  }

  // 模块、控制器、函数
  $m = isset($arr[0])?$arr[0]:'home';
  $c = isset($arr[1])?ucwords($arr[1]):'Index';
  $a = isset($arr[2])?$arr[2]:'index';

  // 控制器
  $c = '\\app\\modules\\'.$arr[0].'\\controller\\'.$arr[1];
  $C = new $c();

  // 调用
  return $C->$a();
  </code></pre>
            </div>
          </div>
        </li>
        <li class="swiper-slide">
          <div class="ct">
            <div class="in_slide_left">
              <h1>Python</h1>
              <h2>搭建MVP框架</h2>
              <div class="text">
                <p>Python是一种语法简洁清晰，特色之一是强制用空白符(white space)作为语句缩进。</p>
                <ol>
                  <li>获取cli命令行参数</li>
                  <li>列表、元组、字典、函数、模块</li>
                  <li>面向对象编程</li>
                </ol>
              </div>
            </div>
            <div class="in_slide_right">
  <pre><code class="language-python">#!/bin/python
  # -*- coding: UTF-8 -*-
  import sys

  # 获取参数
  parameter = sys.argv
  del parameter[0]

  # 默认参数
  param = ['Index','index','','']

  # 模块、函数、参数
  if len(parameter)>=1 :
    param[0] = parameter[0]
  if len(parameter)>=2 :
    param[1] = parameter[1]
  if len(parameter)>=3:
    param[2] = parameter[2]
  if len(parameter)>=4:
    param[3] = parameter[3]

  # 加载模块
  exec('from app.modules.'+param[0]+' import *')

  # 实例化
  exec('c = '+param[0]+'('+param[3]+')');

  # 动作函数
  exec('c.'+param[1]+'('+param[2]+')');
  </code></pre>
            </div>
          </div>
        </li>
      </ul>
      <div class="swiper-pagination swiper-pagination-white"></div>
      <div class="swiper-button-next swiper-button-white"></div>
      <div class="swiper-button-prev swiper-button-white"></div>
    </div>
  </div>
</template>

<style scoped>
.in_body{overflow: hidden; height: 100%;}
.in_slide_ct{max-width: 1200px; height: 100%; margin: 0 auto;}
.in_slide_ct .ct{overflow: hidden; height:  calc(100% - 140px); padding: 100px 20px 40px;}
.in_slide_left{overflow: hidden; float: left; width: calc(40% - 40px); height:  calc(100% - 40px); color: #999; padding: 20px;}
.in_slide_left h1{font-size: 62px; font-weight: 300; color: #FFF; padding-top: 20px;}
.in_slide_left h2{font-size: 32px; font-weight: 300; color: #CCC;}
.in_slide_left .text{font-size: 16px; line-height: 32px; font-weight: 300;}
.in_slide_left .text ol{padding-left: 1.5em;}
.in_slide_left .text p{padding: 10px 0;}
.in_slide_right{overflow-y: auto; margin-left: 40%; padding: 20px; max-height: calc(100% - 40px) ; background-color: #FFF; border-radius: 3px;}
.in_slide_right h3{font-size: 14px; color: #333; line-height: 24px; padding: 5px 0;}
.in_slide_right p{margin: 8px 0; color: #666; line-height: 20px;}
</style>

<script src="./Index.js"></script>