<template>
  <div>
    <!-- 搜索 -->
    <el-row class="tree_search">
      <el-input v-model="getSelect" placeholder="搜索菜单名称"></el-input>
    </el-row>
    <!-- 功能菜单 -->
    <Action url="SysMenus" @action="openAction"></Action>
    <!-- 内容 -->
    <el-row class="body">
      <div class="body_tree">
        <div class="flex tree_node_title">
          <div>菜单名称</div>
          <div class="flex">
            <dd style="width: 120px;">控制器</dd>
            <dd style="width: 160px;">图标</dd>
            <dd style="width: 30px;">权限</dd>
            <dd style="width: 30px;">排序</dd>
            <dd style="width: 60px;">操作</dd>
            <dd style="width: 90px;">更新日期</dd>
          </div>
        </div>
        <el-tree ref="tree" :data="listData.list" show-checkbox node-key="id" :filter-node-method="subSea">
          <span class="tree_node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <div class="flex tree_node_width">
              <dd style="width: 120px;">{{ data.url }}</dd>
              <dd style="width: 160px;">{{ data.ico }}</dd>
              <dd style="width: 30px;">{{ data.perm }}</dd>
              <dd style="width: 30px;">{{ data.sort }}</dd>
              <dd style="width: 60px;">
                <el-button size="mini" type="text" @click="showEdit(data)">编辑</el-button>
              </dd>
              <dd style="width: 90px;">{{ data.utime?data.utime.substr(0,10):'空' }}</dd>
            </div>
          </span>
        </el-tree>
      </div>
    </el-row>
    <!-- 内容 End -->

    <!-- 添加 -->
    <el-dialog title="添加" :visible.sync="addData.show" center width="680px" :close-on-click-modal="false">
      <el-form :model="addData.form" :label-width="LabelWidth">
        <el-form-item label="归属">
          <el-cascader v-model="addData.form.fid" :options="fidClass" change-on-select filterable clearable expand-trigger="hover" placeholder="默认顶级菜单" style="width: 100%; max-width: 360px;"></el-cascader>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="addData.form.title" placeholder="菜单名称" style="max-width: 360px;"></el-input>
        </el-form-item>
        <el-form-item label="链接">
          <el-input v-model="addData.form.url" placeholder="链接地址" style="max-width: 360px;"></el-input>
        </el-form-item>
        <el-form-item label="图标样式">
          <el-input v-model="addData.form.ico" placeholder="图标样式" style="max-width: 360px;"></el-input>
        </el-form-item>
        <el-form-item label="权限值">
          <el-checkbox-group v-model="addData.form.permArr">
            <el-checkbox v-for="val in aMenus" :key="val.name" :label="val.name"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="addData.form.sort" placeholder="从高到底" style="max-width: 240px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="subAdd()">添 加</el-button>
      </div>
    </el-dialog>
    <!-- 添加 End -->

    <!-- 编辑 -->
    <el-dialog title="编辑" :visible.sync="editData.show" center width="680px" :close-on-click-modal="false">
      <el-form :model="editData.form" :label-width="LabelWidth">
        <el-form-item label="归属">
          <el-cascader v-model="editData.form.fid" :options="fidClass" change-on-select filterable clearable expand-trigger="hover" placeholder="默认顶级菜单"></el-cascader>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="editData.form.title" placeholder="菜单名称" style="max-width: 360px;"></el-input>
        </el-form-item>
        <el-form-item label="链接">
          <el-input v-model="editData.form.url" placeholder="链接地址" style="max-width: 360px;"></el-input>
        </el-form-item>
        <el-form-item label="图标样式">
          <el-input v-model="editData.form.ico" placeholder="图标样式" style="max-width: 360px;"></el-input>
        </el-form-item>
        <el-form-item label="权限值">
          <el-checkbox-group v-model="editData.form.permArr">
            <el-checkbox v-for="val in aMenus" :key="val.name" :label="val.name"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="editData.form.sort" placeholder="从高到底" style="max-width: 240px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="subEdit()">保 存</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 End -->

    <!-- 删除 -->
    <el-dialog title="删除" :visible.sync="delData.show" center width="320px">
      <div>是否删除已选择数据？</div>
      <div slot="footer">
        <el-button type="primary" @click="subDel()">彻底删除</el-button>
      </div>
    </el-dialog>
    <!-- 删除 End -->

  </div>
</template>

<style scoped>
.body{overflow-x: auto;}
.body_tree{min-width: 800px;}
.tree_search{position: absolute; z-index: 99; right: 15px; margin-top: 15px;}
</style>

<script src="./Menus.js"></script>
