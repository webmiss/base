<template>
  <wm-main>
    <!-- List -->
    <wm-table class="table" ref="Table" :data="page.list">
      <wm-table-title>
        <td width="60">ID</td>
        <td width="120">名称</td>
        <td>操作</td>
      </wm-table-title>
      <wm-table-tr v-for="(val,key) in page.list" :key="key" :value="val.id+''">
        <td>{{ val.id }}</td>
        <td>
          <wm-popover type="bottom" effect="dark" width="180px">
            <template #body>
              <p>创建: {{ val.ctime || '无' }}</p>
              <p>更新: {{ val.utime || '无' }}</p>
            </template>
            <template #reference>
              <wm-tag size="medium">{{ val.name }}</wm-tag>
            </template>
          </wm-popover>
        </td>
        <td>
          <wm-button v-if="!val.perm" type="danger" height="32px" @click="permData(val.id,val.perm)">设置权限</wm-button>
          <wm-button v-else height="32px" @click="permData(val.id,val.perm)">修改权限</wm-button>
        </td>
      </wm-table-tr>
    </wm-table>
    <!-- List End -->
    <wm-page :page="page.page" :limit="page.limit" :total="page.total" @update:page="subPage"></wm-page>

    <!-- Sea -->
    <wm-dialog title="搜索" width="420px" :show="sea.show" @update:show="sea.show=$event">
      <wm-form class="form">
        <wm-form-item label="名称">
          <wm-input :value="sea.form.name" @update:value="sea.form.name=$event" maxlength="16" placeholder="角色名称" />
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
          <wm-input :value="add.form.name" @update:value="add.form.name=$event" maxlength="16" placeholder="角色名称" />
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
          <wm-input :value="edit.form.name" @update:value="edit.form.name=$event" maxlength="16" placeholder="角色名称" />
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
    <wm-dialog title="权限" width="540px" :show="perm.show" @update:show="perm.show=$event">
      <wm-tree ref="perm" :data="perm.menus"></wm-tree>
      <template #footer>
        <wm-button @click="subPerm()">更 新</wm-button>
      </template>
    </wm-dialog>
    <!-- Perm End -->

  </wm-main>
</template>

<style scoped>
.table{min-width: 480px;}
.form{padding-right: 24px;}
</style>

<script lang="ts" src="./ApiRole.ts"></script>
