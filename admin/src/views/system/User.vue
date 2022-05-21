<template>
  <div class="flex">

    <!-- Search -->
    <div class="app_ct_left" v-show="state.menuSea">
      <div class="app_sea_title flex">
        <h2>搜索</h2>
        <span @click="state.menuSea=false"><i class="ui ui_left"></i></span>
      </div>
      <ul class="app_sea_form">
        <li>
          <wm-input :value="sea.form.uname" @update:value="sea.form.uname=$event" maxlength="16" placeholder="用户名/手机号码/邮箱" />
        </li>
      </ul>
      <div class="app_sea_sub">
        <wm-button @click="subSea()" height="32px">搜 索</wm-button>
      </div>
    </div>
    <!-- Search End -->

    <!-- Body -->
    <div class="app_ct_right" :style="{width: state.menuSea?'calc(100% - 240px)':'100%'}">
      <!-- Action -->
      <div class="app_action_body flex_left">
        <div class="app_action_sea" v-show="!state.menuSea" @click="state.menuSea=true"><i class="ui ui_search"></i></div>
        <ul class="app_action_list flex_left">
          <li v-if="getters.actionShow('add')" @click="add.show=true">添加</li>
          <li v-if="getters.actionShow('edit')" @click="editData()">编辑</li>
          <li v-if="getters.actionShow('del')" @click="delData()">删除</li>
        </ul>
      </div>
      <div class="app_ct_body">
        <wm-main>
        <!-- List -->
        <wm-table class="table" ref="Table" :data="page.list">
          <wm-table-title>
            <td width="60">UID</td>
            <td width="128">账号</td>
            <td width="60">状态</td>
            <td width="90">系统权限</td>
            <td width="90">API权限</td>
            <td>个人信息</td>
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
                  <p>注册: {{ val.rtime || '无' }}</p>
                  <p>登录: {{ val.ltime || '无' }}</p>
                </template>
                <template #reference>
                  <wm-tag size="medium">{{ val.tel || val.email || val.uname }}</wm-tag>
                </template>
              </wm-popover>
            </td>
            <td>
              <wm-switch v-if="getters.actionShow('state')" :value="val.state" @update:value="setState($event,val.uid)"></wm-switch>
              <span v-else>-</span>
            </td>
            <td>
              <wm-button v-if="getters.actionShow('perm') && val.sys_perm" type="danger" height="32px" @click="permData('admin', val.uid, val.sys_role, val.sys_perm)">私有</wm-button>
              <wm-button v-else-if="getters.actionShow('perm') && val.sys_role" height="32px" @click="permData('admin', val.uid, val.sys_role, val.sys_perm)">角色</wm-button>
              <wm-button v-else-if="getters.actionShow('perm')" type="info" height="32px" @click="permData('admin', val.uid, val.sys_role, val.sys_perm)">分配</wm-button>
              <span v-else>-</span>
            </td>
            <td>
              <wm-button v-if="getters.actionShow('perm') && val.api_perm" type="danger" height="32px" @click="permData('api', val.uid, val.api_role, val.api_perm)">私有</wm-button>
              <wm-button v-else-if="getters.actionShow('perm') && val.api_role" height="32px" @click="permData('api', val.uid, val.api_role, val.api_perm)">角色</wm-button>
              <wm-button v-else-if="getters.actionShow('perm')" type="info" height="32px" @click="permData('api', val.uid, val.api_role, val.api_perm)">分配</wm-button>
              <span v-else>-</span>
            </td>
            <td>
              <wm-button v-if="getters.actionShow('info') && val.nickname" type="info" height="32px" @click="infoData(val)">{{ val.nickname }}</wm-button>
              <wm-button v-else-if="getters.actionShow('info')" type="info" height="32px" @click="infoData(val)">无</wm-button>
              <span v-else>-</span>
            </td>
          </wm-table-tr>
        </wm-table>
        <wm-page :page="page.page" :limit="page.limit" :total="page.total" @update:page="subPage"></wm-page>
        <!-- List End -->
        </wm-main>
      </div>
    </div>
    <!-- Body End -->

    <!-- Add -->
    <wm-dialog title="添加" width="420px" :show="add.show" @update:close="add.show=$event">
      <wm-form class="form">
        <wm-form-item label="手机">
          <wm-input :value="add.form.tel" @update:value="add.form.tel=$event" maxlength="11" placeholder="输入手机号码" />
        </wm-form-item>
        <wm-form-item label="密码">
          <wm-input :value="add.form.passwd" @update:value="add.form.passwd=$event" maxlength="16" placeholder="默认密码" />
        </wm-form-item>
      </wm-form>
      <template #footer>
        <wm-button @click="subAdd()">添 加</wm-button>
      </template>
    </wm-dialog>
    <!-- Add End -->

    <!-- Edit -->
    <wm-dialog title="编辑" width="420px" :show="edit.show" @update:close="edit.show=$event">
      <wm-form class="form">
        <wm-form-item label="手机">
          <wm-input :value="edit.form.tel" @update:value="edit.form.tel=$event" maxlength="11" placeholder="输入手机号码" />
        </wm-form-item>
        <wm-form-item label="密码">
          <wm-input :value="edit.form.passwd" @update:value="edit.form.passwd=$event" maxlength="16" placeholder="重置密码" />
        </wm-form-item>
      </wm-form>
      <template #footer>
        <wm-button @click="subEdit()">保 存</wm-button>
      </template>
    </wm-dialog>
    <!-- Edit End -->

    <!-- Del -->
    <wm-dialog title="删除" width="360px" :show="del.show" @update:close="del.show=$event">
      <wm-row>是否删除已选择数据？</wm-row>
      <template #footer>
        <wm-button @click="subDel()">彻底删除</wm-button>
      </template>
    </wm-dialog>
    <!-- Del End -->

    <!-- Info -->
    <wm-dialog title="用户信息" width="420px" :show="info.show" @update:close="info.show=$event">
      <wm-form class="form">
        <wm-form-item label="昵称">
          <wm-input :value="info.form.nickname" @update:value="info.form.nickname=$event" maxlength="12" placeholder="用户昵称" />
        </wm-form-item>
        <wm-form-item label="姓名">
          <wm-input :value="info.form.name" @update:value="info.form.name=$event" maxlength="8" placeholder="填写姓名" />
        </wm-form-item>
        <wm-form-item label="性别">
          <wm-radio v-model:value="info.form.gender" :data="gender"></wm-radio>
        </wm-form-item>
        <wm-form-item label="生日">
          <wm-date :value="info.form.birthday" @update:value="info.form.birthday=$event"></wm-date>
        </wm-form-item>
        <wm-form-item label="职务">
          <wm-input :value="info.form.position" @update:value="info.form.position=$event" maxlength="8" placeholder="职务、职称" />
        </wm-form-item>
      </wm-form>
      <template #footer>
        <wm-button @click="subInfo()">更 新</wm-button>
      </template>
    </wm-dialog>
    <!-- Info End -->

    <!-- Perm -->
    <wm-dialog title="权限" width="540px" :show="perm.show" @update:close="perm.show=$event">
      <wm-tabs v-model:active="perm.active" :data="[{label:'角色', name:'role'},{label:'私有', name:'perm'}]">
        <template #role>
          <wm-radio class="content" :data="perm.roleList" :value="perm.role+''" @update:value="perm.role=$event"></wm-radio>
        </template>
        <template #perm>
          <wm-tree class="content" ref="perm" :data="perm.permList"></wm-tree>
        </template>
      </wm-tabs>
      <template #footer>
        <wm-button @click="subPerm()">更 新</wm-button>
      </template>
    </wm-dialog>
    <!-- Perm End -->

  </div>
</template>

<style scoped>
.table{min-width: 800px;}
.form{padding-right: 24px;}
.content{padding: 16px 8px;}
</style>

<script lang="ts" src="./User.ts"></script>
