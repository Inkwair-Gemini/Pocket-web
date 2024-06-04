<template>
  <div>
    <div class="top">
      <h-form>
        <p class="title">交易记录</p>
        <br />
        <h-form-item>
          <h-row>
            <h-col :span="6">
              <label>交易类型</label>
              <h-select
                v-model="tradeType"
                style="width: 10vw"
                :clearable="false"
                setDefSelect
              >
                <h-option key="1" :value="0">申购</h-option>
                <h-option key="2" :value="1">赎回</h-option>
              </h-select>
            </h-col>
            <h-col :span="9">
              <label>交易时间</label>
              <h-date-picker
                style="width: 20vw"
                v-model="timeRange"
                type="daterange"
                placement="bottom-end"
                placeholder="选择日期"
              ></h-date-picker>
            </h-col>
            <h-col :span="6">
              <label>订单状态</label>
              <h-select v-model="state" style="width: 10vw">
                <h-option key="1" :value="0">未确认</h-option>
                <h-option key="2" :value="1">已撤销</h-option>
                <h-option key="3" :value="2">已确认</h-option>
              </h-select>
            </h-col>
            <h-col :span="2">
              <h-button type="primary" long @click="getInfo">
                <h-icon name="android-search" />&nbsp;搜索
              </h-button>
            </h-col>
          </h-row>
        </h-form-item>
      </h-form>
    </div>
    <div class="table">
      <Table
        :page_size="page_size"
        :key="data.key"
        :data="data.dataList"
        :columns="columns"
        @sendPage="getPage"
      ></Table>
    </div>
  </div>
</template>

<script>
import { postData } from "@/js/api.js";
import { transferTime } from "@/js/timeUtil.js";
import Table from "@/components/customer/Table.vue";
export default {
  components: { Table },
  data() {
    return {
      tradeType: 0,
      timeRange: [],
      state: null,

      currentPage:1,
      page_size:11,
      cancelData: {},
      data: { key: 0, dataList: [] },
      columns: [
        {
          title: "申请编号",
          key: "applyId",
          width: 250,
        },
        {
          title: "基金账号",
          key: "accountId",
          width: 180,
        },
        {
          title: "基金代码",
          key: "fundId",
          width: 180,
        },
        {
          title: "交易类型",
          key: "type",
          width: 180,
        },
        {
          title: "银行卡号",
          key: "cardNo",
          width: 240,
        },
        {
          title: "交易金额/份额",
          key: "mix",
          width: 180,
          type: "Number",
        },
        {
          title: "交易时间",
          key: "time",
          width: 180,
        },
        {
          title: "交易日",
          key: "tradingDay",
          width: 180,
        },
        {
          title: "确认编号",
          key: "confirmId",
          width: 180,
        },
        {
          title: "状态",
          key: "state",
          align: "center",
          fixed: "right",
          width: 150,
        },
        {
          title: "操作",
          key: "operate",
          align: "center",
          fixed: "right",
          width: 180,
          render: (h, params) => {
            return h("div", [
              h(
                "h-button",
                {
                  props: {
                    type: "error",
                    size: "small",
                    disabled: params.row.state !== "未确认",
                  },
                  on: {
                    click: () => {
                      this.cancelData = params.row;
                      this.cancel();
                    },
                  },
                },
                "撤销"
              ),
            ]);
          },
        },
      ],
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    getPage(page){
      this.currentPage = page;
    },
    async getInfo() {
      try {
        const data = await postData(`/trade/trade/getTradeList?page=1&size=999`, {
          type: this.tradeType,
          startTime: transferTime(this.timeRange[0]),
          endTime: transferTime(this.timeRange[1]),
          state: (this.state === "")?null:this.state
        });
        if (data.code === 0) {
          const list = data.data.list.map((item) => {
            return {
              ...item,
              tradingDay: item.tradingDay.slice(0, 10),
            };
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
    async cancel() {
      let Link = "";
      let applyId = "";
      if (this.cancelData.type === "申购") {
        Link = "/trade/subscription/cancelSubscription";
        applyId = "subscriptionId";
      } else {
        Link = "/trade/redemption/cancelRedemption";
        applyId = "redemptionId";
      }
      try {
        const data = await postData(Link, { [applyId] : this.cancelData.applyId} );
        if (data.code === 0) {
          const index = this.cancelData._index + (this.currentPage - 1) * this.page_size
          this.data.dataList[index].state = "已撤销";
          this.$hMessage.success("撤销成功");
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