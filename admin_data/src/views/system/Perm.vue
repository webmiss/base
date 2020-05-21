<template>
  <div>
    
    <!-- 功能菜单 -->
    <Action url="SysPerm" @action="openAction"></Action>
    <!-- 内容 -->
    <el-row class="body">
      <el-table :data="pageData.list" stripe @selection-change="getSelect">
        <el-table-column type="selection" width="45"></el-table-column>
        <el-table-column prop="uid" label="UID" width="170"></el-table-column>
        <el-table-column label="账号" width="120">
          <template slot-scope="scope">
           {{ scope.row.tel || scope.row.email || scope.row.uname }} 
          </template>
        </el-table-column>
        <el-table-column label="个人信息" width="160">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>职务: {{ scope.row.position || '无' }}</p>
              <p>昵称: {{ scope.row.nickname || '无' }}</p>
              <p>姓名: {{ scope.row.name || '无' }}</p>
              <p>性别: {{ scope.row.gender || '无' }}</p>
              <p>生日: {{ scope.row.birthday || '无' }}</p>
              <div slot="reference">
                <el-tag size="medium">{{ scope.row.name+' ('+scope.row.gender+', '+scope.row.age+'岁)' }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="登录时间" width="160">
          <template slot-scope="scope">
           <el-popover trigger="hover" placement="top">
              <p>注册: {{ scope.row.rtime || '无' }}</p>
              <p>修改: {{ scope.row.utime || '无' }}</p>
              <p>登录: {{ scope.row.ltime || '无' }}</p>
              <div slot="reference">
                <el-tag size="medium">{{ scope.row.ltime }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="70">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.state==1">正常</el-tag>
            <el-tag type="danger" v-else>禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="后台" width="70">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state_admin" inactive-color="#CCC" @change="setState('admin',scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="APP" width="70">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state_app" inactive-color="#CCC" @change="setState('app',scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-if="!scope.row.perm" type="primary" @click="eidtPerm(scope.row.uid,scope.row.perm,scope.row.role)" size="mini">角色权限</el-button>
            <el-button v-else type="danger" @click="eidtPerm(scope.row.uid,scope.row.perm,scope.row.role)" size="mini">专属权限</el-button>
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
        <el-form-item label="账号">
          <el-input v-model="seaData.form.uname" placeholder="用户名/手机号码/邮箱"></el-input>
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
        <el-form-item label="手机">
          <el-input v-model="addData.form.tel" maxlength="11" placeholder="输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="addData.form.passwd" maxlength="16" placeholder="默认密码"></el-input>
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
        <el-form-item label="手机">
          <el-input v-model="editData.form.tel" maxlength="11" placeholder="输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="editData.form.passwd" maxlength="16" placeholder="重置密码"></el-input>
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
      <el-tabs v-model="permData.active">
        <el-tab-pane label="专属权限" name="one">
          <el-tree ref="perm" :data="permData.form" show-checkbox :default-checked-keys="permData.default" node-key="id"></el-tree>
        </el-tab-pane>
        <el-tab-pane label="角色权限" name="two">
          <el-select v-model="permData.role" placeholder="请选择角色权限" clearable filterable style="width: 100%;">
            <el-option v-for="val in userRole" :key="val.id" :label="val.role" :value="val.id">
              <span class="select_left">{{ val.role }}</span>
              <span class="select_right">{{ val.id }}</span>
            </el-option>
          </el-select>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="subPerm()">更新</el-button>
      </div>
    </el-dialog>
    <!-- 权限 End -->

  </div>
</template>

<style scoped>

</style>

<script src="./Perm.js"></script>
