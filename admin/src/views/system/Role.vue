<template>
  <div>
    
    <!-- 功能菜单 -->
    <Action url="SysRole" @action="openAction"></Action>
    <!-- 内容 -->
    <el-row class="body">
      <el-table :data="pageData.list" stripe @selection-change="getSelect">
        <el-table-column type="selection" width="45"></el-table-column>
        <el-table-column prop="id" label="ID" width="50"></el-table-column>
        <el-table-column prop="role" label="名称" width="180"></el-table-column>
        <el-table-column label="更新时间" width="180">
          <template slot-scope="scope">
           {{ scope.row.utime || '空' }} 
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="180">
          <template slot-scope="scope">
            <el-button v-if="!scope.row.perm" type="danger" @click="eidtPerm(scope.row.id,scope.row.perm)" size="mini">设置权限</el-button>
            <el-button v-else type="primary" @click="eidtPerm(scope.row.id,scope.row.perm)" size="mini">修改权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 分页 -->
    <el-row class="page">
      <el-pagination background layout="prev, pager, next, total" :total="pageData.total" :current-page="pageData.page" :page-size="pageData.limit" @current-change="page"></el-pagination>
    </el-row>
    <!-- 内容 End -->

    <!-- 搜索 -->
    <el-dialog title="搜索" :visible.sync="seaData.show" center width="420px">
      <el-form :model="seaData.form" :label-width="LabelWidth">
        <el-form-item label="名称">
          <el-input v-model="seaData.form.role" placeholder="角色名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="subSea()">搜 索</el-button>
      </div>
    </el-dialog>
    <!-- 搜索 End -->

    <!-- 添加 -->
    <el-dialog title="添加" :visible.sync="addData.show" center width="420px">
      <el-form :model="addData.form" :label-width="LabelWidth">
        <el-form-item label="名称">
          <el-input v-model="addData.form.role" placeholder="角色名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="subAdd()">添 加</el-button>
      </div>
    </el-dialog>
    <!-- 添加 End -->

     <!-- 编辑 -->
    <el-dialog title="编辑" :visible.sync="editData.show" center width="420px">
      <el-form :model="editData.form" :label-width="LabelWidth">
        <el-form-item label="名称">
          <el-input v-model="editData.form.role" placeholder="角色名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="subEdit()">保 存</el-button>
      </div>
    </el-dialog>
    <!-- 编辑 End -->

    <!-- 删除 -->
    <el-dialog title="删除" :visible.sync="delData.show" center width="320px" top="38vh">
      <div>是否删除已选择数据？</div>
      <div slot="footer">
        <el-button type="primary" @click="subDel()">彻底删除</el-button>
      </div>
    </el-dialog>
    <!-- 删除 End -->

    <!-- 权限 -->
    <el-dialog title="编辑权限" :visible.sync="permData.show" center width="480px" top="5vh">
      <el-tree ref="perm" :data="permData.form" show-checkbox :default-checked-keys="permData.default" node-key="id"></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="subPerm()">更新</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<style scoped>

</style>

<script src="./Role.js"></script>
