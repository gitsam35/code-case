<template>
  <div class="about">
    <el-card>
      <el-row :gutter="2">
        <el-col :span="10">
          <span>
            报修人姓名 &nbsp;
            <el-input placeholder="请输入" v-model="searchValue" clearable style="width: 50%;"></el-input>
          </span>
          <el-button type="info" style="margin:20px" @click="search">查询</el-button>
          <el-button type="warning" style="margin:20px" @click="fetch">重置</el-button>
        </el-col>
        <el-col :span="14"></el-col>
      </el-row>

      <!-- 按钮 -->
      <div class="btn">
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
        <el-table-column prop="address" label="地点"></el-table-column>
        <el-table-column prop="name" label="报修人姓名"></el-table-column>
        <el-table-column prop="phone" label="报修人电话" min-width="100px"></el-table-column>
        <el-table-column prop="WeChat" label="微信号"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" min-width="120px"></el-table-column>
        <el-table-column prop="updateTime" label="上次操作时间" min-width="120px"></el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
        <el-table-column prop="repairState" label="报修状态" min-width="100px">
          <template v-slot="scope">
            <el-tag size="medium" v-if="scope.row.repairState!=''">{{scope.row.repairState}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" min-width="140px">
          <template v-slot="scope">
            <el-button size="small" type="primary" @click="handleEdit(scope.row._id)">点击分配</el-button>
            <el-button size="small" type="danger" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 对话框 -->
      <el-dialog
        :visible.sync="editDialogVisible"
        width="50%"
        :close-on-click-modal="false"
        @closed="editDialogClosed"
      >
        <h2>{{idValue ? '修改' : '新建'}}报修信息</h2>
        <el-form :model="addForm" ref="addFormRef" :rules="addFormRules" label-width="100px">
          <el-col :span="12">
            <el-form-item label="选择师傅:">
              <el-select filterable v-model="editForm.repairerName">
                <el-option
                  v-for="item in repairOptions"
                  :key="item._id"
                  :value="item.repairerName"
                  :label="item.repairerName"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editRepairment">确 定</el-button>
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
import { VueEditor } from "vue2-editor";
import timeFormat from "./dateFormat/date-format.js";
export default {
  components: {
    VueEditor
  },
  data() {
    return {
      repairOptions: [], // 维修员名单
      idValue: "",
      fetchList: [],
      searchValue: "",
      // 分页数据
      pageNum: 1,
      pageSize: 10,
      // 总的页数
      total: 0,
      editDialogVisible: false,
      addDialogVisible: false,
      // 表单数据
      addForm: {},
      editForm: { repair: "" },
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
        `rest/repairments/fetch/${this.pageNum}/${this.pageSize}`
      );
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
        `rest/repairments/repairments/${this.pageNum}/${this.pageSize}/${this.searchValue}`
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

    async editRepairment() {
      this.editForm.repairState = `已分配${this.editForm.repairerName}处理`;
      const res = await this.$http.put(
        `rest/repairments/${this.idValue}`,
        this.editForm
      );
      this.editDialogVisible = false;
      this.$message({
        type: "success",
        message: "处理成功"
      });
      this.fetch();
    },

    editDialogClosed() {
      this.idValue = "";
      this.editForm = {};
    },

    remove(row) {
      // 删除
      this.$confirm(`是否确定要删除,报修人姓名为:"${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await this.$http.delete(`rest/repairments/${row._id}`);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.fetch();
      });
    },
    async fetchRepair() {
      // 修改后获取数据
      const res = await this.$http.get(`rest/repairers/fetch/1/99`);
      this.repairOptions = res.data.data;
    },

    handleSelectionChange(sels) {
      // 获取批量删除的id
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
        const res = await this.$http.delete(`rest/repairments/${ids}`);
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
      this.editDialogVisible = true;
      this.idValue = id;
      this.fetchRepair();
    }
  }
};
</script>

