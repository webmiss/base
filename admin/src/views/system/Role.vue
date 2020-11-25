<template>
  <wm-main>
    <!-- List -->
    <wm-table class="table" ref="Table" :data="page.list">
      <wm-table-title>
        <td width="60">ID</td>
        <td width="120">名称</td>
        <td width="180">创建时间</td>
        <td width="180">更新时间</td>
        <td>操作</td>
      </wm-table-title>
      <wm-table-tr v-for="(val,key) in page.list" :key="key" :value="val.uid">
        <td>{{ val.id }}</td>
        <td>{{ val.role }}</td>
        <td>{{ val.ctime || '无' }}</td>
        <td>{{ val.utime || '无' }}</td>
        <td>
          <wm-button v-if="!val.perm" type="info" size="medium" @click="eidtPerm(val)">设置权限</wm-button>
          <wm-button v-else size="medium" @click="eidtPerm(val)">修改权限</wm-button>
        </td>
      </wm-table-tr>
    </wm-table>
    <!-- List End -->
    <wm-page :page="page.page" :limit="page.limit" :total="page.total" @update:page="subPage"></wm-page>

    <!-- Sea -->
    <wm-dialog title="搜索" width="420px" :show="sea.show" @update:show="sea.show=$event">
      <wm-form class="form">
        <wm-form-item label="账号">
          <wm-input :value="sea.form.uname" @update:value="sea.form.uname=$event" maxlength="16" placeholder="用户名/手机号码/邮箱" />
        </wm-form-item>
      </wm-form>
      <template #footer>
        <wm-button @click="subSea()">搜 索</wm-button>
      </template>
    </wm-dialog>
    <!-- Sea End -->

  </wm-main>
</template>

<style scoped>
.table{min-width: 840px;}
.form{padding-right: 24px;}
</style>

<script src="./Role.js"></script>
