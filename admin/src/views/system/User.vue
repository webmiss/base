<template>
  <wm-main>
    <!-- List -->
    <wm-table class="table" ref="Table" :data="page.list">
      <wm-table-title>
        <td>UID</td>
        <td>账号</td>
        <td>登录时间</td>
        <td>状态</td>
        <td>用户信息</td>
      </wm-table-title>
      <wm-table-tr v-for="(val,key) in page.list" :key="key" :value="val.uid">
        <td width="60">
          <wm-img width="40px" height="40px" radius="50%" icoSize="24px" :url="val.img" :title="val.uid"></wm-img>
        </td>
        <td width="160">
          <wm-popover type="top" effect="dark" width="180px">
            <template #body>
              <p>注册: {{ val.rtime || '无' }}</p>
              <p>更新: {{ val.utime || '无' }}</p>
            </template>
            <template #reference>
              <wm-tag size="medium">{{val.tel || val.email || val.uname}}</wm-tag>
            </template>
          </wm-popover>
        </td>
        <td width="160">{{val.ltime || '无'}}</td>
        <td width="70">
          <wm-switch :value="val.state" @update:value="setState($event,val.uid)"></wm-switch>
        </td>
        <td>
          <wm-button v-if="val.nickname" size="medium" @click="editInfo(val)">{{val.nickname}}</wm-button>
          <wm-button v-else type="info" size="medium" @click="editInfo(val)">添加</wm-button>
        </td>
      </wm-table-tr>
    </wm-table>
    <!-- List End -->
  </wm-main>
</template>

<style scoped>
.table{min-width: 720px;}
.wm-button{margin-right: 16px;}
</style>

<script src="./User.js"></script>
