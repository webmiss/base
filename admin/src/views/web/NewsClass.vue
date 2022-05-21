<template>
  <div class="flex">

    <!-- Search -->
    <div class="app_ct_left" v-show="state.menuSea">
      <div class="app_sea_title flex">
        <h2>搜索</h2>
        <span @click="state.menuSea=false"><i class="ui ui_left"></i></span>
      </div>
      <ul class="app_sea_form">
        <li>
          <wm-input v-model:value="sea.form.name" placeholder="分类名称" />
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
        <wm-table class="table" ref="Table" :data="page.list">
          <wm-table-title>
            <td width="40">ID</td>
            <td width="120">名称</td>
            <td width="120">日期</td>
            <td width="60">状态</td>
            <td>排序</td>
          </wm-table-title>
          <wm-table-tr v-for="(val,key) in page.list" :key="key" :value="val.id+''">
            <td>{{ val.id }}</td>
            <td>{{ val.name }}</td>
            <td>
              <wm-popover type="bottom" effect="dark" width="180px">
                <template #body>
                  <p>创建: {{ val.ctime || '无' }}</p>
                  <p>更新: {{ val.utime || '无' }}</p>
                </template>
                <template #reference>
                  <wm-tag size="medium">{{ val.utime.substr(0,10) }}</wm-tag>
                </template>
              </wm-popover>
            </td>
            <td>
              <wm-switch v-if="getters.actionShow('state')" :value="val.state" @update:value="setState($event,val.id)"></wm-switch>
              <span v-else>-</span>
            </td>
            <td>{{ val.sort }}</td>
          </wm-table-tr>
        </wm-table>
        <wm-page :page="page.page" :limit="page.limit" :total="page.total" @update:page="subPage"></wm-page>
        <!-- List End -->
        </wm-main>
      </div>
    </div>
    <!-- Body End -->

    <!-- Add -->
    <wm-dialog title="添加" width="500px" :show="add.show" @update:close="add.show=$event">
      <wm-form class="form">
        <wm-form-item label="名称">
          <wm-input v-model:value="add.form.name" maxlength="16" maxWidth="90%" placeholder="分类名称" />
        </wm-form-item>
        <wm-form-item label="排序">
          <wm-input v-model:value="add.form.sort" maxlength="2" maxWidth="90%" placeholder="例如: 1、2、3" />
        </wm-form-item>
        <wm-form-item label="状态">
          <wm-switch v-model:value="add.form.state"></wm-switch>
        </wm-form-item>
      </wm-form>
      <template #footer>
        <wm-button @click="subAdd()">添 加</wm-button>
      </template>
    </wm-dialog>
    <!-- Add End -->

    <!-- Edit -->
    <wm-dialog title="编辑" width="500px" :show="edit.show" @update:close="edit.show=$event">
      <wm-form class="form">
        <wm-form-item label="名称">
          <wm-input v-model:value="edit.form.name" maxlength="16" maxWidth="90%" placeholder="分类名称" />
        </wm-form-item>
        <wm-form-item label="排序">
          <wm-input v-model:value="edit.form.sort" maxlength="2" maxWidth="90%" placeholder="例如: 1、2、3" />
        </wm-form-item>
        <wm-form-item label="状态">
          <wm-switch v-model:value="edit.form.state"></wm-switch>
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

  </div>
</template>

<style scoped>
</style>

<script lang="ts" src="./NewsClass.ts"></script>