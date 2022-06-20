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
          <wm-input :value="sea.form.fid" @update:value="sea.form.fid=$event" placeholder="FID" />
        </li>
        <li>
          <wm-input :value="sea.form.title" @update:value="sea.form.title=$event" placeholder="菜单名称" />
        </li>
        <li>
          <wm-input :value="sea.form.en" @update:value="sea.form.en=$event" placeholder="英文名称" />
        </li>
        <li>
          <div class="input"><wm-input :value="sea.form.url" @update:value="sea.form.url=$event" placeholder="API关键字" /></div>
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
        <wm-table ref="Table" :data="page.list" style="min-width: 1200px;">
          <template #title>
            <td width="40">ID</td>
            <td width="40">FID</td>
            <td>名称</td>
            <td>英文</td>
            <td width="40" class="tCenter">图标</td>
            <td width="140">创建时间</td>
            <td width="140">更新时间</td>
            <td width="60" class="tCenter">排序</td>
            <td width="60" class="tCenter">权限</td>
            <td>URL</td>
            <td>API</td>
          </template>
          <tr v-for="(val,key) in page.list" :key="key">
            <td width="30" class="checkbox wm-table_checkbox">
              <wm-checkbox :value="val.id"></wm-checkbox>
            </td>
            <td>{{ val.id }}</td>
            <td>{{ val.fid }}</td>
            <td><b>{{ val.title }}</b></td>
            <td>{{ val.en }}</td>
            <td class="tCenter">
              <span class="menus_icon" v-if="val.ico"><i :class="val.ico"></i></span>
              <span v-else>-</span>
            </td>
            <td>{{ val.ctime }}</td>
            <td>{{ val.utime }}</td>
            <td class="tCenter">{{ val.sort }}</td>
            <td class="tCenter">
              <wm-button type="text" textColor="danger" v-if="getters.actionShow('perm') && val.controller && !val.action" @click="permData(val.id, val.title, val.controller, val.action)">设置</wm-button>
              <wm-button type="text" v-else-if="getters.actionShow('perm') && val.controller && val.action" @click="permData(val.id, val.title, val.controller, val.action)">编辑</wm-button>
              <span v-else>-</span>
            </td>
            <td>{{ val.url }}</td>
            <td>{{ val.controller }}</td>
          </tr>
        </wm-table>
        <wm-page :page="page.page" :limit="page.limit" :total="page.total" @update:page="subPage"></wm-page>
        <!-- List End -->
        </wm-main>
      </div>
    </div>
    <!-- Body End -->

    <!-- Add -->
    <wm-dialog title="添加" width="700px" :show="add.show" @update:close="add.show=$event">
      <wm-form class="form">
        <wm-form-item label="所属">
          <wm-cascader width="240px" :value="menus.value" @update:value="menus.value=$event" :data="menus.data" checkStrictly clearable />
        </wm-form-item>
        <wm-form-item label="名称">
          <wm-input v-model:value="add.form.title" maxlength="8" maxWidth="80%" placeholder="菜单名称" clearable />
        </wm-form-item>
        <wm-form-item label="英文">
          <wm-input v-model:value="add.form.en" maxlength="16" maxWidth="80%" placeholder="英文名称" clearable />
        </wm-form-item>
        <wm-form-item label="URL">
          <wm-input v-model:value="add.form.url" maxlength="24" maxWidth="80%" placeholder="URL" clearable />
        </wm-form-item>
        <wm-form-item label="API">
          <wm-input v-model:value="add.form.controller" maxlength="64" maxWidth="80%" placeholder="例如: /admin/sys_menus" clearable />
        </wm-form-item>
        <wm-form-item label="图标样式">
          <wm-input v-model:value="add.form.ico" maxlength="32" maxWidth="80%" placeholder="图标样式" clearable />
        </wm-form-item>
        <wm-form-item label="排序">
          <wm-input v-model:value="add.form.sort" maxlength="2" maxWidth="240px" placeholder="例如: 1、2、3" />
        </wm-form-item>
      </wm-form>
      <template #footer>
        <wm-button @click="subAdd()">添 加</wm-button>
      </template>
    </wm-dialog>
    <!-- Add End -->

    <!-- Edit -->
    <wm-dialog title="编辑" width="700px" :show="edit.show" @update:close="edit.show=$event">
      <wm-form class="form">
        <wm-form-item label="所属">
          <wm-cascader width="240px" v-model:value="menus.value" :data="menus.data" checkStrictly clearable />
        </wm-form-item>
        <wm-form-item label="名称">
          <wm-input v-model:value="edit.form.title" maxlength="8" maxWidth="80%" placeholder="菜单名称" clearable />
        </wm-form-item>
        <wm-form-item label="英文">
          <wm-input v-model:value="edit.form.en" maxlength="16" maxWidth="80%" placeholder="英文名称" clearable />
        </wm-form-item>
        <wm-form-item label="URL">
          <wm-input v-model:value="edit.form.url" maxlength="24" maxWidth="80%" placeholder="URL" clearable />
        </wm-form-item>
        <wm-form-item label="API">
          <wm-input v-model:value="edit.form.controller" maxlength="64" maxWidth="80%" placeholder="例如: /admin/sys_menus" clearable />
        </wm-form-item>
        <wm-form-item label="图标样式">
          <wm-input v-model:value="edit.form.ico" maxlength="32" maxWidth="80%" placeholder="图标样式" clearable />
        </wm-form-item>
        <wm-form-item label="排序">
          <wm-input v-model:value="edit.form.sort" maxlength="2" maxWidth="240px" placeholder="例如: 1、2、3" />
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
    <wm-dialog width="640px" :title="perm.title" :show="perm.show" @update:close="perm.show=$event">
      <wm-table :isCheckbox="false">
        <template #title>
          <td>名称</td>
          <td>动作</td>
          <td width="100">权限</td>
          <td width="30">
            <div class="perm_an"><wm-add @click="permAdd()" /></div>
          </td>
        </template>
        <tr v-for="(val,key) in perm.list" :key="key">
          <td><wm-input :value="val.name" @update:value="val.name=$event" /></td>
          <td><wm-input :value="val.action" @update:value="val.action=$event" /></td>
          <td><wm-input :value="val.perm" @update:value="val.perm=$event" /></td>
          <td>
            <div class="perm_an" ><wm-close @click="permRemove(key)" /></div>
          </td>
        </tr>
      </wm-table>
      <template #footer>
        <wm-button @click="subPerm()">更 新</wm-button>
      </template>
    </wm-dialog>
    <!-- Perm End -->

  </div>
</template>

<style lang="less" scoped>
.table{min-width: 800px;}
.form{padding-right: 24px;}
.perm_an{position: absolute; margin-top: -14px; white-space: nowrap;}
.menus_icon{position: absolute; transform: translate(-50%, -50%);}
.menus_icon i{font-size: 20px; color: @Primary;}
</style>

<script lang="ts" src="./Menus.ts"></script>
