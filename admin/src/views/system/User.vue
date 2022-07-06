<template>
  <div class="flex">

    <!-- Search -->
    <div class="app_ct_left" v-show="sea.show">
      <wm-search v-model:show="sea.show" @update:submit="subSea()">
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
      </wm-search>
    </div>
    <!-- Search End -->

    <!-- Body -->
    <div class="app_ct_right" :style="{width: sea.show?'calc(100% - 240px)':'100%'}">
      <!-- Action -->
      <div class="app_action_body flex_left">
        <div class="app_action_sea" v-show="!sea.show" @click="sea.show=true"><i class="ui ui_search"></i></div>
        <ul class="app_action_list flex_left">
          <li v-if="getters.actionShow('add')" @click="add.show=true">添加</li>
          <li v-if="getters.actionShow('edit')" @click="editData()">编辑</li>
          <li v-if="getters.actionShow('del')" @click="delData()">删除</li>
        </ul>
      </div>
      <div class="app_ct_body">
        <wm-main>
        <!-- List -->
        <wm-table ref="Table" :data="page.list" style="min-width: 1200px;">
          <template #title>
            <td width="60">UID<wm-table-order :value="oby.list['a.id']" @update:value="OrderBy('a.id', $event)" /></td>
            <td>账号<wm-table-order :value="oby.list['a.tel']" @update:value="OrderBy('a.tel', $event)" /></td>
            <td width="100">登录时间<wm-table-order :value="oby.list['a.ltime']" @update:value="OrderBy('a.ltime', $event)" /></td>
            <td>昵称<wm-table-order :value="oby.list['b.nickname']" @update:value="OrderBy('b.nickname', $event)" /></td>
            <td width="60">姓名<wm-table-order :value="oby.list['b.name']" @update:value="OrderBy('b.name', $event)" /></td>
            <td width="40">性别<wm-table-order :value="oby.list['b.gender']" @update:value="OrderBy('b.gender', $event)" /></td>
            <td width="100">生日<wm-table-order :value="oby.list['b.birthday']" @update:value="OrderBy('b.birthday', $event)" /></td>
            <td>部门<wm-table-order :value="oby.list['b.department']" @update:value="OrderBy('b.department', $event)" /></td>
            <td>职务<wm-table-order :value="oby.list['b.position']" @update:value="OrderBy('b.position', $event)" /></td>
            <td width="60" class="tCenter">状态</td>
            <td width="60" class="tCenter">系统权限</td>
            <td width="60" class="tCenter">API权限</td>
            <td width="60" class="tCenter">个人信息</td>
          </template>
          <tr v-for="(val,key) in page.list" :key="key">
            <td width="30" class="checkbox wm-table_checkbox">
              <wm-checkbox :value="val.uid"></wm-checkbox>
            </td>
            <td>
              <wm-img width="28px" height="28px" radius="50%" icoSize="16px" :url="val.img" :title="val.uid+''"></wm-img>
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
            <td class="tCenter">{{ val.gender || '-' }}</td>
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
    <wm-dialog title="添加" width="480px" v-model:show="add.show">
      <wm-table-form>
        <tr>
          <td class="lable">手机</td>
          <td>
            <wm-input v-model:value="add.form.tel" maxlength="11" placeholder="输入手机号码" clearable />
          </td>
        </tr>
        <tr>
          <td class="lable">密码</td>
          <td>
            <wm-input v-model:value="add.form.passwd" maxlength="16" placeholder="默认密码" clearable />
          </td>
        </tr>
      </wm-table-form>
      <template #footer>
        <wm-button @click="subAdd()">添 加</wm-button>
      </template>
    </wm-dialog>
    <!-- Add End -->

    <!-- Edit -->
    <wm-dialog title="编辑" width="480px" v-model:show="edit.show">
      <wm-table-form>
        <tr>
          <td class="lable">手机</td>
          <td>
            <wm-input v-model:value="edit.form.tel" maxlength="11" placeholder="输入手机号码" clearable />
          </td>
        </tr>
        <tr>
          <td class="lable">密码</td>
          <td>
            <wm-input v-model:value="edit.form.passwd" maxlength="16" placeholder="默认密码" clearable />
          </td>
        </tr>
      </wm-table-form>
      <template #footer>
        <wm-button @click="subEdit()">保 存</wm-button>
      </template>
    </wm-dialog>
    <!-- Edit End -->

    <!-- Del -->
    <wm-dialog title="删除" width="360px" v-model:show="del.show">
      <wm-row>是否删除已选择数据？</wm-row>
      <template #footer>
        <wm-button @click="subDel()">彻底删除</wm-button>
      </template>
    </wm-dialog>
    <!-- Del End -->

    <!-- Info -->
    <wm-dialog title="用户信息" width="540px" v-model:show="info.show">
      <wm-table-form>
        <tr>
          <td class="lable">昵称</td>
          <td>
            <wm-input v-model:value="info.form.nickname" maxlength="12" placeholder="用户昵称" />
          </td>
        </tr>
        <tr>
          <td class="lable">姓名</td>
          <td>
            <wm-input v-model:value="info.form.name" maxlength="8" placeholder="填写姓名" />
          </td>
        </tr>
        <tr>
          <td class="lable">生日</td>
          <td>
            <wm-date v-model:value="info.form.birthday"></wm-date>
          </td>
        </tr>
        <tr>
          <td class="lable">部门</td>
          <td>
            <wm-input v-model:value="info.form.department" maxlength="8" placeholder="部门名称" />
          </td>
        </tr>
        <tr>
          <td class="lable">职务</td>
          <td>
            <wm-input v-model:value="info.form.position" maxlength="8" placeholder="职务、职称" />
          </td>
        </tr>
      </wm-table-form>
      <template #footer>
        <wm-button @click="subInfo()">更 新</wm-button>
      </template>
    </wm-dialog>
    <!-- Info End -->

    <!-- Perm -->
    <wm-dialog title="权限" width="540px" v-model:show="perm.show">
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
.content{padding: 16px 8px;}
</style>

<script lang="ts" src="./User.ts"></script>
