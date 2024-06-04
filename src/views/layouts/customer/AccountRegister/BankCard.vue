<template>
  <div class="content">
    <Top :current="current" title="银行卡绑定"></Top>
    <div>
      <p class="title">绑定银行卡</p>
      <h-form v-for="(bankCard, index) in bankCards" :key="index">
        <br />
        <h-row>
          <h-col :span="8">
            <h-form-item>
              <label>银行卡号</label>
              <span style="width: 60%">{{ bankCard.cardNo }}</span>
            </h-form-item>
          </h-col>
          <h-col :span="7">
            <h-form-item>
              <label>预留手机号</label>
              <span style="width: 50%">{{ bankCard.phone }}</span>
            </h-form-item>
          </h-col>
          <h-col :span="7">
            <h-form-item>
              <h-form-item>
                <label>开户银行</label>
                <span style="width: 50%">{{ bankCard.bankName }}</span>
              </h-form-item>
            </h-form-item>
          </h-col>
          <h-col :span="2">
            <h-button
              type="error"
              :disabled="bankCards.length < 2"
              @click="removeBankCard(index)"
            >
              <h-icon size="15" name="android-delete" />
            </h-button>
          </h-col>
        </h-row>
      </h-form>
    </div>
    <div class="add">
      <h-button type="success" long @click="msgBox_show = true"
        ><h-icon name="t-b-new" />&nbsp;新增</h-button
      >
    </div>
    <div class="next">
      <h-button class="h-button" type="primary" @click="toNext"
        >下一步</h-button
      >
    </div>
    <BankCardAdd
      :operate_button_show="msgBox_show"
      :CustomerIdNo="customerIdNo"
      @closeBox="msgBox_show = false"
      @sendCard="handleSendCard"
    ></BankCardAdd>
  </div>
</template>

<script>
import { postData } from "@/js/api.js";
import Top from "@/components/customer/AccountRegister/Top.vue";
import BankCardAdd from "@/components/customer/BankCardAdd.vue";
export default {
  components: { Top, BankCardAdd },
  data() {
    return {
      current: 1,
      nextRouter: "layouts/customer/AccountRegister/Risk",
      customerIdNo: "",
      bankCards: [],
      msgBox_show: false,
    };
  },
  mounted() {
    this.customerIdNo = this.$store.state.registerInfo.idNo;
  },
  methods: {
    handleSendCard(card) {
      this.bankCards.push(card);
    },
    async removeBankCard(index) {
      try {
        const data = await postData("/customer/unbindingBankCard", {
          customerIdNo: this.customerIdNo,
          cardNo: this.bankCards[index].cardNo,
        });
        if (data.code === 0) {
          this.bankCards.splice(index, 1);
          this.$hMessage.error("解绑成功");
        } else {
          this.$hMessage.error(data.code + ":" + data.msg);
        }
      } catch (error) {
        this.$hMessage.error("请求失败，请重试或联系管理员");
      }
    },
    toNext() {
      if (this.bankCards.length < 1) {
        this.$hMessage.error("至少需绑定一张银行卡");
      } else {
        this.$router.push("/" + this.nextRouter);
      }
    },
  },
};
</script>
<style scoped>
label {
  text-align: right;
  background-color: #f7f7f7;
  width: 8vw;
  display: inline-block; /* 使标签成为行内块级元素 */
  margin-left: 2vw;
  font-weight: bolder;
  font-size: x-small;
  padding-right: 1vw;
}
.content {
  overflow: auto;
  height: 86vh;
}
.title {
  padding-top: 2vh;
  padding-left: 1vw;
  font-size: medium;
  color: rgb(53, 50, 50);
  font-weight: bold;
}
.add {
  margin: 2% 35% 0 35%;
}
.next {
  height: 30vh;
  width: 100%;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}
span {
  font-size: small;
  font-weight: bold;
  margin-left: 8px;
}
</style>