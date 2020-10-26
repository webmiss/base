<template>
  <wm-main>
    <!-- List -->
    <wm-table ref="Table" :data="page.list">
      <wm-table-title>
        <td>UID</td>
        <td>账号</td>
        <td>登录时间</td>
        <td>状态</td>
        <td>用户信息</td>
      </wm-table-title>
      <wm-table-tr v-for="(val,key) in page.list" :key="key" :value="val.uid">
        <td width="180">{{val.uid}}</td>
        <td width="120">{{ val.tel || val.email || val.uname}}</td>
        <td width="160">
          <wm-popover type="top" effect="dark" width="180px">
            <template #body>
              <p>注册: {{ val.rtime || '无' }}</p>
              <p>更新: {{ val.utime || '无' }}</p>
            </template>
            <template #reference>
              <wm-tag size="medium">{{val.ltime || '无'}}</wm-tag>
            </template>
          </wm-popover>
        </td>
        <td width="70">{{val.state}}</td>
        <td>用户信息</td>
      </wm-table-tr>
    </wm-table>
    <!-- List End -->
  </wm-main>
</template>

<style scoped>
</style>

<script src="./User.js"></script>
