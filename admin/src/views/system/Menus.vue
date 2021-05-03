<template>
  <wm-main>

    <!-- List -->
    <wm-table class="table" ref="Table" :data="page.list">
      <wm-table-title>
        <td width="30">ID</td>
        <td width="30">FID</td>
        <td width="120">名称</td>
        <td width="80">权限</td>
        <td width="60" style="text-align: center;">排序</td>
        <td>URL</td>
        <td>图标</td>
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
        <td>
          <wm-button v-if="val.controller && !val.action" type="danger" height="32px" @click="permData(val.id, val.title, val.controller, val.action)">设置</wm-button>
          <wm-button v-else-if="val.controller && val.action" height="32px" @click="permData(val.id, val.title, val.controller, val.action)">动作</wm-button>
        </td>
        <td style="text-align: center;">{{ val.sort }}</td>
        <td>{{ val.url }}</td>
        <td>{{ val.ico }}</td>
      </wm-table-tr>
    </wm-table>
    <!-- List End -->
    <wm-page :page="page.page" :limit="page.limit" :total="page.total" @update:page="subPage"></wm-page>

    <!-- Sea -->
    <wm-dialog title="搜索" width="420px" :show="sea.show" @update:show="sea.show=$event">
      <wm-form class="form">
        <wm-form-item label="FID">
          <wm-input :value="sea.form.fid" @update:value="sea.form.fid=$event" placeholder="FID" />
        </wm-form-item>
        <wm-form-item label="名称">
          <wm-input :value="sea.form.title" @update:value="sea.form.title=$event" placeholder="菜单名称" />
        </wm-form-item>
        <wm-form-item label="控制器">
          <wm-input :value="sea.form.url" @update:value="sea.form.url=$event" placeholder="菜单名称" />
        </wm-form-item>
      </wm-form>
      <template #footer>
        <wm-button @click="subSea()">搜 索</wm-button>
      </template>
    </wm-dialog>
    <!-- Sea End -->

    <!-- Add -->
    <wm-dialog title="添加" width="540px" :show="add.show" @update:show="add.show=$event">
      <wm-form class="form">
        <wm-form-item label="所属">
          <wm-input :value="add.form.fid" @update:value="add.form.fid=$event" maxlength="3" maxWidth="80px" placeholder="FID" />
        </wm-form-item>
        <wm-form-item label="名称">
          <wm-input :value="add.form.title" @update:value="add.form.title=$event" maxlength="8" maxWidth="320px" placeholder="菜单名称" />
        </wm-form-item>
        <wm-form-item label="控制器">
          <wm-input :value="add.form.controller" @update:value="add.form.controller=$event" maxlength="2" placeholder="例如: /admin/sysmenus" />
        </wm-form-item>
        <wm-form-item label="URL">
          <wm-input :value="add.form.url" @update:value="add.form.url=$event" maxlength="24" maxWidth="320px" placeholder="URL" />
        </wm-form-item>
        <wm-form-item label="图标样式">
          <wm-input :value="add.form.ico" @update:value="add.form.ico=$event" maxlength="32" maxWidth="240px" placeholder="图标样式" />
        </wm-form-item>
        <wm-form-item label="排序">
          <wm-input :value="add.form.sort" @update:value="add.form.sort=$event" maxlength="2" maxWidth="240px" placeholder="例如: 1、2、3" />
        </wm-form-item>
      </wm-form>
      <template #footer>
        <wm-button @click="subAdd()">添 加</wm-button>
      </template>
    </wm-dialog>
    <!-- Add End -->

    <!-- Edit -->
    <wm-dialog title="编辑" width="540px" :show="edit.show" @update:show="edit.show=$event">
      <wm-form class="form">
        <wm-form-item label="所属">
          <wm-input :value="edit.form.fid" @update:value="edit.form.fid=$event" maxlength="3" maxWidth="80px" placeholder="FID" />
        </wm-form-item>
        <wm-form-item label="名称">
          <wm-input :value="edit.form.title" @update:value="edit.form.title=$event" maxlength="8" maxWidth="320px" placeholder="菜单名称" />
        </wm-form-item>
        <wm-form-item label="控制器">
          <wm-input :value="edit.form.controller" @update:value="edit.form.controller=$event" maxlength="2" placeholder="例如: /admin/sysmenus" />
        </wm-form-item>
        <wm-form-item label="URL">
          <wm-input :value="edit.form.url" @update:value="edit.form.url=$event" maxlength="24" maxWidth="320px" placeholder="URL" />
        </wm-form-item>
        <wm-form-item label="图标样式">
          <wm-input :value="edit.form.ico" @update:value="edit.form.ico=$event" maxlength="32" maxWidth="240px" placeholder="图标样式" />
        </wm-form-item>
        <wm-form-item label="排序">
          <wm-input :value="edit.form.sort" @update:value="edit.form.sort=$event" maxlength="2" maxWidth="240px" placeholder="例如: 1、2、3" />
        </wm-form-item>
      </wm-form>
      <template #footer>
        <wm-button @click="subEdit()">保 存</wm-button>
      </template>
    </wm-dialog>
    <!-- Edit End -->

    <!-- Del -->
    <wm-dialog title="删除" width="320px" :show="del.show" @update:show="del.show=$event">
      <wm-row>是否删除已选择数据？</wm-row>
      <template #footer>
        <wm-button @click="subDel()">彻底删除</wm-button>
      </template>
    </wm-dialog>
    <!-- Del End -->

    <!-- Perm -->
    <wm-dialog width="640px" :title="perm.title" :show="perm.show" @update:show="perm.show=$event">
      <wm-table>
        <wm-table-title :checkbox="false">
          <td width="60">类型</td>
          <td>名称</td>
          <td>动作</td>
          <td width="100">权限</td>
          <td width="30">
            <div class="perm_an"><wm-add @click="permAdd()" /></div>
          </td>
        </wm-table-title>
        <wm-table-tr :checkbox="false" v-for="(val,key) in perm.list" :key="key">
          <td><wm-input :value="val.type" @update:value="val.type=$event" /></td>
          <td><wm-input :value="val.name" @update:value="val.name=$event" /></td>
          <td><wm-input :value="val.action" @update:value="val.action=$event" /></td>
          <td><wm-input :value="val.perm" @update:value="val.perm=$event" /></td>
          <td>
            <div class="perm_an"  @click="permRemove(key)"><wm-close /></div>
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

<script lang="ts" src="./Menus.ts"></script>
