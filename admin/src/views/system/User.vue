<template>
  <div>
    <!-- 功能菜单 -->
    <Action url="SysUser" @action="openAction"></Action>
    <!-- 内容 -->
    <el-row class="body">
      <el-table :data="pageData.list" stripe @selection-change="getSelect">
        <el-table-column type="selection" width="45"></el-table-column>
        <el-table-column prop="id" label="ID" width="50"></el-table-column>
        <el-table-column label="帐号信息" width="140">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>帐号: {{ scope.row.uname }}</p>
              <p>手机: {{ scope.row.tel }}</p>
              <p>邮箱: {{ scope.row.email }}</p>
              <div slot="reference">
                <el-tag size="medium">{{ scope.row.tel || scope.row.uname || scope.row.email }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="头像" width="60">
          <template slot-scope="scope">
            <el-image class="img" v-if="scope.row.img" :src="$config.baseUrl+scope.row.img"></el-image>
            <el-image v-else src=""><div slot="error">无</div></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="nickname" label="昵称" width="100"></el-table-column>
        <el-table-column prop="ltime" label="个人信息" width="120">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name || '无' }}</p>
              <p>性别: {{ scope.row.gender || '无' }}</p>
              <p>生日: {{ scope.row.birthday || '无' }}</p>
              <p>职务: {{ scope.row.position || '无' }}</p>
              <div slot="reference">
                <el-tag type="info" size="medium">{{ scope.row.name || '空' }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="ltime" label="登录时间" width="120">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>登录时间: {{ scope.row.ltime || '无' }}</p>
              <p>更新数据: {{ scope.row.utime || '无' }}</p>
              <p>注册时间: {{ scope.row.rtime || '无' }}</p>
              <div slot="reference">
                <el-tag type="info" size="medium">{{ scope.row.ltime?scope.row.ltime.substr(0,10):'空' }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="正常/禁用" width="90">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state" inactive-color="#CCC" @change="State('all',scope.row.id,scope.row.state)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="后台登录" width="90">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state_admin" inactive-color="#CCC" @change="State('admin',scope.row.id,scope.row.state_admin)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="APP登录" width="90">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state_app" inactive-color="#CCC" @change="State('app',scope.row.id,scope.row.state_app)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="权限模式" min-width="180">
          <template slot-scope="scope">
            <el-button v-if="!scope.row.perm" type="primary" @click="eidtPerm(scope.row.id,scope.row.perm,scope.row.role)" size="mini">角色权限</el-button>
            <el-button v-else type="danger" @click="eidtPerm(scope.row.id,scope.row.perm,scope.row.role)" size="mini">专属权限</el-button>
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
    <el-dialog title="搜索" :visible.sync="seaData.show" center width="420px" top="30vh">
      <el-form :model="seaData.form" :label-width="LabelWidth">
        <el-form-item label="帐号">
          <el-input v-model="seaData.form.uname" placeholder="用户名/手机/邮箱"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="seaData.form.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="职务">
          <el-input v-model="seaData.form.position" placeholder="用户职务"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="subSea()">搜索</el-button>
      </div>
    </el-dialog>
    <!-- 搜索 End -->

    <!-- 添加 -->
    <el-dialog title="添加" :visible.sync="addData.show" center width="480px" top="26vh">
      <el-form :model="addData.form" :label-width="LabelWidth">
        <el-form-item label="用户名">
          <el-input v-model="addData.form.uname" placeholder="英文开头5~16位字符" style="max-width: 240px;"></el-input>
        </el-form-item>
        <el-form-item label="登录密码">
          <el-input v-model="addData.form.passwd" type="password" placeholder="6~16位字符 | 默认:123456"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="addData.form.tel" placeholder="手机号码" style="max-width: 240px;"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="addData.form.email" placeholder="邮箱" style="max-width: 240px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="subAdd()">添 加</el-button>
      </div>
    </el-dialog>
    <!-- 添加 End -->

    <!-- 编辑 -->
    <el-dialog title="编辑" :visible.sync="editData.show" center width="480px" top="26vh">
      <el-form :model="editData.form" :label-width="LabelWidth">
        <el-form-item label="用户名">
          <el-input v-model="editData.form.uname" placeholder="英文开头5~16位字符" style="max-width: 240px;"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="editData.form.passwd" type="password" placeholder="6~16位字符 | 空为不修改"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="editData.form.tel" placeholder="手机号码"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="editData.form.email" placeholder="邮箱"></el-input>
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

  </div>
</template>

<style scoped>
.img{float: left; width: 30px; height: 30px; border-radius: 50%;}
</style>

<script src="./User.js"></script>
