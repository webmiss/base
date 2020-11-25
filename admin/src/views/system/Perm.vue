<template>
  <wm-main>
    <!-- List -->
    <wm-table class="table" ref="Table" :data="page.list">
      <wm-table-title>
        <td width="60">UID</td>
        <td width="160">个人信息</td>
        <td width="180">登录时间</td>
        <td width="60">状态</td>
        <td width="60">后台</td>
        <td width="60">APP</td>
        <td>操作</td>
      </wm-table-title>
      <wm-table-tr v-for="(val,key) in page.list" :key="key" :value="val.uid">
        <td>
          <wm-img width="40px" height="40px" radius="50%" icoSize="24px" :url="val.img" :title="val.uid"></wm-img>
        </td>
        <td>
          <wm-popover type="bottom" effect="dark" width="180px">
            <template #body>
              <p>昵称: {{ val.nickname || '无' }}</p>
              <p>姓名: {{ val.name || '无' }}</p>
              <p>性别: {{ val.gender || '无' }}</p>
              <p>生日: {{ val.birthday || '无' }}</p>
              <p>职务: {{ val.position || '无' }}</p>
            </template>
            <template #reference>
              <wm-tag size="medium">{{val.tel || val.email || val.uname}}</wm-tag>
            </template>
          </wm-popover>
        </td>
        <td>
          <wm-popover type="bottom" effect="dark" width="180px">
            <template #body>
              <p>注册: {{ val.rtime || '无' }}</p>
              <p>更新: {{ val.utime || '无' }}</p>
            </template>
            <template #reference>
              <wm-tag size="medium">{{val.ltime || '无'}}</wm-tag>
            </template>
          </wm-popover>
        </td>
        <td>
          <wm-switch :value="val.state" @update:value="setState($event,val.uid)"></wm-switch>
        </td>
        <td>
          <wm-switch :value="val.state_admin" @update:value="setState($event,val.uid)"></wm-switch>
        </td>
        <td>
          <wm-switch :value="val.state_app" @update:value="setState($event,val.uid)"></wm-switch>
        </td>
        <td>
          <wm-button v-if="val.perm" type="danger" size="medium" @click="eidtPerm(val)">专属权限</wm-button>
          <wm-button v-else size="medium" @click="eidtPerm(val)">角色权限</wm-button>
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

<script src="./Perm.js"></script>
