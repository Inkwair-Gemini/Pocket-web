<template>
  <div class="main">
    <div class="top">
      <h-form>
        <p class="title">清算</p>
        <br />
        <h-form-item>
          <h-row>
            <h-col :span="2" style="margin-left: 2%">
              <h-button
                type="warning"
                icon="android-arrow-up"
                :disabled="isSubmit"
                @click="submitConfirm"
              >
                提交录入
              </h-button>
            </h-col>
            <h-col :span="2" style="margin-left: 67%">
              <h-button
                type="primary"
                icon="text"
                @click="initDay"
                :disabled="isInitDay"
              >
                <span>日初始化</span>
              </h-button>
            </h-col>
            <h-col :span="2" style="margin-left: 2%">
              <h-button
                type="warning"
                :loading="loading"
                icon="android-arrow-down"
                @click="liquidation"
                :disabled="isConfirmLiquidation"
              >
                <span v-if="!loading">清算</span>
                <span v-else>Loading...</span>
              </h-button>
            </h-col>
          </h-row>
        </h-form-item>
      </h-form>
    </div>
    <div class="table">
      <Table
        :page_size="11"
        :key="data.key"
        :data="data.dataList"
        :columns="columns"
      ></Table>
    </div>
  </div>
</template>

<script>
import Table from "@/components/customer/Table.vue";
import { getData, postData } from "@/js/api.js";
import { getNowTradeDay } from "@/js/timeUtil.js";
export default {
  components: { Table },
  data() {
    return {
      isSubmit: false,
      isConfirmLiquidation: false,
      isInitDay:false,
      tradeDay: "",
      comfirmData: {}, //确认清算的行
      loading:false,
      data: { key: 0, dataList: [] },
      columns: [
        {
          title: "交易日",
          width: 200,
          key: "tradingDay",
        },
        {
          title: "申购单数量",
          key: "subscriptionNum",
          type: "Number",
          width: 200,
        },
        {
          title: "申购金额",
          type: "Number",
          key: "subscriptionAmount",
          width: 200,
        },
        {
          title: "赎回单数量",
          type: "Number",
          key: "redemptionNum",
          width: 200,
        },
        {
          title: "赎回份额",
          type: "Number",
          key: "redemptionPortion",
          width: 200,
        },
        {
          title: "状态",
          key: "state",
          width: 200,
        },
        {
          title: "备注",
          key: "remark",
          width: 200,
        },
        {
          title: "操作",
          key: "operate",
          align: "center",
          fixed: "right",
          width: 200,
          render: (h, params) => {
            return h("div", [
              h(
                "h-button",
                {
                  props: {
                    type: "success",
                    size: "small",
                    disabled: this.isConfirmLiquidation,
                  },
                  on: {
                    click: () => {
                      this.comfirmData = params.row;
                      this.liquidationConfirm();
                    },
                  },
                },
                "确认清算"
              ),
            ]);
          },
        },
      ],
    };
  },
  mounted() {
    //获取初始化数据
    this.getInitData();
    //获取当前交易日清算记录
    this.getInfo();
  },
  methods: {
    //获取交易日
    //获取是否确认清算
    //获取是否提交
    async getInitData() {
      try {
        const data = await getData("/liquidation/dailyInitialization/getInitializationData");
        if (data.code === 0) {
          this.tradeDay = data.data.tradingDay;
          if(getNowTradeDay() === this.tradeDay.slice(0,10)){
            this.isInitDay = true;
          }
          if(data.data.exportTrade !== "当前交易日未导出"){
            this.isSubmit = true;
          }
          if(data.data.confirmLiquidation !== "上一交易日未确认清算"){
            this.isConfirmLiquidation = true;
          }
        } else {
          this.$hMessage.error(data.code + ":" + data.msg);
        }
      } catch (error) {
        this.$hMessage.error("请求失败，请重试或联系管理员");
      }
    },
    async initDay(){
      try {
        const data = await getData("/liquidation/dailyInitialization/initializeTradingDay");
        if (data.code === 0) {
          this.$hMessage.success("日初始化成功");
          this.isInitDay = true;
        } else {
          this.$hMessage.error(data.code + ":" + data.msg);
        }
      } catch (error) {
        this.$hMessage.error("请求失败，请重试或联系管理员");
      }
    },
    submitConfirm() {
      this.$hMsgBox.confirm({
        title: "确认提交",
        content: "<p>确认提交今日交易数据吗？</p>",
        okText: "确认",
        cancelText: "取消",
        loading:true,
        onOk: () => {
          this.toSubmit();
          this.$hMsgBox.remove();
        },
      });
    },
    liquidationConfirm() {
      this.$hMsgBox.confirm({
        title: "确认清算",
        content: "<p>确认提交昨日清算数据吗？</p>",
        okText: "确认",
        cancelText: "取消",
        loading:true,
        onOk: () => {
          this.toLiquidation();
          this.$hMsgBox.remove();
        },
      });
    },
    async liquidation() {
      this.loading = true;
      try {
        const data = await getData(
          `/liquidation/trade/liquidate?lastTradingDay=`
        );
        if (data.code === 0) {
          this.getInfo();
          this.$hMessage.success("清算成功");
        } else {
          this.$hMessage.error(data.code + ":" + data.msg);
        }
      } catch (error) {
        this.$hMessage.error("请求失败，请重试或联系管理员");
      }finally{
        this.loading = false
      }
    },
    async toLiquidation() {
      try {
        const data = await postData("/liquidation/trade/confirmLiquidation", {liquidateLogId:this.comfirmData.id});
        if (data.code === 0) {
          this.$hMessage.success("确认清算成功");
          this.isConfirmLiquidation = true;
        } else {
          this.$hMessage.error(data.code + ":" + data.msg);
        }
      } catch (error) {
        this.$hMessage.error("请求失败，请重试或联系管理员");
      }
    },
    async toSubmit() {
      try {
        const data = await getData(`/liquidation/trade/exportTrade?tradingDay=`);
        if (data.code === 0) {
          this.$hMessage.success("提交成功");
          this.isSubmit = true;
        } else {
          this.$hMessage.error(data.code + ":" + data.msg);
        }
      } catch (error) {
        this.$hMessage.error("请求失败，请重试或联系管理员");
      }
    },
    async getInfo() {
      try {
        const data = await getData(`/liquidation/trade/getLiquidationLogList?current=1&size=999&tradingDay=`);
        if (data.code === 0) {
          const list = data.data.list.map((item) => {
            return { ...item, tradingDay: item.tradingDay.slice(0, 10) };
          });
          this.data.dataList = list;
          this.data.key++;
        } else {
          this.$hMessage.error(data.code + ":" + data.msg);
        }
      } catch (error) {
        this.$hMessage.error("请求失败，请重试或联系管理员");
      }
    },
  },
};
</script>

<style scoped>
label {
  text-align: right;
  background-color: #f7f7f7;
  width: 6vw;
  display: inline-block; /* 使标签成为行内块级元素 */
  margin-left: 2vw;
  font-weight: bolder;
  font-size: x-small;
  padding-right: 1vw;
}
.main {
  height: 85.9vh;
}
.title {
  padding-top: 2vh;
  padding-left: 1vw;
  font-size: medium;
  color: rgb(53, 50, 50);
  font-weight: bold;
}
.table {
  height: 72vh;
}
</style>