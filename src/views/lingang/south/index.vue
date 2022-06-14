<template>
  <div class="app-container">
    
    <el-table
      v-loading="listLoading"
      :data="list1"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="金额" align="center">
        <template slot-scope="scope">
          {{ scope.row.amount.toString() }}
        </template>
      </el-table-column>
      <el-table-column label="经费类别" width="250" align="center">
        <template slot-scope="scope">
          {{ scope.row.category }}
        </template>
      </el-table-column>
      <el-table-column label="申请人账户" width="500" align="center">
        <template slot-scope="scope">
          {{ scope.row.account }}
        </template>
      </el-table-column>
      <el-table-column label="申请人·" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="状态"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{
            scope.row.status
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="申请时间"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column width="200" align="center">
        <template slot="header" slot-scope="scope">
          <el-button type="primary" @click="handleAdd">经费审批</el-button>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="编辑项目"
      :visible.sync="dialogEdit"
      :before-close="handleClose"
    >
      <el-form :model="editForm" label-width="200px">
        <el-form-item label="金额">
          <el-input v-model="editForm.amount" style="width: 60%"></el-input>
        </el-form-item>
        <el-form-item label="经费类别">
          <el-input v-model="editForm.category" style="width: 60%"></el-input>
        </el-form-item>
        <el-form-item label="申请人">
          <el-input v-model="editForm.name" style="width: 60%" />
        </el-form-item>
        <el-form-item label="申请人账户">
          <el-input v-model="editForm.account" style="width: 60%" />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group
            v-model="editForm.status"
            :fill="
              editForm.status == '审核通过'
                ? '#409EFF'
                : editForm.status == '审核不通过'
                ? '#F56C6C'
                : '#909399'
            "
          >
            <el-radio-button label="审核通过"></el-radio-button>
            <el-radio-button label="审核不通过"></el-radio-button>
            <el-radio-button label="待审核"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditClose">取 消</el-button>
        <el-button type="primary" @click="dialogEditConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加项目"
      :visible.sync="dialogAdd"
      :before-close="handleClose"
    >
      <el-form :model="addForm" label-width="200px">
        <el-form-item label="金额">
          <el-input v-model="addForm.amount" style="width: 60%" />
        </el-form-item>
        <el-form-item label="申请人账户">
          <el-input v-model="addForm.account" style="width: 60%" />
        </el-form-item>
        <el-form-item label="经费类别">
          <el-input v-model="addForm.category" style="width: 60%" />
        </el-form-item>
        <el-form-item label="申请人姓名">
          <el-input v-model="addForm.name" style="width: 60%" />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group
            v-model="addForm.status"
            :fill="
              addForm.status == '审核通过'
                ? '#409EFF'
                : addForm.status == '审核不通过'
                ? '#F56C6C'
                : '#909399'
            "
          >
            <el-radio-button label="审核通过"></el-radio-button>
            <el-radio-button label="审核不通过"></el-radio-button>
            <el-radio-button label="待审核"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddClose">取 消</el-button>
        <el-button type="primary" @click="dialogAddConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getLingangSouthList } from "@/api/lingang-south";
import { getProperty } from "@/api/property";
import axios from "axios";
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        审核通过: "success",
        待审核: "gray",
        审核不通过: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      list: [],
      list1: [],
      listLoading: true,
      dialogEdit: false,
      dialogAdd: false,
      handle: 0,
      property: null,
      editForm: {},
      addForm: {},
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios.get("http://localhost:3000/expense").then((res) => {
        for (let i in res.data) {
          this.list1.push(res.data[i]);
        }
      });
      this.listLoading = true;
      getLingangSouthList().then((response) => {
        this.list = response.data.items;
        this.listLoading = false;
      });
      getProperty().then((response) => {
        this.property = response.data.items;
      });
    },
    handleDelete(index, row) {
      this.list1.splice(index, 1);
      console.log(this.list1);
    },
    handleClose(done) {
      this.$confirm("确认关闭")
        .then((_) => {
          this.editForm = {};
          this.addForm = {};
          done();
        })
        .catch((_) => {});
    },
    // region editForm
    handleEdit(index, row) {
      this.editForm = JSON.parse(JSON.stringify(this.list1[index]));
      this.dialogEdit = true;
      this.handle = index;
    },
    dialogEditClose() {
      this.dialogEdit = false;
      this.editForm = {};
    },
    dialogEditConfirm() {
      this.dialogEdit = false;
      // eslint-disable-next-line no-undef
      this.editForm.dateTime = new Date().toLocaleString("cn", {
        hour12: false,
      });
      this.list1[this.handle].amount = this.editForm.amount;
      this.list1[this.handle].account = this.editForm.account;
      this.list1[this.handle].name = this.editForm.name;
      this.list1[this.handle].category = this.editForm.category;
      this.list1[this.handle].status = this.editForm.status;
      this.editForm = {};
    },
    // endregion
    // region addForm
    handleAdd(index, row) {
      this.dialogAdd = true;
    },
    dialogAddClose() {
      this.dialogAdd = false;
      this.addForm = {};
    },
    dialogAddConfirm() {
      this.dialogAdd = false;
      // eslint-disable-next-line no-undef
      this.addForm.dateTime = new Date().toLocaleString("cn", {
        hour12: false,
      });
      this.list1.push(this.addForm);
      this.addForm = {};
    },
    // endregion
  },
};
</script>
