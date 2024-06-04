<template>
  <div>
    <SelectCustomer
      :disabledArr="[false, false, false]"
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
      ></Table>
    </div>
    <h-msg-box
      v-model="operate_button_show"
      title="持有详情"
      :maskClosable="false"
      :closable="false"
    >
      <h-form :model="operate_button_info">
        <h-row>
          <h-form-item>
            <label>基金账号</label>
            <span>{{ operate_button_info.accountId }}</span>
          </h-form-item>
        </h-row>
        <h-row :span="50">
          <h-form-item>
            <label>基金代码</label>
            <span>{{ operate_button_info.fundId }}</span>
          </h-form-item>
        </h-row>
        <h-row>
          <h-form-item>
            <label>基金名称</label>
            <span>{{ operate_button_info.fundName }}</span>
          </h-form-item>
        </h-row>
        <h-row>
          <h-form-item>
            <label>当前净值</label>
            <span>{{ operate_button_info.netWorth }}</span>
          </h-form-item>
        </h-row>
        <h-row>
          <h-form-item>
            <label>总份额</label>
            <span>{{ operate_button_info.portions }}</span>
          </h-form-item>
        </h-row>
        <h-row>
          <h-form-item>
            <label>持有份额</label>
            <span>{{ operate_button_info.holdPortions }}</span>
          </h-form-item>
        </h-row>
        <h-row>
          <h-form-item>
            <label>冻结份额</label>
            <span>{{ operate_button_info.frozenPortions }}</span>
          </h-form-item>
        </h-row>
        <h-row>
          <h-form-item>
            <label>昨日盈亏</label>
            <span>{{ operate_button_info.profit }}</span>
          </h-form-item>
        </h-row>
      </h-form>
      <p slot="footer">
        <h-button @click="operate_button_show = false">关闭</h-button>
        <h-button type="primary" @click="toRedemption">赎回</h-button>
        <h-button type="success" @click="toSubscription">继续申购</h-button>
      </p>
    </h-msg-box>
  </div>
</template>

<script>
import { postData, getData } from "@/js/api.js";
import SelectCustomer from "@/components/customer/SelectCustomer.vue";
import Table from "@/components/customer/Table.vue";

export default {
  components: { SelectCustomer, Table },
  data() {
    return {
      selectLink: "/customer/fundHold/getFundHoldList",
      title: "持仓查询",
      operate_button_info: {
        accountId: "",
        fundId: "",
        fundName: "",
        netWorth: 0,
        portions: 0,
        holdPortions: 0,
        frozenPortions: 0,
      },
      operate_button_show: false,
      data: {
        dataKey: 0,
        dataList: [],
      },
      columns: [
        {
          title: "基金账号",
          key: "accountId",
          width: 200,
        },
        {
          title: "姓名",
          key: "name",
          width: 130,
          width: 200,
        },
        {
          title: "手机/电话",
          key: "phone",
          width: 200,
        },
        {
          title: "基金代码",
          key: "fundId",
          width: 200,
        },
        {
          title: "总份额",
          key: "portions",
          width: 200,
        },
        {
          title: "操作",
          key: "operate",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "h-button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                  },
                  on: {
                    click: () => {
                      this.operate_button_info = { ...params.row };
                      this.checkDetails();
                      this.operate_button_show = true;
                    },
                  },
                },
                "查看详情"
              ),
            ]);
          },
        },
      ],
    };
  },
  methods: {
    handleGetData(fundHoldList) {
      this.data.dataList = fundHoldList;
      this.data.dataKey++;
    },
    async checkDetails() {
      try {
        const data = await postData(
          `/customer/fundHold/getFundHoldList?current=1&size=999`,
          {
            accountId: this.operate_button_info.accountId,
            name: this.operate_button_info.name,
            phone: this.operate_button_info.phone,
          }
        );

        // 打印完整的 API 响应数据
        console.log("API 响应数据: ", JSON.stringify(data, null, 2));

        if (data.code === 0) {
          if (
            data.data &&
            Array.isArray(data.data.list) &&
            data.data.list.length > 0
          ) {
            const firstItem = data.data.list[0]; // 取第一个对象
            this.operate_button_info = {
              ...this.operate_button_info,
              fundName: firstItem.fundName,
              netWorth: firstItem.netWorth,
              portions: firstItem.portions,
              holdPortions: firstItem.portions - firstItem.frozenPortions,
              frozenPortions: firstItem.frozenPortions,
            };
            // 调用获取昨日盈亏接口
            const profitData = await getData(
              `/customer/fundHoldLog/getFundHoldLogList?current=1&size=999&accountId=${this.operate_button_info.accountId}`
            );
            console.log("获取昨日盈亏数据: ", profitData);
            if (profitData.code === 0) {
              this.operate_button_info.profit = profitData.data.list[0].profit;
            } else {
              console.error("获取昨日盈亏数据失败:", profitData.msg);
            }
          } else {
            this.$hMessage.error("没有持有详情数据");
            console.log("没有持有详情数据");
          }
        } else {
          this.$hMessage.error(data.code + ":" + data.msg);
          console.log(data.code + ":" + data.msg);
        }
      } catch (error) {
        this.$hMessage.error("请求失败，请重试或联系管理员");
        console.log("请求错误: ", error);
      }
    },

    toSubscription() {
      this.$router.push({
        path: "/layouts/trade/Subscription",
        query: {
          data: this.operate_button_info,
        },
      });
    },
    toRedemption() {
      this.$router.push({
        path: "/layouts/trade/Redemption",
        query: {
          data: this.operate_button_info,
        },
      });
    },
  },
};
</script>

<style scoped>
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
span {
  font-weight: bold;
}
</style>
