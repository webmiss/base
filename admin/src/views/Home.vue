<template>
  <wm-main>
    <div class="index_body">
      <!-- <div class="index_interval">
        <wm-chart-interval :data="chartData.interval" :width="900" :height="300"></wm-chart-interval>
      </div>
      <div class="index_chart flex">
        <wm-chart-line :data="chartData.line" :width="440" :isSmooth="false"></wm-chart-line>
        <wm-chart-pie :data="chartData.pie" :width="440" html="浏览器" :htmlPosition="['46%', '46%']"></wm-chart-pie>
      </div> -->
      <!-- 今日流量 -->
      <div class="index_title flex_left">
        <h2>今日流量</h2>
        <div class="time">更新时间：{{tData.time}}</div>
      </div>
      <ul class="index_data flex_left">
        <li class="title">
          <h3>&nbsp;</h3>
          <div>
            <p>今日</p>
            <p>昨日</p>
          </div>
        </li>
        <li>
          <h3>浏览量(PV)</h3>
          <div>
            <p class="p1">{{FormatNum(this.tData.today.pv)}}</p>
            <p class="p2">{{FormatNum(this.tData.yesterday.pv)}}</p>
            <p class="p3">
              较昨日 
              <span class="up" v-if="this.tData.today.pv>=this.tData.yesterday.pv">
                <i class="icons icon_up"></i>{{FormatPercentage(this.tData.today.pv, this.tData.yesterday.pv)}}%
              </span>
              <span class="down" v-else>
                <i class="icons icon_down"></i>{{FormatPercentage(this.tData.today.pv, this.tData.yesterday.pv)}}%
              </span>
            </p>
          </div>
        </li>
        <li>
          <h3>访客数(UV)</h3>
          <div>
            <p class="p1">{{FormatNum(this.tData.today.uv)}}</p>
            <p class="p2">{{FormatNum(this.tData.yesterday.uv)}}</p>
            <p class="p3">
              较昨日 
              <span class="up" v-if="this.tData.today.uv>=this.tData.yesterday.uv">
                <i class="icons icon_up"></i>{{FormatPercentage(this.tData.today.uv, this.tData.yesterday.uv)}}%
              </span>
              <span class="down" v-else>
                <i class="icons icon_down"></i>{{FormatPercentage(this.tData.today.uv, this.tData.yesterday.uv)}}%
              </span>
            </p>
          </div>
        </li>
        <li>
          <h3>IP数</h3>
          <div>
            <p class="p1">{{FormatNum(this.tData.today.ip)}}</p>
            <p class="p2">{{FormatNum(this.tData.yesterday.ip)}}</p>
            <p class="p3">
              较昨日 
              <span class="up" v-if="this.tData.today.ip>=this.tData.yesterday.ip">
                <i class="icons icon_up"></i>{{FormatPercentage(this.tData.today.ip, this.tData.yesterday.ip)}}%
              </span>
              <span class="down" v-else>
                <i class="icons icon_down"></i>{{FormatPercentage(this.tData.today.ip, this.tData.yesterday.ip)}}%
              </span>
            </p>
          </div>
        </li>
        <li>
          <h3>跳出率</h3>
          <div>
            <p class="p1">{{this.tData.today.ratio}}%</p>
            <p class="p2">{{this.tData.yesterday.ratio}}%</p>
          </div>
        </li>
        <li>
          <h3>平均访问时长</h3>
          <div>
            <p class="p1">{{FormatHour(this.tData.today.time)}}</p>
            <p class="p2">{{FormatHour(this.tData.yesterday.time)}}</p>
          </div>
        </li>
      </ul>
      <!-- 今日流量 End -->
      <!-- 趋势分析 -->
      <div class="index_title flex_left">
        <h2>趋势分析</h2>
        <div class="index_title_menu">
          <span class="active">今天</span>|
          <span>昨天</span>|
          <span>近7天</span>|
          <span>近30天</span>
        </div>
      </div>
      <div class="index_chart">
        正在开发...
      </div>
      <!-- 趋势分析 End -->
    </div>
  </wm-main>
</template>

<style scoped>
.index_body{min-width: 800px; overflow-x: auto;}

.index_title{overflow: hidden; padding: 20px 0 10px; line-height: 24px;}
.index_title h2{font-size: 18px; padding-right: 10px; font-weight: 700;}
.index_title .time{padding: 0 10px; font-size: 12px; color: #999;}
.index_title_menu{color: #999;}
.index_title_menu span{cursor: pointer; display: inline-block; padding: 0 10px; color: #333;}
.index_title_menu span:hover{color: #595;}
.index_title_menu .active{font-weight: bold; color: #595;}

.index_data{padding: 16px; border-radius: 4px; background-color: #F2F4F6; border: #E2E4E6 1px solid;}
.index_data li{width: 18%; line-height: 22px; text-align: right;}
.index_data .title{width: 10%;}
.index_data h3{font-size: 14px; font-weight: normal; padding: 4px 16px 10px 0;}
.index_data div{border-right: #E2E4E6 2px solid; padding-right: 16px;}
.index_data li:nth-last-child(1) div{border: none;}
.index_data .p1{font-size: 18px; font-weight: 700;}
.index_data .p2{font-size: 14px;}
.index_data .p3{font-size: 12px; color: #999; padding-top: 4px;}
.index_data i{font-size: 12px;}
.index_data .up{color: #FF6600;}
.index_data .down{color: #1DC11D;}

.index_chart{padding: 16px; border: #E2E4E6 1px solid; border-radius: 4px;}

/* .index_interval{width: 100%; padding: 20px 0;}
.index_chart{width: 900px; padding: 20px 0;}
.index_test{position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%);} */
</style>

<script lang="ts" src="./Home.ts"></script>
