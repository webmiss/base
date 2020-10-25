<template>
  <wm-main>
    <!-- List -->
    <wm-table ref="Table" :data="page.list">
      <wm-table-title>
        <td width="180">UID</td>
        <td wudth="120">账号</td>
        <td width="70">状态</td>
        <td>用户信息</td>
      </wm-table-title>
      <wm-table-tr v-for="(val,key) in page.list" :key="key" :value="val.uid">
        <td>{{val.uid}}</td>
        <td>{{val.uname}}</td>
        <td>{{val.state}}</td>
        <td>用户信息</td>
      </wm-table-tr>
    </wm-table>
    <!-- List End -->
  </wm-main>
</template>

<style scoped>
</style>

<script src="./User.js"></script>
