<template>
  <wm-main>

    <!-- Action -->
    <div class="app_action flex_left">
      <ul class="app_action_list flex_left">
        <li v-if="getters.actionShow('add')" @click="add.show=true">添加</li>
        <li v-if="getters.actionShow('edit')" @click="editData()">编辑</li>
        <li v-if="getters.actionShow('del')" @click="delData()">删除</li>
      </ul>
      <div class="app_action_sea" @click="sea.show=!sea.show">
        <div class="arrow_up" v-if="sea.show"></div>
        <i class="icons icon_search"></i>
      </div>
    </div>

    <!-- Search -->
    <ul class="action_sea flex_left" v-if="sea.show">
      <li class="flex_left">
        <div class="title">FID</div>
        <div class="input"><wm-input :value="sea.form.fid" @update:value="sea.form.fid=$event" placeholder="请输入" /></div>
      </li>
      <li class="flex_left">
        <div class="title">名称</div>
        <div class="input"><wm-input :value="sea.form.title" @update:value="sea.form.title=$event" placeholder="菜单名称" /></div>
      </li>
      <li class="flex_left">
        <div class="title">API</div>
        <div class="input"><wm-input :value="sea.form.url" @update:value="sea.form.url=$event" placeholder="API关键字" /></div>
      </li>
      <li class="an">
        <wm-button @click="subSea()">搜 索</wm-button>
      </li>
    </ul>

    <!-- List -->
    <wm-table class="table" ref="Table" :data="page.list">
      <wm-table-title>
        <td width="40">ID</td>
        <td width="40">FID</td>
        <td width="120">名称</td>
        <td width="80">权限</td>
        <td width="40">图标</td>
        <td width="60" style="text-align: center;">排序</td>
        <td width="120">URL</td>
        <td>API</td>
      </wm-table-title>
      <wm-table-tr v-for="(val,key) in page.list" :key="key" :value="val.id+''">
        <td>{{ val.id }}</td>
        <td>{{ val.fid }}</td>
        <td>
          <wm-popover type="bottom" effect="dark" width="180px">
            <template #body>
              <p>创建: {{ val.ctime || '无' }}</p>
              <p>更新: {{ val.utime || '无' }}</p>
            </template>
            <template #reference>
              <wm-tag size="medium">{{ val.title }}</wm-tag>
            </template>
          </wm-popover>
        </td>
        <td style="text-align: center;">
          <wm-button v-if="getters.actionShow('perm') && val.controller && !val.action" type="danger" height="32px" @click="permData(val.id, val.title, val.controller, val.action)">设置</wm-button>
          <wm-button v-else-if="getters.actionShow('perm') && val.controller && val.action" height="32px" @click="permData(val.id, val.title, val.controller, val.action)">动作</wm-button>
          <span v-else>-</span>
        </td>
        <td style="text-align: center;">
          <div class="menus_icon" v-if="val.ico"><i :class="val.ico"></i></div>
          <span v-else>-</span>
        </td>
        <td style="text-align: center;">{{ val.sort }}</td>
        <td>{{ val.url }}</td>
        <td>{{ val.controller }}</td>
      </wm-table-tr>
    </wm-table>
    <wm-page :page="page.page" :limit="page.limit" :total="page.total" @update:page="subPage"></wm-page>
    <!-- List End -->

    <!-- Add -->
    <wm-dialog title="添加" width="540px" :show="add.show" @update:close="add.show=$event">
      <wm-form class="form">
        <wm-form-item label="所属">
          <wm-input v-model:value="add.form.fid" maxlength="3" maxWidth="80px" placeholder="FID" />
        </wm-form-item>
        <wm-form-item label="名称">
          <wm-input v-model:value="add.form.title" maxlength="8" maxWidth="320px" placeholder="菜单名称" />
        </wm-form-item>
        <wm-form-item label="控制器">
          <wm-input v-model:value="add.form.controller" maxlength="2" placeholder="例如: /api/test" />
        </wm-form-item>
        <wm-form-item label="URL">
          <wm-input v-model:value="add.form.url" maxlength="24" maxWidth="320px" placeholder="URL" />
        </wm-form-item>
        <wm-form-item label="图标样式">
          <wm-input v-model:value="add.form.ico" maxlength="32" maxWidth="240px" placeholder="图标样式" />
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
    <wm-dialog title="编辑" width="540px" :show="edit.show" @update:close="edit.show=$event">
      <wm-form class="form">
        <wm-form-item label="所属">
          <wm-input v-model:value="edit.form.fid" maxlength="3" maxWidth="80px" placeholder="FID" />
        </wm-form-item>
        <wm-form-item label="名称">
          <wm-input v-model:value="edit.form.title" maxlength="8" maxWidth="320px" placeholder="菜单名称" />
        </wm-form-item>
        <wm-form-item label="控制器">
          <wm-input v-model:value="edit.form.controller" maxlength="2" placeholder="例如: /api/test" />
        </wm-form-item>
        <wm-form-item label="URL">
          <wm-input v-model:value="edit.form.url" maxlength="24" maxWidth="320px" placeholder="URL" />
        </wm-form-item>
        <wm-form-item label="图标样式">
          <wm-input v-model:value="edit.form.ico" maxlength="32" maxWidth="240px" placeholder="图标样式" />
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
      <wm-table>
        <wm-table-title :checkbox="false">
          <td>名称</td>
          <td>动作</td>
          <td width="100">权限</td>
          <td width="30">
            <div class="perm_an"><wm-add @click="permAdd()" /></div>
          </td>
        </wm-table-title>
        <wm-table-tr :checkbox="false" v-for="(val,key) in perm.list" :key="key">
          <td><wm-input :value="val.name" @update:value="val.name=$event" /></td>
          <td><wm-input :value="val.action" @update:value="val.action=$event" /></td>
          <td><wm-input :value="val.perm" @update:value="val.perm=$event" /></td>
          <td>
            <div class="perm_an"><wm-close @click="permRemove(key)" /></div>
          </td>
        </wm-table-tr>
      </wm-table>
      <template #footer>
        <wm-button @click="subPerm()">更 新</wm-button>
      </template>
    </wm-dialog>
    <!-- Perm End -->

  </wm-main>
</template>

<style scoped>
.table{min-width: 800px;}
.form{padding-right: 24px;}
.perm_an{position: absolute; margin-top: -11px; white-space: nowrap;}
</style>

<script lang="ts" src="./ApiMenus.ts"></script>
