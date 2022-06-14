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
      <el-table-column align="center" label="ID" width=" 100%">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      </el-table-column>
      <el-table-column label="中文名称" width="300" align="center">
        <template slot-scope="scope">
          {{ scope.row.chinese_name }}
        </template>
      </el-table-column>
      <el-table-column label="英文名称" width="300" align="center">
        <template slot-scope="scope">
          {{ scope.row.En_name }}
        </template>
      </el-table-column>
      <el-table-column label="负责人" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="开题时间" width="300">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="结题时间" width="300">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column width="200" align="center">
        <template slot="header" slot-scope="scope">
          <el-button type="primary" @click="handleAdd">添加项目</el-button>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index,scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index,scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="编辑项目"
      :visible.sync="dialogEdit"
      :before-close="handleClose"
    >
      <el-form :model="editForm" label-width="200px">
        <el-form-item label="负责人">
          <el-input v-model="editForm.name" style="width: 60%"/>
        </el-form-item>
        <el-form-item label="中文名称">
          <el-input v-model="editForm.chinese_name" style="width: 60%"/>
        </el-form-item>
        <el-form-item label="英文名称">
          <el-input v-model="editForm.En_name" style="width: 60%"/>
        </el-form-item>
        <el-form-item label="申请时间">
          <el-input v-model="editForm.time" style="width: 60%"/>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="editForm.status" :fill="editForm.status=='审核通过'?'#409EFF':(editForm.status=='审核不通过'?'#F56C6C':'#909399')">
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
        <el-form-item label="负责人">
          <el-input v-model="addForm.name" style="width: 60%"/>
        </el-form-item>
        <el-form-item label="中文名称">
          <el-input v-model="addForm.chinese_name" style="width: 60%"/>
        </el-form-item>
        <el-form-item label="英文名称">
          <el-input v-model="addForm.En_name" style="width: 60%"/>
        </el-form-item>
        <el-form-item label="申请时间">
          <el-input v-model="addForm.time" style="width: 60%"/>
        </el-form-item>

        <el-form-item label="状态">
          <el-radio-group v-model="addForm.status" :fill="addForm.status=='审核通过'?'#409EFF':(addForm.status=='审核不通过'?'#F56C6C':'#909399')">
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
import { getCenterList } from '@/api/center-area'
import { getProperty } from '@/api/property'
import axios from "axios";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        审核通过: 'success',
        待审核: 'gray',
        审核不通过: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: [],
      list1: [],
      listLoading: true,
      dialogEdit: false,
      dialogAdd: false,
      property: null,
      editForm: {},
      addForm: {},
      handle:0,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      axios.get("http://localhost:3000/bar").then((res) => {
        console.log(11111111);
        console.log(res.data[0]);
        for (let i in res.data) {
          this.list1.push(res.data[i]);
        }
        console.log(this.list1[0].ID);
      });
      this.listLoading = true
      getCenterList().then(response => {
        this.list = response.data.items
        console.log(this.list);
        this.listLoading = false
      })
      getProperty().then(response => {
        this.property = response.data.items
      })
    },
    handleDelete(index, row) {
      
      this.list1.splice(index, 1)
      console.log(this.list1)

    },
    handleClose(done) {
      this.$confirm('确认关闭')
        .then(_ => {
          this.editForm = {}
          this.addForm = {}
          done()
        }).catch(_ => {})
    },
    // region editForm
    handleEdit(index, row) {
      this.editForm = JSON.parse(JSON.stringify(this.list1[index]))
      this.dialogEdit = true
      this.handle = index
    },
    dialogEditClose() {
      this.dialogEdit = false
      this.editForm = {}
    },
    dialogEditConfirm() {
      this.dialogEdit = false
      this.editForm.dateTime = new Date().toLocaleString('cn', { hour12: false })
      this.list1[this.handle].chinese_name = this.editForm.chinese_name
      this.list1[this.handle].name = this.editForm.name
      this.list1[this.handle].En_name = this.editForm.En_name
      this.list1[this.handle].time = this.editForm.time
      this.list1[this.handle].status = this.editForm.status
      this.editForm = {}
    },
    handleAdd(index, row) {
      this.dialogAdd = true
    },
    dialogAddClose() {
      this.dialogAdd = false
      this.addForm = {}
      
    },
    dialogAddConfirm() {
      this.dialogAdd = false
      this.addForm.dateTime = new Date().toLocaleString('cn', { hour12: false })
      this.list1.push(this.addForm)
      this.addForm = {}
    }
  }
}
</script>
