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
      <el-table-column label="区域" align="center">
        <template slot-scope="scope">
          {{ scope.row.area }}
        </template>
      </el-table-column>
      <el-table-column label="通知内容" width="500" align="center">
        <template slot-scope="scope">
          {{scope.row.content}}
        </template>
      </el-table-column>
      <el-table-column label="发布人" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="发布时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column width="200" align="center">
        <template slot="header" slot-scope="scope">
          <el-button type="primary" @click="handleAdd">发布通知</el-button>
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
      title="编辑通知内容"
      :visible.sync="dialogEdit"
      :before-close="handleClose"
    >
      <el-form :model="editForm" label-width="200px">
        <el-form-item label="区域">
          <el-select v-model="editForm.area" :placeholder="editForm.area">
            <el-option label="竞赛" value="竞赛" />
            <el-option label="实验室通知" value="实验室通知" />
            <el-option label="公示" value="公示" />
            <el-option label="科技" value="科技" />
            
          </el-select>
        </el-form-item>
        <el-form-item label="发布人">
          <el-input v-model="editForm.name" style="width: 60%"/>
        </el-form-item>
        <el-form-item label="通知内容">
          <el-input v-model="editForm.content" style="width: 60%"/>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="editForm.status" :fill="editForm.status=='已公示'?'#409EFF':(editForm.status=='未公示'?'#F56C6C':'#909399')">
            <el-radio-button label="已公示"></el-radio-button>
            <el-radio-button label="待审核"></el-radio-button>
            <el-radio-button label="未公示"></el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditClose">取 消</el-button>
        <el-button type="primary" @click="dialogEditConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="发布通知"
      :visible.sync="dialogAdd"
      :before-close="handleClose"
    >
      <el-form :model="addForm" label-width="200px">
        <el-form-item label="区域">
          <el-select v-model="addForm.area" :placeholder="addForm.area">
            <el-option label="竞赛" value="竞赛" />
            <el-option label="实验室通知" value="实验室通知" />
            <el-option label="公示" value="公示" />
            <el-option label="科技" value="科技" />
          
          </el-select>
        </el-form-item>
        <el-form-item label="发布人">
          <el-input v-model="addForm.name" style="width: 60%"/>
        </el-form-item>
        <el-form-item label="通知内容">
          <el-input v-model="addForm.content" style="width: 60%"/>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="addForm.status" :fill="addForm.status=='已公示'?'#409EFF':(addForm.status=='未公示'?'#F56C6C':'#909399')">
            <el-radio-button label="已公示"></el-radio-button>
            <el-radio-button label="待审核"></el-radio-button>
            <el-radio-button label="未公示"></el-radio-button>
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
import { getLingangWestList } from '@/api/lingang-west'
import { getProperty } from '@/api/property'
import axios from "axios";
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        已公示: 'success',
        待审核: 'gray',
        未公示: 'danger'
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
      handle: 0,
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
      axios.get("http://localhost:3000/notice").then((res) => {
        for (let i in res.data) {
          this.list1.push(res.data[i]);
        }
      });
      this.listLoading = true
      getLingangWestList().then(response => {
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
      this.list1[this.handle].area = this.editForm.area
      this.list1[this.handle].content = this.editForm.content
      this.list1[this.handle].name = this.editForm.name
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
      // eslint-disable-next-line no-undef
      this.addForm.dateTime = new Date().toLocaleString('cn', { hour12: false })
      this.list1.push(this.addForm)
      this.addForm = {}
    }
    // endregion
  }
}
</script>
