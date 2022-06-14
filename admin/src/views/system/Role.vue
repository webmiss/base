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
          <wm-input :value="sea.form.name" @update:value="sea.form.name=$event" maxlength="16" placeholder="角色名称" />
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
        <wm-table ref="Table" :data="page.list">
          <template #title>
            <td width="60">ID</td>
            <td width="100">名称</td>
            <td width="140">创建时间</td>
            <td width="140">更新时间</td>
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
    <wm-dialog title="添加" width="420px" :show="add.show" @update:close="add.show=$event">
      <wm-form class="form">
        <wm-form-item label="名称">
          <wm-input v-model:value="add.form.name" maxlength="16" placeholder="角色名称" />
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
        <wm-form-item label="名称">
          <wm-input v-model:value="edit.form.name" maxlength="16" placeholder="角色名称" />
        </wm-form-item>
      </wm-form>
      <template #footer>
        <wm-button @click="subEdit()">保 存</wm-button>
      </template>
    </wm-dialog>
    <!-- Edit End -->

    <!-- Del -->
    <wm-dialog title="删除" width="320px" :show="del.show" @update:close="del.show=$event">
      <wm-row>是否删除已选择数据？</wm-row>
      <template #footer>
        <wm-button @click="subDel()">彻底删除</wm-button>
      </template>
    </wm-dialog>
    <!-- Del End -->

    <!-- Perm -->
    <wm-dialog title="权限" width="540px" :show="perm.show" @update:close="perm.show=$event">
      <wm-tree ref="perm" :data="perm.permList"></wm-tree>
      <template #footer>
        <wm-button @click="subPerm()">更 新</wm-button>
      </template>
    </wm-dialog>
    <!-- Perm End -->

  </div>
</template>

<style scoped>
.table{min-width: 480px;}
.form{padding-right: 24px;}
</style>

<script lang="ts" src="./Role.ts"></script>
