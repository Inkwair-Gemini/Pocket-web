<template>
  <div class="content">
    <SelectCustomer
      :disabledArr="[false, false, false]"
      :selectLink="selectLink"
      :title="title"
      @send-data="handleGetData"
    ></SelectCustomer>
    <div class="table-content">
      <div class="table">
        <h-table
          :canDrag="false"
          :data="tData"
          :columns="columns"
          stripe
          border
        >
        </h-table>
      </div>
      <div class="page">
        <h-page
          :total="data.dataList.length"
          @on-change="dataChange"
          show-elevator
          show-total
          fastArrival
          :page-size="page_size"
        ></h-page>
      </div>
    </div>
    <h-msg-box
      v-model="operate_button_show"
      title="解绑验证"
      :maskClosable="false"
      :closable="false"
    >
      <BankCardAuth
        :bankCard="operate_button_info"
        ref="bankCardAuth"
      ></BankCardAuth>
      <p slot="footer">
        <h-button @click="closeAuthBox">取消</h-button>
        <h-button type="error" @click="unbindBankCard">解绑</h-button>
      </p>
    </h-msg-box>
    <BankCardAdd
      :operate_button_show="add_button_show"
      :CustomerId="operate_button_info.accountId"
      @closeBox="add_button_show = false"
      @sendCard="handleSendCard"
    ></BankCardAdd>
  </div>
</template>
<script>
import { postData } from "@/js/api.js";
import SelectCustomer from "@/components/customer/SelectCustomer.vue";
import Table from "@/components/customer/Table.vue";
import BankCardAdd from "@/components/customer/BankCardAdd.vue";
import BankCardAuth from "@/components/customer/BankCardAuth.vue";
export default {
  components: { SelectCustomer, Table, BankCardAdd, BankCardAuth },
  data() {
    return {
      selectLink: "/customer/bankCard/getBankCardList",
      title: "银行卡管理",
      page_size: 11,
      currentPage:1,
      operate_button_info: {},
      operate_button_show: false,
      add_button_show: false,
      data: { dataKey: 0, dataList: [] },
      tData: [],
      columns: [
        {
          title: "基金账号",
          key: "accountId",
          width: 190,
        },
        {
          title: "姓名",
          key: "name",
          width: 170,
        },
        {
          title: "预留手机号",
          key: "phone",
          width: 200,
        },
        {
          title: "银行卡号",
          key: "cardNo",
          width: 250,
        },
        {
          title: "开户银行",
          key: "bankName",
          width: 180,
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
                    type: "error",
                    size: "small",
                    disabled: this.data.dataList.length === 1,
                  },
                  on: {
                    click: () => {
                      this.operate_button_show = true;
                      this.operate_button_info = params.row;
                    },
                  },
                },
                "解绑"
              ),
              h(
                "h-button",
                {
                  props: {
                    type: "success",
                    size: "small",
                  },
                  style: {
                    marginLeft: "25px",
                  },
                  on: {
                    click: () => {
                      this.add_button_show = true;
                      this.operate_button_info = params.row;
                    },
                  },
                },
                "新绑定"
              ),
            ]);
          },
        },
      ],
    };
  },
  mounted() {
    this.data.dataKey++;
    this.tData = this.data.dataList.slice(0, this.page_size);
  },
  methods: {
    handleGetData(cardList) {
      this.data.dataList = cardList;
      this.data.dataKey++;
      this.tData = this.data.dataList.slice(0, this.page_size);
    },
    //添加银行卡-接收银行卡数据
    handleSendCard(card) {
      const newCard = {
        name: this.operate_button_info.name,
        cardNo: card.cardNo,
        bankName: card.bankName,
        phone: card.phone,
        accountId: this.operate_button_info.accountId,
      };
      this.data.dataList.push(newCard);
      this.data.dataKey++;
      this.toLastPage();
    },
    //解绑银行卡验证-窗口关闭
    closeAuthBox() {
      this.operate_button_show = false;
      this.$refs.bankCardAuth.resetForm();
    },
    //解绑银行卡
    async unbindBankCard() {
      try {
        const data = await postData("/customer/bankCard/unbindBankCard", {
          id: this.operate_button_info.id,
          code: this.$refs.bankCardAuth.code,
        });
        if (data.code === 0) {
          this.$hMessage.success("解绑成功");
          //成功后删除
          const index =
            this.operate_button_info._index +
            (this.currentPage - 1) * this.page_size;
          this.data.dataList.splice(index, 1);
          this.data.dataKey++;
          //隐藏
          this.operate_button_show = false;
          //清理
          this.$refs.bankCardAuth.resetForm();
        } else {
          this.$hMessage.error(data.code + ":" + data.msg);
        }
      } catch (error) {
        this.$hMessage.error("请求失败，请重试或联系管理员");
      }
    },
    dataChange(i) {
      this.tData = this.data.dataList.slice(
        (i - 1) * this.page_size,
        i * this.page_size
      );
      this.currentPage = i;
    }
  },
};
</script>
<style scoped>
.table-content {
  height: 72vh;
}
.table {
  width: 80vw;
  margin-left: 2%;
  padding-bottom: 1%;
  height: 92%;
}
.page {
  height: 7%;
  text-align: right;
  margin-right: 2.5%;
}
.add {
  margin-top: 3vh;
}
</style>