<template>
  <div>
    
    <!-- 功能菜单 -->
    <Action url="WebMsg" @action="openAction"></Action>
    <!-- 内容 -->
    <el-row class="body">
      <el-table :data="pageData.list" stripe @selection-change="getSelect">
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column prop="id" label="ID" width="50"></el-table-column>
        <el-table-column label="状态" width="90">
          <template slot-scope="scope">
            <el-button v-if="scope.row.is_new==0" @click="openShow(scope.row)" size="mini" type="primary" round>阅读</el-button>
            <el-button v-if="scope.row.is_new==1" @click="openShow(scope.row)" size="mini" type="info" round>已读</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="ctime" label="发送时间" width="180"></el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
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
        <el-form-item label="标题">
          <el-input v-model="seaData.form.title" placeholder="输入标题"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="seaData.form.content" placeholder="输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="subSea()">搜 索</el-button>
      </div>
    </el-dialog>
    <!-- 搜索 End -->

    <!-- 删除 -->
    <el-dialog title="删除" :visible.sync="delData.show" center width="320px" top="38vh">
      <div>是否删除已选择数据？</div>
      <div slot="footer">
        <el-button type="primary" @click="subDel()">彻底删除</el-button>
      </div>
    </el-dialog>
    <!-- 删除 End -->

    <!-- 阅读 -->
    <el-dialog title="阅读" class="form" :visible.sync="showData.show" center width="420px" top="30vh">
      <el-row><b class="title">{{ showData.data.title }}</b></el-row>
      <el-row>{{ showData.data.ctime }}</el-row>
      <el-row>{{ showData.data.content }}</el-row>
    </el-dialog>
    <!-- 阅读 End -->

  </div>
</template>

<style scoped>

</style>

<script src="./Msg.js"></script>
