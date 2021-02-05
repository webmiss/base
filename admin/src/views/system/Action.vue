<template>
  <wm-main>
    <!-- List -->
    <wm-table class="table" ref="Table" :data="page.list">
      <wm-table-title>
        <td width="80">名称</td>
        <td width="80">命名</td>
        <td width="40">权限</td>
        <td>图标</td>
      </wm-table-title>
      <wm-table-tr v-for="(val,key) in page.list" :key="key" :value="val.id">
        <td>{{ val.name }}</td>
        <td>{{ val.action }}</td>
        <td>{{ val.perm }}</td>
        <td>{{ val.ico }}</td>
      </wm-table-tr>
    </wm-table>
    <!-- List End -->
    <wm-page :page="page.page" :limit="page.limit" :total="page.total" @update:page="subPage"></wm-page>

    <!-- Sea -->
    <wm-dialog title="搜索" width="420px" :show="sea.show" @update:show="sea.show=$event">
      <wm-form class="form">
        <wm-form-item label="名称">
          <wm-input :value="sea.form.name" @update:value="sea.form.name=$event" placeholder="动作名称" />
        </wm-form-item>
        <wm-form-item label="命名">
          <wm-input :value="sea.form.action" @update:value="sea.form.action=$event" placeholder="英文命名" />
        </wm-form-item>
      </wm-form>
      <template #footer>
        <wm-button @click="subSea()">搜 索</wm-button>
      </template>
    </wm-dialog>
    <!-- Sea End -->

    <!-- Add -->
    <wm-dialog title="添加" width="420px" :show="add.show" @update:show="add.show=$event">
      <wm-form class="form">
        <wm-form-item label="名称">
          <wm-input :value="add.form.name" @update:value="add.form.name=$event" maxlength="16" placeholder="动作名称" />
        </wm-form-item>
        <wm-form-item label="命名">
          <wm-input :value="add.form.action" @update:value="add.form.action=$event" maxlength="16" placeholder="英文命名" />
        </wm-form-item>
        <wm-form-item label="权限值">
          <wm-input :value="add.form.perm" @update:value="add.form.perm=$event" maxlength="16" placeholder="2的n次方值" />
        </wm-form-item>
        <wm-form-item label="图标样式">
          <wm-input :value="add.form.ico" @update:value="add.form.ico=$event" maxlength="32" placeholder="图标样式" />
        </wm-form-item>
      </wm-form>
      <template #footer>
        <wm-button @click="subAdd()">添 加</wm-button>
      </template>
    </wm-dialog>
    <!-- Add End -->

    <!-- Edit -->
    <wm-dialog title="编辑" width="420px" :show="edit.show" @update:show="edit.show=$event">
      <wm-form class="form">
        <wm-form-item label="名称">
          <wm-input :value="edit.form.name" @update:value="edit.form.name=$event" maxlength="16" placeholder="动作名称" />
        </wm-form-item>
        <wm-form-item label="命名">
          <wm-input :value="edit.form.action" @update:value="edit.form.action=$event" maxlength="16" placeholder="英文命名" />
        </wm-form-item>
        <wm-form-item label="权限值">
          <wm-input :value="edit.form.perm" @update:value="edit.form.perm=$event" maxlength="16" placeholder="2的n次方值" />
        </wm-form-item>
        <wm-form-item label="图标样式">
          <wm-input :value="edit.form.ico" @update:value="edit.form.ico=$event" maxlength="32" placeholder="图标样式" />
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

  </wm-main>
</template>

<style scoped>
.table{min-width: 600px;}
.form{padding-right: 24px;}
</style>

<script lang="ts" src="./Action.ts"></script>
