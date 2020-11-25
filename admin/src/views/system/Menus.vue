<template>
  <wm-main>
    <!-- List -->
    <wm-table class="table" ref="Table" :data="page.list">
      <wm-table-title>
        <td width="30">FID</td>
        <td width="120">名称</td>
        <td width="80">控制器</td>
        <td width="60">权限</td>
        <td width="160">图标</td>
        <td width="60">排序</td>
        <td>备注</td>
      </wm-table-title>
      <wm-table-tr v-for="(val,key) in page.list" :key="key" :value="val.uid">
        <td>{{ val.fid }}</td>
        <td>
          <wm-popover type="bottom" effect="dark" width="180px">
            <template #body>
              <p>创建: {{ val.ctime || '无' }}</p>
              <p>更新: {{ val.utime || '无' }}</p>
            </template>
            <template #reference>
              <wm-tag size="medium">{{val.title }}</wm-tag>
            </template>
          </wm-popover>
        </td>
        <td>{{ val.url }}</td>
        <td>{{ val.perm }}</td>
        <td>{{ val.ico }}</td>
        <td>{{ val.sort }}</td>
        <td>{{ val.remark }}</td>
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
.table{min-width: 800px;}
.form{padding-right: 24px;}
</style>

<script src="./Menus.js"></script>
