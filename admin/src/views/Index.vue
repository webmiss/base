<template>
  <div class="in_body flex">
    <!-- Left -->
    <div class="in_left">
      <div class="flex">
        <!-- 快捷方式 -->
        <el-card shadow="hover" class="cut">
          <div slot="header"><span>快捷方式</span></div>
          <div class="in_ct">
            <div class="null" v-if="menus.length==0"></div>
            <ul v-else class="in_menus">
              <li v-for="(val,key) in menus" :key="key">
                <a @click="openUrl(val.ico,val.url,val.index,val.name,true)">
                  <div><i :class="val.ico?val.ico:'ico_mask ico_other'"></i></div><p class="nowrap">{{val.name}}</p>
                </a>
              </li>
            </ul>
          </div>
        </el-card>
        <!-- 数据统计 -->
        <el-card shadow="hover" class="cut">
          <div slot="header"><span>数据统计</span></div>
          <div class="flex">
            <div class="in_total"><p>注册用户</p><h2 class="c_main">0</h2></div>
            <div class="in_total"><p>订单数</p><h2 class="c_main">0</h2></div>
          </div>
          <div class="flex">
            <div class="in_total"><p>总收入</p><h2 class="c_main">0</h2></div>
            <div class="in_total"><p>今日交易量</p><h2 class="c_main">0</h2></div>
          </div>
        </el-card>
      </div>
      <!-- 图表统计 -->
      <el-card shadow="hover">
        <div slot="header"><span>图表统计</span></div>
        <div id="chart" class="in_chart"></div>
      </el-card>
      <div class="flex">
        <!-- 性别统计 -->
        <el-card shadow="hover" class="cut">
          <div slot="header"><span>性别统计</span></div>
          <div id="chart1" class="in_chart_other"></div>
        </el-card>
        <!-- 产品统计 -->
        <el-card shadow="hover" class="cut">
          <div slot="header"><span>产品统计</span></div>
          <div id="chart2" class="in_chart_other"></div>
        </el-card>
      </div>
    </div>
    <!-- Left End -->
    <!-- Right -->
    <div class="in_right">
      <!-- 效益报告 -->
      <el-card shadow="hover">
        <div slot="header"><span>本月效益报告</span></div>
        <div class="in_ratio">
          <div class="title"><label>订单转化率</label><span> (增长10%)</span></div>
          <el-progress :percentage="60"></el-progress>
          <div class="title"><label>任务计划</label><span> (下降20%)</span></div>
          <el-progress :percentage="80" color="#FF6600"></el-progress>
        </div>
      </el-card>
      <!-- 数据监控 -->
      <el-card shadow="hover">
        <div slot="header"><span>数据监控</span></div>
        <div class="in_trend">
          <el-progress type="circle" :percentage="30"></el-progress>
        </div>
      </el-card>
      <!-- 我的消息 -->
      <el-card shadow="hover">
        <div slot="header"><span>我的消息</span></div>
        <el-timeline v-if="msg.length!=0">
          <el-timeline-item v-for="(val,key) in msg" :key="key" :timestamp="val.ctime" type="primary" placement="top">
              <el-card>
                <el-tag type="primary" size="mini">{{ val.title }}</el-tag>
                <div class="msg_ct">{{ val.content }}</div>
              </el-card>
          </el-timeline-item>
        </el-timeline>
        <div class="null" v-else></div>
      </el-card>
    </div>
    <!-- Right End -->
  </div>
</template>

<style scoped>

/* UI */
.el-card{margin-bottom: 15px;}

/* 内容 */
.in_body{overflow: hidden; padding: 15px 15px 0;}
.in_left{width: calc(67% - 15px);}
.in_left .cut{width: calc(50% - 10px);}
.in_right{width: 33%;}
.in_ct{overflow: hidden; height: 180px;}

/* 响应式 */
@media screen and ( max-width: 990px ) {
  .in_left{width: 100%;}
  .in_left .cut{width: 100%;}
  .in_right{width: 100%;}
}

/* 快捷方式 */
.in_menus{overflow: hidden;}
.in_menus li{float: left; width: calc(25% - 10px); padding: 0 5px; text-align: center;}
.in_menus a{display: block;}
.in_menus div{padding: 10px 0; background-color: #F8F8F8; font-size: 20px;}
.in_menus p{line-height: 30px; color: #666; font-size: 12px;}
.in_menus .ico_mask{width: 36px; height: 36px; display: inline-block; background-color: #6FB737;}

/* 数据统计 */
.in_total{width: calc(50% - 30px); padding: 10px; margin: 5px 0; background-color: #F8F8F8; text-align: center;}
.in_total p{line-height: 24px; color: #666; font-size: 12px;}
.in_total h2{font-size: 24px; line-height: 34px; font-weight: normal;}

/* 图表统计 */
.in_chart{text-align: center;}
.in_chart_other{text-align: center;}

/* 效益报告 */
.in_ratio{padding: 0px 0 15px;}
.in_ratio .title{line-height: 30px; padding-top: 10px; color: #666;}
.in_ratio label{font-size: 14px;}
.in_ratio span{font-size: 12px;}

/* 数据监控 */
.in_trend{padding: 10px 0; text-align: center;}

/* 我的消息 */
.msg_ct{line-height: 21px; padding: 10px 0 5px;}
</style>

<script src="./Index.js"></script>
