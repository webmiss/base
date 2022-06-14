<template>
  <div class="flex">

    <!-- Search -->
    <div class="app_ct_left" v-show="state.menuSea">
      <div class="app_sea_title flex">
        <h2>搜索</h2>
        <span @click="state.menuSea=false"><i class="ui ui_arrow_left"></i></span>
      </div>
      <ul class="app_sea_form">
        <li>
          <wm-input v-model:value="sea.form.uname" placeholder="用户名/手机号码/邮箱" clearable />
        </li>
        <li>
          <wm-input v-model:value="sea.form.nickname" placeholder="昵称" clearable />
        </li>
        <li>
          <wm-input v-model:value="sea.form.name" placeholder="姓名" clearable />
        </li>
        <li>
          <wm-input v-model:value="sea.form.department" placeholder="部门" clearable />
        </li>
        <li>
          <wm-input v-model:value="sea.form.position" placeholder="职务" clearable />
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
        <wm-table ref="Table" :data="page.list" style="min-width: 1080px;">
          <template #title>
            <td width="60">UID</td>
            <td>账号</td>
            <td width="100">登录时间</td>
            <td>昵称</td>
            <td>姓名</td>
            <td>性别</td>
            <td>生日</td>
            <td>部门</td>
            <td>职务</td>
            <td width="60" class="tCenter">状态</td>
            <td width="60" class="tCenter">系统权限</td>
            <td width="60" class="tCenter">API权限</td>
            <td width="60" class="tCenter">个人信息</td>
          </template>
          <tr v-for="(val,key) in page.list" :key="key">
            <td width="30" class="checkbox wm-table_checkbox">
              <wm-checkbox :value="val.id"></wm-checkbox>
            </td>
            <td>
              <wm-img width="40px" height="40px" radius="50%" icoSize="24px" :url="val.img" :title="val.uid"></wm-img>
            </td>
            <td><b>{{ val.tel || val.email || val.uname }}</b></td>
            <td>
              <wm-popover type="bottom" effect="dark" width="180px">
                <template #body>
                  <p>注册: {{ val.rtime || '无' }}</p>
                  <p>登录: {{ val.ltime || '无' }}</p>
                </template>
                <template #reference>
                  <wm-tag size="medium">{{ val.ltime.substr(0,10) }}</wm-tag>
                </template>
              </wm-popover>
            </td>
            <td>{{ val.nickname || '-' }}</td>
            <td>{{ val.name || '-' }}</td>
            <td>{{ val.gender || '-' }}</td>
            <td>{{ val.birthday || '-' }}</td>
            <td>{{ val.department || '-' }}</td>
            <td>{{ val.position || '-' }}</td>
            <td class="tCenter">
              <wm-switch v-if="getters.actionShow('state')" :value="val.state" @update:value="setState($event,val.uid)"></wm-switch>
              <span v-else>-</span>
            </td>
            <td class="tCenter">
              <wm-button type="text" textColor="info" v-if="getters.actionShow('perm') && val.sys_perm" @click="permData('admin', val.uid, val.sys_role, val.sys_perm)">私有</wm-button>
              <wm-button type="text" v-else-if="getters.actionShow('perm') && val.sys_role" @click="permData('admin', val.uid, val.sys_role, val.sys_perm)">角色</wm-button>
              <wm-button type="text" textColor="danger" v-else-if="getters.actionShow('perm')" @click="permData('admin', val.uid, val.sys_role, val.sys_perm)">分配</wm-button>
              <span v-else>-</span>
            </td>
            <td>
              <wm-button type="text" textColor="info" v-if="getters.actionShow('perm') && val.api_perm" @click="permData('api', val.uid, val.api_role, val.api_perm)">私有</wm-button>
              <wm-button type="text" v-else-if="getters.actionShow('perm') && val.api_role" @click="permData('api', val.uid, val.api_role, val.api_perm)">角色</wm-button>
              <wm-button type="text" textColor="danger" v-else-if="getters.actionShow('perm')" @click="permData('api', val.uid, val.api_role, val.api_perm)">分配</wm-button>
              <span v-else>-</span>
            </td>
            <td>
              <wm-button type="text" textColor="info" v-if="getters.actionShow('info') && val.nickname" @click="infoData(val)">修改</wm-button>
              <wm-button type="text" textColor="danger" v-else-if="getters.actionShow('info')" @click="infoData(val)">添加</wm-button>
              <span v-else>-</span>
            </td>
          </tr>
        </wm-table>
        <wm-page :page="page.page" :limit="page.limit" :total="page.total" @update:page="subPage"></wm-page>
        <!-- List End -->
        </wm-main>
      </div>
    </div>
    <!-- Body End -->

    <!-- Add -->
    <wm-dialog title="添加" width="480px" :show="add.show" @update:close="add.show=$event">
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
    <wm-dialog title="编辑" width="480px" :show="edit.show" @update:close="edit.show=$event">
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
    <wm-dialog title="用户信息" width="540px" :show="info.show" @update:close="info.show=$event">
      <wm-form class="form">
        <wm-form-item label="昵称">
          <wm-input v-model:value="info.form.nickname" maxlength="12" placeholder="用户昵称" />
        </wm-form-item>
        <wm-form-item label="姓名">
          <wm-input v-model:value="info.form.name" maxlength="8" placeholder="填写姓名" />
        </wm-form-item>
        <wm-form-item label="性别">
          <wm-radio v-model:value="info.form.gender" :data="gender"></wm-radio>
        </wm-form-item>
        <wm-form-item label="生日">
          <wm-date v-model:value="info.form.birthday"></wm-date>
        </wm-form-item>
        <wm-form-item label="部门">
          <wm-input v-model:value="info.form.department" maxlength="8" placeholder="部门名称" />
        </wm-form-item>
        <wm-form-item label="职务">
          <wm-input v-model:value="info.form.position" maxlength="8" placeholder="职务、职称" />
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
