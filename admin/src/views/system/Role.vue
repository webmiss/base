<template>
  <div class="flex">

    <!-- Search -->
    <div class="app_ct_left" v-show="sea.show">
      <wm-search v-model:show="sea.show" @update:submit="subSea()">
        <li>
          <wm-input v-model:value="sea.form.name" maxlength="16" placeholder="角色名称" clearable />
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
        <wm-table ref="Table" :data="page.list">
          <template #title>
            <td width="60">ID<wm-table-order :value="oby.list.id" @update:value="OrderBy('id', $event)" /></td>
            <td width="100">名称<wm-table-order :value="oby.list.name" @update:value="OrderBy('name', $event)" /></td>
            <td width="140">创建时间<wm-table-order :value="oby.list.ctime" @update:value="OrderBy('ctime', $event)" /></td>
            <td width="140">更新时间<wm-table-order :value="oby.list.utime" @update:value="OrderBy('utime', $event)" /></td>
            <td width="60" class="tCenter">权限</td>
            <td>权限值</td>
          </template>
          <tr v-for="(val,key) in page.list" :key="key">
            <td width="30" class="checkbox wm-table_checkbox">
              <wm-checkbox :value="val.id"></wm-checkbox>
            </td>
            <td>{{ val.id }}</td>
            <td><b>{{ val.name }}</b></td>
            <td>{{ val.ctime }}</td>
            <td>{{ val.utime }}</td>
            <td class="tCenter">
              <wm-button type="text" textColor="danger" v-if="getters.actionShow('perm') && !val.perm" @click="permData(val.id,val.perm)">设置</wm-button>
              <wm-button type="text" v-else-if="getters.actionShow('perm')" @click="permData(val.id,val.perm)">编辑</wm-button>
              <span v-else>-</span>
            </td>
            <td>{{ val.perm }}</td>
          </tr>
        </wm-table>
        <wm-page :page="page.page" :limit="page.limit" :total="page.total" @update:page="subPage"></wm-page>
        <!-- List End -->
        </wm-main>
      </div>
    </div>
    <!-- Body End -->

    <!-- Add -->
    <wm-dialog title="添加" width="420px" v-model:show="add.show">
      <wm-table-form>
        <tr>
          <td class="lable">名称</td>
          <td>
            <wm-input v-model:value="add.form.name" maxlength="16" placeholder="角色名称" />
          </td>
        </tr>
      </wm-table-form>
      <template #footer>
        <wm-button @click="subAdd()">添 加</wm-button>
      </template>
    </wm-dialog>
    <!-- Add End -->

    <!-- Edit -->
    <wm-dialog title="编辑" width="420px" v-model:show="edit.show">
      <wm-table-form>
        <tr>
          <td class="lable">名称</td>
          <td>
            <wm-input v-model:value="edit.form.name" maxlength="16" placeholder="角色名称" />
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

    <!-- Perm -->
    <wm-dialog title="权限" width="540px" v-model:show="perm.show">
      <wm-tree ref="perm" :data="perm.permList"></wm-tree>
      <template #footer>
        <wm-button @click="subPerm()">更 新</wm-button>
      </template>
    </wm-dialog>
    <!-- Perm End -->

  </div>
</template>

<style scoped>
</style>

<script lang="ts" src="./Role.ts"></script>
