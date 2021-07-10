<template>
  <div class="about">
    <el-card>
      <el-row :gutter="2">
        <el-col :span="10">
          <span>
            维修员姓名 &nbsp;
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
          <i class="el-icon-plus"></i> 新建维修员
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
        <el-table-column prop="repairerName" label="维修员姓名"></el-table-column>
        <el-table-column prop="repairerPhone" label="维修员电话" min-width="150px"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" min-width="120px"></el-table-column>
        <el-table-column prop="updateTime" label="上次操作时间" min-width="120px"></el-table-column>

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
        <h2>{{idValue ? '修改' : '新建'}}维修员信息</h2>
        <el-form :model="addForm" ref="addFormRef" :rules="addFormRules" label-width="100px">
          <el-col :span="12">
            <el-form-item label="维修员姓名:" prop="repairerName">
              <el-input v-model="addForm.repairerName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="维修员电话:" prop="repairerPhone">
              <el-input v-model="addForm.repairerPhone"></el-input>
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
import timeFormat from "./dateFormat/date-format.js";
export default {
  data() {
    let checkMobile = (rule, value, callback) => {
      const regMobile = /^1\d{10}$/;
      if (regMobile.test(value)) {
        return callback();
      }
      callback(new Error("请输入合法11位手机号"));
    };
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
      addFormRules: {
        repairerName: [
          { required: true, message: "请输入", trigger: "blur" },
          {
            min: 2,
            max: 6,
            message: "长度在2～6个字",
            trigger: "blur"
          }
        ],
        repairerPhone: [
          { required: true, message: "请输入", trigger: "blur" },

          {
            // 使用自定义手机号规则
            validator: checkMobile,
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      // 查询
      const res = await this.$http.get(
        `rest/repairers/fetch/${this.pageNum}/${this.pageSize}`
      );
      // 起日期格式转换的作用
      res.data.data.map(v => {
        v.createTime = timeFormat(v.createTime);
        v.updateTime = timeFormat(v.updateTime);
      });
      this.fetchList = res.data.data;
      this.total = res.data.total;
      this.searchValue = "";
    },

    async search() {
      // 模糊查询：
      const res = await this.$http.get(
        `rest/repairers/repairers/${this.pageNum}/${this.pageSize}/${this.searchValue}`
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
      this.$refs.addFormRef.validate(async valid => {
        if (!valid)
          return this.$message({
            type: "warning",
            message: "请按规则填写"
          });
        let res;
        if (this.idValue) {
          res = await this.$http.put(
            `rest/repairers/${this.idValue}`,
            this.addForm
          );
        } else {
          res = await this.$http.post("rest/repairers", this.addForm);
        }
        this.$message({
          type: "success",
          message: "保存成功"
        });

        this.addDialogVisible = false;
        this.fetch();
      });
    },
    editDialogClosed() {
      this.idValue = "";
      this.addForm = {};
    },

    remove(row) {
      // 删除;
      this.$confirm(`是否确定要删除 "${row.repairerName}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await this.$http.delete(`rest/repairers/${row._id}`);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.fetch();
      });
    },
    async fetch2() {
      // 修改后获取数据
      const res = await this.$http.get(`rest/repairers/id/${this.idValue}`);
      this.addForm = res.data;
    },

    handleSelectionChange(sels) {
      // 获取批量删除的id数据
      this.sels = sels;
    },
    // 批量删除
    async removeArticleAll(sels) {
      let ids = sels.map(item => item._id).join(); //获取所有选中行的id组成的字符串，以逗号分隔
      this.$confirm(`是否确定要删除分类 ""`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await this.$http.delete(`rest/repairers/${ids}`);
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

