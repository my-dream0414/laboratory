<template>
  <div class="app-container">

    <div>
      <FilenameOption v-model="filename" />
      <AutoWidthOption v-model="autoWidth" />
      <BookTypeOption v-model="bookType" />
    </div>

    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading..." border fit highlight-current-row>
      <el-table-column align="center" label="Id" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope" >
          {{ title[scope.$index] }}
        </template>
      </el-table-column>
      <el-table-column label="Readings" width="515" align="center">
        <template slot-scope="scope">
          <el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" type="primary" icon="el-icon-document" @click="handleDownload(scope.$index)">
        Download Excel
      </el-button>
      <el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" type="primary" icon="el-icon-document" @click="inputexcel">
        Input Excel
      </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import FileSaver from 'file-saver';
import * as XLSX from 'xlsx'
import axios from "axios";
export default {
   name: 'Project',
  data() {
    return {
      list: [],
      title: [],
      listLoading: true,
      downloadLoading: false,
      filename: '',
      autoWidth: true,
      bookType: 'xlsx',
      excelData: [],
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData(){
      axios.get("http://localhost:3000/humen").then((res) => {
        let list1 = res.data
        this.title.push("人员管理")
        this.list.push(list1)
        this.listLoading = false
      })
      axios.get("http://localhost:3000/notice").then((res) => {
        
        let list1 = res.data
        this.title.push("消息通知")
        this.list.push(list1)
        this.listLoading = false
      })
      axios.get("http://localhost:3000/expense").then((res) => {
        let list1 = res.data
        this.title.push("经费管理")
        this.list.push(list1)
        this.listLoading = false
      })
      axios.get("http://localhost:3000/bar").then((res) => {
        let list1 = res.data
        this.title.push("项目管理")
        this.list.push(list1)
        this.listLoading = false
      })
    },
    inputexcel(e){
      console.log(e)
      const files = e.target.files;
      const fileReader = new FileReader();//可读取文件内容的构建函数
       fileReader.onload = ev =>{
        const data = ev.target.result;
        const workbook = XLSX.read(data, {
          type: "binary"//二进制
        });
        const wsname = workbook.SheetNames[0];//取第一张表
        const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);
        //获取这张表里的数接
        ws.forEach((value, index, ws) =>{
          console.log(value)//每一行的数据
        })
       };
       fileReader.readAsBinaryString(files[0]);//读取文件，触发onload
    },
    handleDownload(index){
      console.log(index);
      const jsonWorkSheet = XLSX.utils.json_to_sheet(this.list[index]);
      const workBook = {
        SheetNames: ['jsonWorkSheet'],//表名
        Sheets: {
          'jsonWorkSheet' : jsonWorkSheet
          }
        };
        XLSX.writeFile(workBook, this.title[index]+".xlsx");
    }
  }
}

</script>
