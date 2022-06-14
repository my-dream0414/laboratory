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
      <el-table-column label="职称" align="center">
        <template slot-scope="scope">
          {{ scope.row.job }}
        </template>
      </el-table-column>
      <el-table-column label="学号/工号" width="250" align="center" >
        <template slot-scope="scope">
          {{ scope.row.number }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="500" align="center">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="年龄" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.age }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="添加时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column width="200" align="center">
        <template slot="header" slot-scope="scope">
          <el-button type="primary" @click="handleAdd">人员添加</el-button>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index,scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="编辑项目"
      :visible.sync="dialogEdit"
      :before-close="handleClose"
    >
      <el-form :model="editForm" label-width="200px">
        <el-form-item label="职称">
          <el-select v-model="editForm.job" :placeholder="editForm.area">
            <el-option label="本科生" value="本科生" />
            <el-option label="研究生" value="研究生" />
            <el-option label="博士生" value="博士生" />
            <el-option label="讲师" value="讲师" />
            <el-option label="教授" value="教授" />
            <el-option label="院士/学者" value="院士/学者" />
          </el-select>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="editForm.name" style="width: 60%"/>
        </el-form-item>
        <el-form-item label="学号/工号">
          <el-input v-model="editForm.number" style="width: 60%"/>
        </el-form-item>
         <el-form-item label="年龄">
          <el-input v-model="editForm.age" style="width: 60%"/>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="editForm.status" :fill="editForm.status=='在职'?'#409EFF':(editForm.status=='离职'?'#F56C6C':'#909399')">
            <el-radio-button label="在职"></el-radio-button>
            <el-radio-button label="请假"></el-radio-button>
            <el-radio-button label="离职"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditClose">取 消</el-button>
        <el-button type="primary" @click="dialogEditConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加人员"
      :visible.sync="dialogAdd"
      :before-close="handleClose"
    >
      <el-form :model="addForm" label-width="200px">
        <el-form-item label="职称">
          <el-select v-model="addForm.job" :placeholder="addForm.job">
            <el-option label="本科生" value="本科生" />
            <el-option label="研究生" value="研究生" />
            <el-option label="博士生" value="博士生" />
            <el-option label="讲师" value="讲师" />
            <el-option label="教授" value="教授" />
            <el-option label="院士/学者" value="院士/学者" />
          </el-select>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="addForm.name" style="width: 60%"/>
        </el-form-item>
        <el-form-item label="学号/工号">
          <el-input v-model="addForm.number" style="width: 60%"/>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="editForm.age" style="width: 60%"/>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="addForm.status" :fill="addForm.status=='在职'?'#409EFF':(addForm.status=='离职'?'#F56C6C':'#909399')">
            <el-radio-button label="在职"></el-radio-button>
            <el-radio-button label="请假"></el-radio-button>
            <el-radio-button label="离职"></el-radio-button>
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
import { getLingangEastList } from '@/api/lingang-east'
import { getProperty } from '@/api/property'
import axios from 'axios'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        在职: 'success',
        请假: 'gray',
        离职: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: [],
      list1:[],
      listLoading: true,
      handle:0,
      dialogEdit: false,
      dialogAdd: false,
      property: null,
      editForm: {},
      addForm: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {

      axios.get("http://localhost:3000/humen").then((res) => {
        console.log(res.data)
        for(let i in res.data){
          this.list1.push(res.data[i])
        }
      })
      this.listLoading = true
      getLingangEastList().then(response => {
        this.list = response.data.items
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
      // eslint-disable-next-line no-undef
      this.editForm.dateTime = new Date().toLocaleString('cn', { hour12: false })
      this.list1[this.handle].name = this.editForm.name
      this.list1[this.handle].age = this.editForm.age
      this.list1[this.handle].time = this.editForm.time
      this.list1[this.handle].status = this.editForm.status
      this.list1[this.handle].job = this.editForm.job
      this.list1[this.handle].number = this.editForm.number
      this.editForm = {}
    },
    // endregion
    // region addForm
    handleAdd(index, row) {
      this.dialogAdd = true
    },
    dialogAddClose() {
      this.dialogAdd = false
      this.addForm = {}
    },
    dialogAddConfirm() {
      this.dialogAdd = false
      // eslint-disable-next-line no-undef
      this.addForm.dateTime = new Date().toLocaleString('cn', { hour12: false })
      this.list1.push(this.addForm)
      this.addForm = {}
    }
    // endregion
  }
}
</script>
