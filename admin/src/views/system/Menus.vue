<template>
  <wm-main>

    <!-- List -->
    <wm-table class="table" ref="Table" :data="page.list">
      <wm-table-title>
        <td width="30">ID</td>
        <td width="30">FID</td>
        <td width="120">名称</td>
        <td width="80">控制器</td>
        <td width="60">权限值</td>
        <td width="160">图标</td>
        <td width="60">排序</td>
        <td>备注</td>
      </wm-table-title>
      <wm-table-tr v-for="(val,key) in page.list" :key="key" :value="val.id">
        <td>{{ val.id }}</td>
        <td>{{ val.fid }}</td>
        <td>
          <wm-popover type="bottom" effect="dark" width="180px">
            <template #body>
              <p>创建: {{ val.ctime || '无' }}</p>
              <p>更新: {{ val.utime || '无' }}</p>
            </template>
            <template #reference>
              <wm-tag size="medium">{{val.title }}</wm-tag>
            </template>
          </wm-popover>
        </td>
        <td>{{ val.url }}</td>
        <td>{{ val.perm }}</td>
        <td>{{ val.ico }}</td>
        <td>{{ val.sort }}</td>
        <td>{{ val.remark }}</td>
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
    <wm-dialog title="添加" width="680px" :show="add.show" @update:show="add.show=$event">
      <wm-form class="form">
        <wm-form-item label="FID">
          <wm-input :value="add.form.fid" @update:value="add.form.fid=$event" maxlength="3" maxWidth="80px" placeholder="Fid" />
        </wm-form-item>
        <wm-form-item label="名称">
          <wm-input :value="add.form.title" @update:value="add.form.title=$event" maxlength="8" maxWidth="320px" placeholder="菜单名称" />
        </wm-form-item>
        <wm-form-item label="控制器">
          <wm-input :value="add.form.url" @update:value="add.form.url=$event" maxlength="24" maxWidth="320px" placeholder="控制器" />
        </wm-form-item>
        <wm-form-item label="预设权限">
          <wm-input :value="add.form.perm" @update:value="add.form.perm=$event" maxlength="4" maxWidth="80px" placeholder="权限值" />
        </wm-form-item>
        <wm-form-item label="图标样式">
          <wm-input :value="add.form.ico" @update:value="add.form.ico=$event" maxlength="32" maxWidth="240px" placeholder="图标样式" />
        </wm-form-item>
        <wm-form-item label="排序">
          <wm-input :value="add.form.sort" @update:value="add.form.sort=$event" maxlength="2" maxWidth="240px" placeholder="例如: 1、2、3" />
        </wm-form-item>
        <wm-form-item label="备注">
          <wm-input :value="add.form.remark" @update:value="add.form.remark=$event" maxlength="2" placeholder="备注信息" />
        </wm-form-item>
      </wm-form>
      <template #footer>
        <wm-button @click="subAdd()">添 加</wm-button>
      </template>
    </wm-dialog>
    <!-- Add End -->

    <!-- Edit -->
    <wm-dialog title="编辑" width="680px" :show="edit.show" @update:show="edit.show=$event">
      <wm-form class="form">
        <wm-form-item label="FID">
          <wm-input :value="edit.form.fid" @update:value="edit.form.fid=$event" maxlength="3" maxWidth="80px" placeholder="Fid" />
        </wm-form-item>
        <wm-form-item label="名称">
          <wm-input :value="edit.form.title" @update:value="edit.form.title=$event" maxlength="8" maxWidth="320px" placeholder="菜单名称" />
        </wm-form-item>
        <wm-form-item label="控制器">
          <wm-input :value="edit.form.url" @update:value="edit.form.url=$event" maxlength="24" maxWidth="320px" placeholder="控制器" />
        </wm-form-item>
        <wm-form-item label="预设权限">
          <wm-input :value="edit.form.perm" @update:value="edit.form.perm=$event" maxlength="4" maxWidth="80px" placeholder="权限值" />
        </wm-form-item>
        <wm-form-item label="图标样式">
          <wm-input :value="edit.form.ico" @update:value="edit.form.ico=$event" maxlength="32" maxWidth="240px" placeholder="图标样式" />
        </wm-form-item>
        <wm-form-item label="排序">
          <wm-input :value="edit.form.sort" @update:value="edit.form.sort=$event" maxlength="2" maxWidth="240px" placeholder="例如: 1、2、3" />
        </wm-form-item>
        <wm-form-item label="备注">
          <wm-input :value="edit.form.remark" @update:value="edit.form.remark=$event" maxlength="2" placeholder="备注信息" />
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
.table{min-width: 800px;}
.form{padding-right: 24px;}
</style>

<script lang="ts" src="./Menus.ts"></script>
