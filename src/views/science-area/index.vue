<template>
  <!-- <div class="science-area">
    <div class="app-container">
      <a class="document-btn" target="_blank" href="">简介</a>
      <a
        class="document-btn"
        target="_blank"
        href="https://panjiachen.github.io/vue-element-admin-site/"
        >文献检索</a
      >
      <a
        class="document-btn"
        target="_blank"
        href="https://github.com/PanJiaChen/vue-element-admin/"
        >实验室成果</a
      >
      <a
        class="document-btn"
        target="_blank"
        href="https://panjiachen.gitee.io/vue-element-admin-site/zh/"
        >技术学习</a
      >
      <a
        class="document-btn"
        target="_blank"
        href="https://panjiachen.github.io/vue-element-admin-site/zh/job/"
        >内推招聘</a
      >
    </div>
    <div class="chart">     
      实验室地点：
    </div>
  </div> -->
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <a
          class="document-btn"
          target="_blank"
          href="https://panjiachen.github.io/vue-element-admin-site/"
          >文献检索</a
        >
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <a
          class="document-btn"
          target="_blank"
          href="https://panjiachen.github.io/vue-element-admin-site/"
          >学术前沿</a
        >
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <a
          class="document-btn"
          target="_blank"
          href="https://panjiachen.github.io/vue-element-admin-site/"
          >技术学习</a
        >
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <a
          class="document-btn"
          target="_blank"
          href="https://panjiachen.github.io/vue-element-admin-site/"
          >内推招聘</a
        >
      </div>
    </el-col>
    <el-col :xs="12" :sm="13" :lg="24" id="card-panel-chart">
      <div class="card-chart"></div>
    </el-col>
  </el-row>
</template>

<script>
import { getScienceList } from "@/api/science-area";
import { getProperty } from "@/api/property";
import axios from "axios";
export default {
  data() {
    return {
      list1: [],
      list: [],
      listLoading: true,
      dialogEdit: false,
      dialogAdd: false,
      property: null,
      editForm: {},
      addForm: {},
    };
  },
  created() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.panel-group {

  background: rgb(206, 203, 203);
  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    margin: 10px;
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    background: rgb(207, 204, 204);
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    .document-btn {
      flex-shrink: 0;
      display: block;
      cursor: pointer;
      color: black;
      height: 60px;
      padding: 0 30px;
      margin: 30px;
      line-height: 60px;
      font-size:30px;
      text-align: center;
    }
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3;
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
#card-panel-chart {
  background: red;
  margin-top: 10px;
  height: 300px;
}
</style>
