<template>
  <div>
    <!-- 功能菜单 -->
    <el-input class="hide" v-model="actionType"></el-input>
    <!-- 内容 -->
    <el-row class="body">
      <el-table :data="pageData.list" stripe @selection-change="getSelect">
        <el-table-column type="selection" width="45"></el-table-column>
        <el-table-column prop="id" label="ID" width="50"></el-table-column>
        <el-table-column prop="name" label="名称" width="80"></el-table-column>
        <el-table-column prop="action" label="命名" width="80"></el-table-column>
        <el-table-column prop="perm" label="权限" width="80"></el-table-column>
        <el-table-column prop="ico" label="图标"></el-table-column>
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
          <el-input v-model="seaData.form.name" placeholder="动作名称"></el-input>
        </el-form-item>
        <el-form-item label="命名">
          <el-input v-model="seaData.form.action" placeholder="英文命名"></el-input>
        </el-form-item>
        <el-form-item label="图标样式">
          <el-input v-model="seaData.form.ico" placeholder="字体图标"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="subSea()">搜 索</el-button>
      </div>
    </el-dialog>
    <!-- 搜索 End -->

    <!-- 添加 -->
    <el-dialog title="添加" :visible.sync="addData.show" center width="520px" :close-on-click-modal="false">
      <el-form :model="addData.form" :label-width="LabelWidth">
        <el-form-item label="名称">
          <el-input v-model="addData.form.name" placeholder="动作名称"></el-input>
        </el-form-item>
        <el-form-item label="命名">
          <el-input v-model="addData.form.action" placeholder="英文命名"></el-input>
        </el-form-item>
        <el-form-item label="权限值">
          <el-input v-model="addData.form.perm" style="max-width: 240px;" placeholder="2的n次方值"></el-input>
        </el-form-item>
        <el-form-item label="图标样式">
          <el-input v-model="addData.form.ico" style="max-width: 240px;" placeholder="图标样式"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="subAdd()">添 加</el-button>
      </div>
    </el-dialog>
    <!-- 添加 End -->

     <!-- 编辑 -->
    <el-dialog title="编辑" :visible.sync="editData.show" center width="520px" :close-on-click-modal="false">
      <el-form :model="editData.form" :label-width="LabelWidth">
        <el-form-item label="名称">
          <el-input v-model="editData.form.name" placeholder="动作名称"></el-input>
        </el-form-item>
        <el-form-item label="命名">
          <el-input v-model="editData.form.action" placeholder="英文命名"></el-input>
        </el-form-item>
        <el-form-item label="权限值">
          <el-input v-model="editData.form.perm" style="max-width: 240px;" placeholder="2的n次方值"></el-input>
        </el-form-item>
        <el-form-item label="图标样式">
          <el-input v-model="editData.form.ico" style="max-width: 240px;" placeholder="图标样式"></el-input>
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

</style>

<script src="./Action.js"></script>
