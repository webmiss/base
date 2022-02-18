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
        <div class="title">名称</div>
        <div class="input"><wm-input :value="sea.form.name" @update:value="sea.form.name=$event" maxlength="16" placeholder="角色名称" /></div>
      </li>
      <li class="an">
        <wm-button @click="subSea()">搜 索</wm-button>
      </li>
    </ul>

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
          <wm-button v-if="getters.actionShow('perm') && !val.perm" type="danger" height="32px" @click="permData(val.id,val.perm)">设置权限</wm-button>
          <wm-button v-else-if="getters.actionShow('perm')" height="32px" @click="permData(val.id,val.perm)">修改权限</wm-button>
          <span v-else>-</span>
        </td>
      </wm-table-tr>
    </wm-table>
    <wm-page :page="page.page" :limit="page.limit" :total="page.total" @update:page="subPage"></wm-page>
    <!-- List End -->

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

  </wm-main>
</template>

<style scoped>
.table{min-width: 480px;}
.form{padding-right: 24px;}
</style>

<script lang="ts" src="./Role.ts"></script>
