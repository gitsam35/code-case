<template>
  <div class="about">
    <el-card>
      <el-row :gutter="2">
        <el-col :span="10">
          <span>
            业主姓名 &nbsp;
            <el-input placeholder="请输入" v-model="searchValue" clearable style="width: 50%;"></el-input>
          </span>
          <el-button type="info" style="margin:20px" @click="search">查询</el-button>
          <el-button type="warning" style="margin:20px" @click="fetch">重置</el-button>
        </el-col>
        <el-col :span="14"></el-col>
      </el-row>

      <!-- 按钮 -->
      <div class="btn">
        <!-- <el-button type="primary" @click="handleAdd">
          <i class="el-icon-plus"></i> 新建业主用户
        </el-button>-->
        <el-button type="danger" style="margin:20px" @click="removeArticleAll(sels)">批量删除</el-button>
      </div>

      <!-- 表格 -->
      <el-table
        :data="fetchList"
        stripe
        style="width:100%"
        :header-cell-style="{background:'#e1dddd'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="username" label="业主姓名"></el-table-column>
        <el-table-column label="业主微信头像" min-width="120px">
          <template v-slot="scope">
            <img :src="scope.row.avatarUrl" style="height:80px;width:120px" />
          </template>
        </el-table-column>
        <el-table-column prop="nickName" label="业主微信昵称"></el-table-column>
        <el-table-column prop="phone" label="业主手机号"></el-table-column>

        <el-table-column label="操作" min-width="140px">
          <template v-slot="scope">
            <el-button size="small" type="danger" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[1,2,5,10,100,]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor
  },
  data() {
    return {
      idValue: "",
      fetchList: [],
      searchValue: "",
      // 分页数据
      pageNum: 1,
      pageSize: 10,
      // 总的页数
      total: 0,
      addDialogVisible: false,
      // 表单数据
      addForm: {},
      sels: [] //选中的值显示
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      // 查询
      const res = await this.$http.get(
        `rest/Users/fetch/${this.pageNum}/${this.pageSize}`
      );
      this.fetchList = res.data.data;
      this.total = res.data.total;
      this.searchValue = "";
    },
    // 分页组件 监听 pagesize改变的事件
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      if (!this.searchValue) {
        this.fetch();
      } else {
        this.search();
      }
    },
    // 监听 pageNum 改变事件
    handleCurrentChange(newPage) {
      this.pageNum = newPage;
      if (!this.searchValue) {
        this.fetch();
      } else {
        this.search();
      }
    },
    async search() {
      // 模糊查询：
      const res = await this.$http.get(
        `rest/Users/Users/${this.pageNum}/${this.pageSize}/${this.searchValue}`
      );
      this.fetchList = res.data.data;
      this.total = res.data.total;
    },

    remove(row) {
      this.$confirm(`是否确定要删除: "${row.username}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await this.$http.delete(`rest/Users/${row._id}`);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.fetch();
      });
    },

    handleSelectionChange(sels) {
      // 获取批量删除的id数据
      this.sels = sels;
    },
    // 批量删除
    async removeArticleAll(sels) {
      let ids = sels.map(item => item._id).join(); //获取所有选中行的id组成的字符串，以逗号分隔
      this.$confirm(`是否确定要批量删除`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await this.$http.delete(`rest/Users/${ids}`);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.fetch();
      });
    }
  }
};
</script>
