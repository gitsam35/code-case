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
        <el-button type="primary" @click="handleAdd">
          <i class="el-icon-plus"></i> 新建房间
        </el-button>
        <el-button type="danger" style="margin:20px" @click="removeArticleAll(sels)">批量删除</el-button>
        <download-excel
          :data="exportDataList"
          name="房间信息列表.xls"
          :fields="exportFields"
          :before-generate="findExportData"
          class="downloadExcel"
        >
          <el-button type="success">
            <i class="el-icon-sold-out"></i> 导出数据
          </el-button>
        </download-excel>
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

        <el-table-column type="index" :index="indexRules" label="序号"></el-table-column>
        <el-table-column prop="communityName" label="小区名"></el-table-column>
        <el-table-column prop="name" label="业主姓名"></el-table-column>
        <el-table-column prop="phone" label="业主电话" min-width="150px"></el-table-column>

        <el-table-column prop="buildingNo" label="楼号"></el-table-column>
        <el-table-column prop="roomNo" label="房间号"></el-table-column>
        <el-table-column prop="houseArea" label="房间面积"></el-table-column>
        <el-table-column label="是否入住">
          <template v-slot="scope">
            <el-switch v-model="scope.row.isLive" :active-value="1" :inactive-value="0" disabled></el-switch>
          </template>
        </el-table-column>

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
        <h2>{{idValue ? '修改' : '新建'}}房间信息</h2>

        <el-form :model="addForm" ref="addFormRef" :rules="addFormRules" label-width="100px">
          <el-col :span="12">
            <el-form-item label="小区名:" prop="communityName">
              <el-input v-model="addForm.communityName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="楼号:" prop="buildingNo">
              <el-input v-model="addForm.buildingNo"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="房间号:" prop="roomNo">
              <el-input v-model="addForm.roomNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="房间面积(㎡):" prop="houseArea">
              <el-input v-model="addForm.houseArea"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="业主姓名:" prop="name">
              <el-input v-model="addForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="业主电话:" prop="phone">
              <el-input v-model="addForm.phone" @keyup.enter.native="addRoom"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="业主2姓名:" prop="name2">
              <el-input v-model="addForm.name2"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="业主2电话:" prop="phone2">
              <el-input v-model="addForm.phone2" @keyup.enter.native="addRoom"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否入住">
              <el-switch v-model="addForm.isLive" :active-value="1" :inactive-value="0"></el-switch>
            </el-form-item>
            <el-col :span="12"></el-col>
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
      exportDataList: [], // 导出数据的数据
      exportFields: {
        // 设置导出表格的表头
        序号: "index",
        小区名: "communityName",
        楼号: "buildingNo",
        房间号: "roomNo",
        是否入住: "isLive",
        业主姓名: "name",
        业主电话: "phone",
        业主2姓名: "name2",
        业主2电话: "phone2"
      },
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
        `rest/houses/fetch/${this.pageNum}/${this.pageSize}`
      );
      this.fetchList = res.data.data;
      this.total = res.data.total;
      this.searchValue = "";
    },
    async findExportData() {
      // 导出数据
      this.pageNum = 1;
      this.pageSize = 9999;
      const res = await this.$http.get(
        `rest/houses/fetch/${this.pageNum}/${this.pageSize}`
      );
      this.fetchList = res.data.data;
      this.total = res.data.total;
      this.searchValue = "";

      // 导出数据操作
      for (let i in res.data.data) {
        res.data.data[i].index = parseInt(i) + 1;
        // 遍历转换格式
        switch (res.data.data[i].isLive) {
          case 0: // 注意数据是字符串还是数字型
            res.data.data[i].isLive = "无人入住";
            break;
          case 1:
            res.data.data[i].isLive = "有人入住";
            break;
        }
      }
      this.exportDataList = res.data.data;
    },

    async search() {
      // 模糊查询：
      const res = await this.$http.get(
        `rest/houses/houses/${this.pageNum}/${this.pageSize}/${this.searchValue}`
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
        // 有id值用 put 更新
        res = await this.$http.put(`rest/houses/${this.idValue}`, this.addForm);
      } else {
        // 无id值 post添加
        res = await this.$http.post("rest/houses", this.addForm);
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
      // 删除
      this.$confirm(`是否确定要删除,业主姓名为:"${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await this.$http.delete(`rest/houses/${row._id}`);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.fetch();
      });
    },
    async fetch2() {
      // 修改后获取数据
      const res = await this.$http.get(`rest/houses/id/${this.idValue}`);
      this.addForm = res.data;
    },

    handleSelectionChange(sels) {
      // 获取批量删除的id
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
        const res = await this.$http.delete(`rest/houses/${ids}`);
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
    },
    indexRules(index) {
      // 解决导出数据后序号不对问题
      return index + 1 + (this.pageNum - 1) * this.pageSize;
      console.log("index", index);
    }
  }
};
</script>

