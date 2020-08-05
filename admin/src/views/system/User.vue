<template>
  <div>
    <!-- 功能菜单 -->
    <el-input class="hide" v-model="actionType"></el-input>
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
        <el-table-column label="登录时间" width="160">
          <template slot-scope="scope">
           <el-popover trigger="hover" placement="top">
              <p>注册: {{ scope.row.rtime || '无' }}</p>
              <p>修改: {{ scope.row.utime || '无' }}</p>
              <p>登录: {{ scope.row.ltime || '无' }}</p>
              <div slot="reference">
                <el-tag size="medium">{{ scope.row.ltime || '无' }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="70">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state" inactive-color="#CCC" @change="setState('state',scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="用户信息">
          <template slot-scope="scope">
            <el-button v-if="scope.row.nickname" type="primary" @click="eidtInfo(scope.row)" size="mini">{{scope.row.nickname}}</el-button>
            <el-button v-else type="danger" @click="eidtInfo(scope.row)" size="mini">用户信息</el-button>
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
    <el-dialog title="添加" :visible.sync="addData.show" center width="420px" :close-on-click-modal="false">
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
    <el-dialog title="编辑" :visible.sync="editData.show" center width="420px" :close-on-click-modal="false">
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
    <el-dialog title="删除" :visible.sync="delData.show" center width="320px">
      <div>是否删除已选择数据？</div>
      <div slot="footer">
        <el-button type="primary" @click="subDel()">彻底删除</el-button>
      </div>
    </el-dialog>
    <!-- 删除 End -->

    <!-- 用户信息 -->
    <el-dialog title="用户信息" :visible.sync="infoData.show" center width="420px" :close-on-click-modal="false">
      <el-form :model="infoData.form" :label-width="LabelWidth">
        <el-form-item label="昵称">
          <el-input v-model="infoData.form.nickname" placeholder="用户昵称" maxlength="8"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="infoData.form.name" placeholder="请输入真实姓名" maxlength="8"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="infoData.form.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker type="date" placeholder="选择日期" v-model="infoData.form.birthday" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="职务">
          <el-input v-model="infoData.form.position" placeholder="请输入职务" maxlength="8"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="subInfo()">更新</el-button>
      </div>
    </el-dialog>
    <!-- 用户信息 End -->

  </div>
</template>

<style scoped>

</style>

<script src="./User.js"></script>
