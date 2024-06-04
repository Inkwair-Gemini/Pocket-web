<template>
  <h-msg-box
    v-model="modal2"
    :escClose="true"
    title="基金详情"
    width="72"
    height="92"
    top="30"
  >
    <div>
      <h-form :model="operate_button_info" class="information">
        <h-row>
          <h-col :span="12">
            <h-form-item>
              <label>基金代码</label>
              <span>{{ operate_button_info.fundId }}</span>
            </h-form-item>
          </h-col>
          <h-col :span="12">
            <h-form-item>
              <label>基金名称</label>
              <span>{{ operate_button_info.name }}</span>
            </h-form-item>
          </h-col>
        </h-row>
        <h-row>
          <h-col :span="12">
            <h-form-item>
              <label>当前净值</label>
              <span>{{ operate_button_info.netWorth }}</span>
            </h-form-item>
          </h-col>
          <h-col>
            <h-form-item :span="12">
              <label>基金类型</label>
              <span>{{ operate_button_info.type }}</span>
            </h-form-item>
          </h-col>
        </h-row>
      </h-form>
    </div>
    <br />
    <div id="main" style="height: 390px; width: 950px"></div>
    <div>
      <h-row>
        <label>选择时间</label>
        <h-radio-group
          type="button"
          v-model="choosedDate"
          @on-change="updateChartData"
        >
          <h-radio label="1个月"></h-radio>
          <h-radio label="3个月"></h-radio>
          <h-radio label="6个月"></h-radio>
          <h-radio label="12个月"></h-radio>
        </h-radio-group>
      </h-row>
    </div>
    <p slot="footer">
      <h-button type="error" @click="toClear">清盘</h-button>\
      <h-button type="warning" @click="toDivide">分红</h-button>
      <h-button @click="close">关闭</h-button>
    </p>
  </h-msg-box>
</template>

<script>
import { deleteData, postData } from "@/js/api.js";
import * as echarts from "echarts";
var myChart;
export default {
  data() {
    return {
      modal2: false,
      choosedDate: "1个月",
      operate_button_info: {
        fundId: "",
        name: "",
        netWorth: "",
        type: "",
      },
      echarts_data: {
        x: [],
        y: [],
      },
    };
  },
  methods: {
    toDivide() {
      this.$router.push({
        path: "/layouts/liquidation/Dividents",
        query: {
          data: this.operate_button_info,
        },
      });
    },
    openModal2(rowData) {
      this.modal2 = true;
      this.operate_button_info = rowData;
      this.updateChartData();
    },
    toClear() {
      this.$hMsgBox.confirm({
        title: "清盘确认",
        content: "<p>确认清盘吗？</p>",
        okText: "确认",
        cancelText: "取消",
        onOk: () => {
          this.confirmClear();
          this.close();
        },
        onCancel: () => {
          // 确保 msgBox 在取消时也被正确销毁
          if (this.$hMsgBox) {
            this.$hMsgBox.remove();
          }
        },
      });
    },
    close() {
      this.modal2 = false;
    },
    confirmClear() {
      this.$emit("clear-data", this.operate_button_info.fundId);
      this.$hMessage.success("清盘成功");
    },
    async updateChartData() {
      var day = null;
      switch (this.choosedDate) {
        case "1个月":
          day = 0;
          break;
        case "3个月":
          day = 1;
          break;
        case "6个月":
          day = 2;
          break;
        case "12个月":
          day = 3;
          break;
      }
      try {
        const data = await postData("/fund/fund/getHistoryNetWorth", {
          fundId: this.operate_button_info.fundId,
          limitDateTime: day,
        });
        if (data.code === 0) {
          this.echarts_data.y = data.data.historyNetWorth;
          this.echarts_data.x = data.data.historyTradingTime;
          this.drawChart();
        } else {
          this.$hMessage.error(data.code + ":" + data.msg);
        }
      } catch (error) {
        this.$hMessage.error("请求失败，请重试或联系管理员");
      }
    },
    drawChart() {
      this.$nextTick(() => {
        var chartDom = document.getElementById("main");
        if (myChart) {
          myChart.dispose();
        }
        myChart = echarts.init(chartDom);
        const option = {
          title: {
            text: "净值趋势",
            left: "center",
          },
          xAxis: {
            type: "category",
            data: this.echarts_data.x,
            axisTick: {
              alignWithLabel: true,
            },
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: this.echarts_data.y,
              type: "line",
            },
          ],
          tooltip: {
            trigger: "axis",
          },
        };
        myChart.setOption(option);
      });
    },
  },
};
</script>

<style scoped>
.information {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.information .h-form-item {
  margin-bottom: 10px;
}

label {
  text-align: right;
  background-color: #f7f7f7;
  width: 5vw;
  display: inline-block; /* 使标签成为行内块级元素 */
  margin: 0 1vw 0 1vw;
  font-weight: bolder;
  font-size: x-small;
  padding-right: 1vw;
}
</style>
