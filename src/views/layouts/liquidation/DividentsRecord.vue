<template>
  <div>
    <div class="top">
      <h-form>
        <p class="title">基金分红明细</p>
        <br />
        <h-form-item>
          <h-row>
            <h-col :span="7">
              <label>基金代码</label>
              <h-input
                placeholder="请输入"
                v-model="fundId"
                style="width: 14vw"
              ></h-input>
            </h-col>
            <h-col :span="7">
              <label>基金名称</label>
              <h-input
                placeholder="请输入"
                v-model="fundName"
                style="width: 14vw"
              ></h-input>
            </h-col>
            <h-col :span="2">
              <h-button type="primary" long @click="search">
                <h-icon name="android-search" />&nbsp;搜索
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
        :data="data.filteredDataList"
        :columns="columns"
      ></Table>
    </div>
  </div>
</template>

<script>
import Table from "@/components/customer/Table.vue";

export default {
  components: { Table },
  data() {
    return {
      fundId: "",
      fundName: "",
      data: {
        key: 0,
        dataList: [
          {
            fundId: "LTSY202405176043",
            fundName: "落魄山一号",
            requestTime: "2020-01-01 16:40:25",
            dividentsTime: "2024-05-01 16:40:25",
            money: "20.30",
          },
          {
            fundId: "LTSE202405165945",
            fundName: "落魄山二号",
            requestTime: "2024-05-17 16:44:36",
            dividentsTime: "2024-05-20 09:35:44",
            money: "15.20",
          },
          {
            fundId: "LTSS202405085254",
            fundName: "落魄山三号",
            requestTime: "2024-05-17 16:47:29",
            dividentsTime: "2024-04-23 10:25:01",
            money: "45.80",
          },
          {
            fundId: "JQZCY198208303728",
            fundName: "剑气长城一号",
            requestTime: "2024-05-20 15:03:50",
            dividentsTime: "2024-05-25 13:40:25",
            money: "38.30",
          },
          {
            fundId: "LZY202405239574",
            fundName: "龙州一号",
            requestTime: "2024-05-23 11:19:17",
            dividentsTime: "2024-05-26 08:25:03",
            money: "20.30",
          },
          {
            fundId: "LZY202405232185",
            fundName: "龙州一号",
            requestTime: "2024-05-23 11:50:17",
            dividentsTime: "2024-05-23 10:44:25",
            money: "31.50",
          },
          {
            fundId: "LZY202405234045",
            fundName: "龙州一号",
            requestTime: "2024-05-23 11:19:22",
            dividentsTime: "2024-05-25 16:32:25",
            money: "17.20",
          },
          {
            fundId: "JQZCE202405015231",
            fundName: "剑气长城二号",
            requestTime: "2024-05-23 18:41:11",
            dividentsTime: "2024-05-27 14:50:35",
            money: "18.30",
          },
          {
            fundId: "JQZCE202405017433",
            fundName: "剑气长城二号",
            requestTime: "2024-05-23 18:41:17",
            dividentsTime: "2024-05-26 16:30:11",
            money: "28.60",
          },
          {
            fundId: "JQZCE202405018287",
            fundName: "剑气长城二号",
            requestTime: "2024-05-23 18:41:21",
            dividentsTime: "2024-05-25 13:40:25",
            money: "26.50",
          },
          {
            fundId: "JQZCE202405018766",
            fundName: "剑气长城二号",
            requestTime: "2024-05-23 18:41:27",
            dividentsTime: "2024-05-26 16:22:26",
            money: "35.70",
          },
          {
            fundId: "JQZCS202405164141",
            fundName: "剑气长城三号",
            requestTime: "2024-05-23 19:42:06",
            dividentsTime: "2024-05-26 13:20:54",
            money: "19.30",
          },
          {
            fundId: "LXZY202405152788",
            fundName: "流霞洲一号",
            requestTime: "2024-05-23 19:44:21",
            dividentsTime: "2024-05-24 10:22:30",
            money: "23.50",
          },
          {
            fundId: "LXZE202405113575",
            fundName: "流霞洲二号",
            requestTime: "2024-05-23 19:54:03",
            dividentsTime: "2024-05-25 17:20:30",
            money: "16.70",
          },
          {
            fundId: "LXZS202405241311",
            fundName: "流霞洲三号",
            requestTime: "2024-05-23 20:12:43",
            dividentsTime: "2024-05-24 16:40:25",
            money: "15.30",
          },
        ],
        filteredDataList: [],
      },
      columns: [
        {
          title: "基金代码",
          key: "fundId",
        },
        {
          title: "基金名称",
          key: "fundName",
        },
        {
          title: "填单日期",
          key: "requestTime",
        },
        {
          title: "分红日期",
          key: "dividentsTime",
        },
        {
          title: "分红（每十股）",
          key: "money",
        },
      ],
    };
  },
  created() {
    this.data.filteredDataList = this.data.dataList;
  },
  methods: {
    search() {
      const fundId = this.fundId.trim().toLowerCase();
      const fundName = this.fundName.trim().toLowerCase();

      if (fundId === "" && fundName === "") {
        this.data.filteredDataList = this.data.dataList;
      } else {
        this.data.filteredDataList = this.data.dataList.filter((item) => {
          const matchFundId = item.fundId.toLowerCase().includes(fundId);
          const matchFundName = item.fundName.toLowerCase().includes(fundName);
          return matchFundId && matchFundName;
        });
      }

      this.data.key++;
    },
  },
};
</script>

<style scoped>
label {
  text-align: right;
  background-color: #f7f7f7;
  width: 6vw;
  display: inline-block;
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
