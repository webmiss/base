<template>
  <div class="flex">

    <!-- Search -->
    <div class="app_ct_left" v-show="sea.show">
      <wm-search v-model:show="sea.show" @update:submit="subSea()">
        <li>
          <wm-input v-model:value="sea.form.name" placeholder="分类名称" clearable />
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
        <wm-table ref="Table" :data="page.list" style="min-width: 720px;">
          <template #title>
            <td width="40">ID<wm-table-order :value="oby.list.id" @update:value="OrderBy('id', $event)" /></td>
            <td width="120">名称<wm-table-order :value="oby.list.name" @update:value="OrderBy('name', $event)" /></td>
            <td width="140">创建时间<wm-table-order :value="oby.list.ctime" @update:value="OrderBy('ctime', $event)" /></td>
            <td width="140">更新时间<wm-table-order :value="oby.list.utime" @update:value="OrderBy('utime', $event)" /></td>
            <td width="60" class="tCenter">状态</td>
            <td>排序</td>
          </template>
          <tr v-for="(val,key) in page.list" :key="key">
            <td width="30" class="checkbox wm-table_checkbox">
              <wm-checkbox :value="val.id"></wm-checkbox>
            </td>
            <td>{{ val.id }}</td>
            <td>{{ val.name }}</td>
            <td>{{ val.ctime }}</td>
            <td>{{ val.utime }}</td>
            <td class="tCenter">
              <wm-switch v-if="getters.actionShow('state')" :value="val.state" @update:value="setState($event,val.id)"></wm-switch>
              <span v-else>-</span>
            </td>
            <td>{{ val.sort }}</td>
          </tr>
        </wm-table>
        <wm-page :page="page.page" :limit="page.limit" :total="page.total" @update:page="subPage"></wm-page>
        <!-- List End -->
        </wm-main>
      </div>
    </div>
    <!-- Body End -->

    <!-- Add -->
    <wm-dialog title="添加" width="500px" v-model:show="add.show">
      <wm-table-form>
        <tr>
          <td class="lable">名称</td>
          <td>
            <wm-input v-model:value="add.form.name" maxlength="16" maxWidth="90%" placeholder="分类名称" />
          </td>
        </tr>
        <tr>
          <td class="lable">排序</td>
          <td>
            <wm-input v-model:value="add.form.sort" maxlength="2" maxWidth="90%" placeholder="例如: 1、2、3" />
          </td>
        </tr>
      </wm-table-form>
      <template #footer>
        <wm-button @click="subAdd()">添 加</wm-button>
      </template>
    </wm-dialog>
    <!-- Add End -->

    <!-- Edit -->
    <wm-dialog title="编辑" width="500px" v-model:show="edit.show">
      <wm-table-form>
        <tr>
          <td class="lable">名称</td>
          <td>
            <wm-input v-model:value="edit.form.name" maxlength="16" maxWidth="90%" placeholder="分类名称" />
          </td>
        </tr>
        <tr>
          <td class="lable">排序</td>
          <td>
            <wm-input v-model:value="edit.form.sort" maxlength="2" maxWidth="90%" placeholder="例如: 1、2、3" />
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

  </div>
</template>

<style scoped>
</style>

<script lang="ts" src="./NewsClass.ts"></script>