<template>
  <div class="about">
    <el-card>
      <el-row :gutter="2">
        <el-col :span="10">
          <span>
            车牌号 &nbsp;
            <el-input placeholder="请输入" v-model="searchValue" clearable style="width: 50%;"></el-input>
          </span>
          <el-button type="info" style="margin:20px" @click="search">查询</el-button>
          <el-button type="warning" style="margin:20px" @click="fetch">重置</el-button>
        </el-col>
        <el-col :span="14"></el-col>
      </el-row>

      <!-- 按钮 -->
      <div class="btn">
        <el-button type="primary" @click="handleAdd">
          <i class="el-icon-plus"></i> 新建车位
        </el-button>
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
        <el-table-column prop="communityName" label="小区名"></el-table-column>
        <el-table-column prop="name" label="车主姓名"></el-table-column>
        <el-table-column prop="phone" label="车主电话" min-width="150px"></el-table-column>

        <el-table-column prop="carNo" label="车位号"></el-table-column>
        <el-table-column prop="parkingAdress" label="车位区域">
          <template slot-scope="scope">
            <span v-if="scope.row.parkingAdress == 'under'">室内</span>
            <span v-if="scope.row.parkingAdress == 'outdoor'">室外</span>
          </template>
        </el-table-column>
        <el-table-column prop="carCard" label="车牌号"></el-table-column>

        <el-table-column label="操作" min-width="140px">
          <template v-slot="scope">
            <el-button size="small" type="primary" @click="handleEdit(scope.row._id)">修改</el-button>
            <el-button size="small" type="danger" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 对话框 -->
      <el-dialog
        :visible.sync="addDialogVisible"
        width="50%"
        :close-on-click-modal="false"
        @closed="editDialogClosed"
      >
        <h2>{{idValue ? '修改' : '新建'}}车位信息</h2>
        <el-form :model="addForm" ref="addFormRef" :rules="addFormRules" label-width="100px">
          <el-col :span="12">
            <el-form-item label="小区名:" prop="communityName">
              <el-input v-model="addForm.communityName"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="车位号:" prop="carNo">
              <el-input v-model="addForm.carNo"></el-input>
            </el-form-item>
          </el-col>
          <el-row :gutter="2">
            <el-col :span="12">
              <el-form-item label="车牌号:" prop="carCard">
                <el-input v-model="addForm.carCard"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="车位区域">
                <el-select v-model="addForm.parkingAdress">
                  <el-option label="室内" value="under"></el-option>
                  <el-option label="室外" value="outdoor"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-col :span="12">
            <el-form-item label="车主姓名:" prop="name">
              <el-input v-model="addForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="车主电话:" prop="phone">
              <el-input v-model="addForm.phone" @keyup.enter.native="addRoom"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addRoom">确 定</el-button>
        </span>
      </el-dialog>

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
export default {
  props: {
    id: {}
  }, // 获取到id值
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
      sels: [], //选中的值显示
      addFormRules: {}
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      // 查询
      const res = await this.$http.get(
        `rest/cars/fetch/${this.pageNum}/${this.pageSize}`
      );
      this.fetchList = res.data.data;
      this.total = res.data.total;
      this.searchValue = "";
    },

    async search() {
      // 模糊查询：
      const res = await this.$http.get(
        `rest/cars/cars/${this.pageNum}/${this.pageSize}/${this.searchValue}`
      );
      this.fetchList = res.data.data;
      this.total = res.data.total;
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

    async addRoom() {
      // 添加 更新
      let res;
      if (this.idValue) {
        res = await this.$http.put(`rest/cars/${this.idValue}`, this.addForm);
      } else {
        res = await this.$http.post("rest/cars", this.addForm);
      }
      this.$message({
        type: "success",
        message: "保存成功"
      });
      this.addDialogVisible = false;
      this.fetch();
    },
    editDialogClosed() {
      this.idValue = "";
      this.addForm = {};
    },
    remove(row) {
      this.$confirm(`是否确定要删除`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await this.$http.delete(`rest/cars/${row._id}`);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.fetch();
      });
    },
    async fetch2() {
      // 修改后获取数据
      const res = await this.$http.get(`rest/cars/id/${this.idValue}`);
      this.addForm = res.data;
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
        const res = await this.$http.delete(`rest/cars/${ids}`);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.fetch();
      });
    },
    handleAdd() {
      this.addDialogVisible = true;
    },
    handleEdit(id) {
      this.addDialogVisible = true;
      this.idValue = id;
      this.idValue && this.fetch2();
    }
  }
};
</script>
