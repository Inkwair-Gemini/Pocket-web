<template>
  <div class="content">
    <SelectCustomer
      :disabledArr="[true, false, true]"
      :selectLink="selectLink"
      :title="title"
      @send-data="handleGetData"
    ></SelectCustomer>
    <div style="height: 72vh">
      <Table
        :page_size="11"
        :key="data.dataKey"
        :data="data.dataList"
        :columns="columns"
        @sendPage="getPage"
      ></Table>
    </div>
  </div>
</template>
<script>
import { postData } from "@/js/api.js";
import SelectCustomer from "@/components/customer/SelectCustomer.vue";
import Table from "@/components/customer/Table.vue";
export default {
  components: { SelectCustomer, Table },
  data() {
    return {
      selectLink: "/trade/trade/getCustomerTradeList",
      title: "客户交易查询",
      cancelData: {},
      currentPage:1,
      data: {
        dataKey: 0,
        dataList: [],
      },
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
          width: 150,
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
                      this.requestCancel();
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
  methods: {
    getPage(page) {
      this.currentPage = page;
    },
    handleGetData(tradeList) {
      const list = tradeList.map((item) => {
        if (item.type === "subscription") {
          return {
            ...item,
            tradingDay: item.tradingDay.slice(0, 10),
            type: "申购",
          };
        } else {
          return {
            ...item,
            tradingDay: item.tradingDay.slice(0, 10),
            type: "赎回",
          };
        }
      });
      this.data.dataList = list;
      this.data.dataKey++;
    },
    async requestCancel() {
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
        const data = await postData(Link, {
          [applyId]: this.cancelData.applyId
        });
        if (data.code === 0) {
          const index = this.cancelData._index + (this.currentPage - 1) * 11
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