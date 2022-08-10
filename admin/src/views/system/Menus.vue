<template>
  <div class="flex">

    <!-- Search -->
    <div class="app_ct_left" v-show="sea.show">
      <wm-search v-model:show="sea.show" @update:submit="subSea()">
        <li>
          <wm-input v-model:value="sea.form.fid" placeholder="FID" clearable />
        </li>
        <li>
          <wm-input v-model:value="sea.form.title" placeholder="菜单名称" clearable />
        </li>
        <li>
          <wm-input v-model:value="sea.form.en" placeholder="英文名称" clearable />
        </li>
        <li>
          <wm-input v-model:value="sea.form.url" placeholder="API关键字" clearable />
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
        <wm-table ref="Table" :data="page.list" style="min-width: 1300px;">
          <template #title>
            <td width="40">ID<wm-table-order :value="oby.list.id" @update:value="OrderBy('id', $event)" /></td>
            <td width="40">FID<wm-table-order :value="oby.list.fid" @update:value="OrderBy('fid', $event)" /></td>
            <td>名称<wm-table-order :value="oby.list.title" @update:value="OrderBy('title', $event)" /></td>
            <td>英文<wm-table-order :value="oby.list.en" @update:value="OrderBy('en', $event)" /></td>
            <td width="40" class="tCenter">图标</td>
            <td width="140">创建时间<wm-table-order :value="oby.list.ctime" @update:value="OrderBy('ctime', $event)" /></td>
            <td width="140">更新时间<wm-table-order :value="oby.list.utime" @update:value="OrderBy('utime', $event)" /></td>
            <td width="60" class="tCenter">排序</td>
            <td width="60" class="tCenter">权限</td>
            <td>URL<wm-table-order :value="oby.list.url" @update:value="OrderBy('url', $event)" /></td>
            <td>API<wm-table-order :value="oby.list.controller" @update:value="OrderBy('controller', $event)" /></td>
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
    <wm-dialog title="添加" width="700px" v-model:show="add.show">
      <wm-table-form>
        <tr>
          <td class="lable">所属</td>
          <td>
            <wm-cascader width="240px" v-model:value="menus.value" :data="menus.data" checkStrictly clearable />
          </td>
        </tr>
        <tr>
          <td class="lable">名称</td>
          <td>
            <wm-input v-model:value="add.form.title" maxlength="16" maxWidth="80%" placeholder="菜单名称" clearable />
          </td>
        </tr>
        <tr>
          <td class="lable">英文</td>
          <td>
            <wm-input v-model:value="add.form.en" maxlength="16" maxWidth="80%" placeholder="英文名称" clearable />
          </td>
        </tr>
        <tr>
          <td class="lable">URL</td>
          <td>
            <wm-input v-model:value="add.form.url" maxlength="24" maxWidth="80%" placeholder="URL" clearable />
          </td>
        </tr>
        <tr>
          <td class="lable">API</td>
          <td>
            <wm-input v-model:value="add.form.controller" maxlength="64" maxWidth="80%" placeholder="例如: /admin/sys_menus" clearable />
          </td>
        </tr>
        <tr>
          <td class="lable">图标样式</td>
          <td>
            <wm-input v-model:value="add.form.ico" maxlength="32" maxWidth="80%" placeholder="图标样式" clearable />
          </td>
        </tr>
        <tr>
          <td class="lable">排序</td>
          <td>
            <wm-input v-model:value="add.form.sort" maxlength="2" maxWidth="240px" placeholder="例如: 1、2、3" />
          </td>
        </tr>
      </wm-table-form>
      <template #footer>
        <wm-button @click="subAdd()">添 加</wm-button>
      </template>
    </wm-dialog>
    <!-- Add End -->

    <!-- Edit -->
    <wm-dialog title="编辑" width="700px" v-model:show="edit.show">
      <wm-table-form>
        <tr>
          <td class="lable">所属</td>
          <td>
            <wm-cascader width="240px" v-model:value="menus.value" :data="menus.data" checkStrictly clearable />
          </td>
        </tr>
        <tr>
          <td class="lable">名称</td>
          <td>
            <wm-input v-model:value="edit.form.title" maxlength="16" maxWidth="80%" placeholder="菜单名称" clearable />
          </td>
        </tr>
        <tr>
          <td class="lable">英文</td>
          <td>
            <wm-input v-model:value="edit.form.en" maxlength="16" maxWidth="80%" placeholder="英文名称" clearable />
          </td>
        </tr>
        <tr>
          <td class="lable">URL</td>
          <td>
            <wm-input v-model:value="edit.form.url" maxlength="24" maxWidth="80%" placeholder="URL" clearable />
          </td>
        </tr>
        <tr>
          <td class="lable">API</td>
          <td>
            <wm-input v-model:value="edit.form.controller" maxlength="64" maxWidth="80%" placeholder="例如: /admin/sys_menus" clearable />
          </td>
        </tr>
        <tr>
          <td class="lable">图标样式</td>
          <td>
            <wm-input v-model:value="edit.form.ico" maxlength="32" maxWidth="80%" placeholder="图标样式" clearable />
          </td>
        </tr>
        <tr>
          <td class="lable">排序</td>
          <td>
            <wm-input v-model:value="edit.form.sort" maxlength="2" maxWidth="240px" placeholder="例如: 1、2、3" />
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
    <wm-dialog width="640px" :title="perm.title" v-model:show="perm.show">
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
.perm_an{position: absolute; margin-top: -14px; white-space: nowrap;}
.menus_icon{position: absolute; transform: translate(-50%, -50%);}
.menus_icon i{font-size: 20px; color: @Primary;}
</style>

<script lang="ts" src="./Menus.ts"></script>
