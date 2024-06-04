<template>
  <div class="main">
    <div class="top">
      <h-form>
        <p class="title">产品管理</p>
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
            <h-col :span="7">
              <label>基金类型</label>
              <h-select
                placeholder="请选择"
                v-model="fundType"
                style="width: 12vw"
              >
                <h-option
                  v-for="item in TypeList"
                  :value="item.label"
                  :key="item.value"
                  >{{ item.label }}</h-option
                >
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
    <div class="add">
      <h-button type="success" @click="handleAdd">
        <h-icon name="t-b-new" />
        基金上架
      </h-button>
      <AddMenu ref="addMenu" @addSuccess="getInfo"></AddMenu>
    </div>
    <div class="table">
      <Table
        :page_size="10"
        :key="data.key"
        :data="data.dataList"
        :columns="columns"
      ></Table>
      <Trand ref="Trand" @clear-data="handleClearData"></Trand>
    </div>
  </div>
</template>

<script>
import Table from "@/components/customer/Table.vue";
import AddMenu from "@/components/product/AddMeue.vue";
import Trand from "@/components/product/Trand.vue";
import { postData } from "@/js/api.js";
export default {
  components: { Table, AddMenu, Trand },
  data() {
    return {
      TypeList: [
        { value: 0, label: "货币基金" },
        { value: 1, label: "债券型基金" },
        { value: 2, label: "混合型基金" },
        { value: 3, label: "股票型基金" },
      ],
      fundId: "",
      fundName: "",
      fundType: null,
      data:{ key: 0, dataList: [] },
      columns: [
        {
          title: "基金代码",
          key: "fundId",
          width: 180,
        },
        {
          title: "基金名称",
          key: "name",
          width: 200,
        },
        {
          title: "当前净值",
          key: "netWorth",
          width: 180,
        },
        {
          title: "基金类型",
          key: "type",
          width: 180,
        },
        {
          title: "托管人",
          key: "custodian",
          width: 180,
        },
        {
          title: "资产规模",
          key: "scale",
          width: 180,
        },
        {
          title: "管理人",
          key: "manager",
          width: 180,
        },
        {
          title: "成立日期",
          key: "gmtCreate",
          width: 200,
        },
        {
          title: "净值更新时间",
          key: "gmtModified",
          width: 200,
        },
        {
          title: "操作",
          key: "operate",
          align: "center",
          width: 150,
          fixed: "right",
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
                      this.$refs.Trand.openModal2(params.row);
                    },
                  },
                },
                "详情"
              ),
            ]);
          },
        },
      ],
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    handleAdd() {
      this.$refs.addMenu.openModal();
    },
    async getInfo() {
      try {
        const data = await postData("/fund/fund/getFundList?current=1&size=999", {
          fundId: this.fundId,
          name: this.fundName,
          type: (this.fundType === "")?null:this.fundType,
        });
        if (data.code === 0) {
          this.data.dataList = data.data.list;
          this.data.key++;
        } else {
          this.$hMessage.error(data.code + ":" + data.msg);
        }
      } catch (error) {
        this.$hMessage.error("请求失败，请重试或联系管理员");
        console.log(error)
      }
    },
    handleClearData(fundId) {
      this.data.dataList = this.data.dataList.filter(item => item.fundId !== fundId);
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
.add {
  margin-left: 2%;
  margin-bottom: 1%;
}
.table {
  height: 66vh;
}
</style>
