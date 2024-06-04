<template>
  <div class="form">
    <div class="title">
      <h2>填写申购单</h2>
    </div>
    <h-form :model="formItem" ref="formItem">
      <h-form-item label="基金账号" prop="accountId" required>
        <el-autocomplete
          v-model="formItem.accountId"
          style="width: 40%"
          size="small"
          :fetch-suggestions="queryAccountId"
        ></el-autocomplete>
      </h-form-item>
      <h-form-item label="基金代码" prop="fundId" required>
        <el-autocomplete
          v-model="formItem.fundId"
          style="width: 40%"
          size="small"
          :fetch-suggestions="queryFundId"
        ></el-autocomplete>
      </h-form-item>
      <h-form-item label="银行卡号" prop="cardNo" required>
        <el-autocomplete
          v-model="formItem.cardNo"
          style="width: 40%"
          size="small"
          :fetch-suggestions="queryCardNo"
        ></el-autocomplete>
      </h-form-item>
      <h-form-item label="申购金额" prop="amount" required>
        <h-input
          v-model="formItem.amount"
          placeholder="单位:元"
          style="width: 20%"
        ></h-input>
      </h-form-item>
      <h-form-item label="分红方式" prop="dividendMethod" required>
        <h-select
          placeholder="请选择"
          :setDefSelect="true"
          style="width: 30%"
          v-model="formItem.dividendMethod"
        >
          <h-option key="1" :value="1" selected>红利再投资</h-option>
          <h-option key="2" :value="0">原卡进出</h-option>
        </h-select>
      </h-form-item>
      <br />
      <span style="margin-left: 7%"
        >注意：在申请订单交易日内可撤销，下个交易日后不可撤销！</span
      >
      <div class="buttons">
        <h-button type="primary" @click="toSubscription">提交</h-button>
        <h-button type="ghost" @click="reset" style="margin-left: 8px"
          >重置</h-button
        >
      </div>
    </h-form>
    <h-msg-box
      v-model="customerAuth_visiable"
      title="客户短信验证"
      :closable="false"
      :maskClosable="false"
    >
      <CustomerAuth :phone="phone" ref="CustomerAuth"></CustomerAuth>
      <p slot="footer">
        <h-button @click="closeCustomerAuth">取消</h-button>
        <h-button type="primary" @click="toCustomerAuth">验证</h-button>
      </p>
    </h-msg-box>
    <h-msg-box
      v-model="bankCardAuth_visiable"
      title="银行卡密码验证"
      :closable="false"
      :maskClosable="false"
    >
      <BankCardPassword
        :bankCardId="formItem.cardNo"
        ref="BankCardPassword"
      ></BankCardPassword>
      <p slot="footer">
        <h-button @click="closeBankCardAuth">取消</h-button>
        <h-button
          type="primary"
          @click="toBankCardAuth_subscription"
          :loading="loading"
          >验证</h-button
        >
      </p>
    </h-msg-box>
    <h-msg-box v-model="success_visiable" title="申请申购成功">
      <h-form :model="formItem">
        <h-form-item>
          <label class="msgLabel">申请编号</label>
          <span style="width: 40%">{{ subscriptionId }}</span>
        </h-form-item>
        <h-form-item>
          <label class="msgLabel">基金代码</label>
          <span style="width: 40%">{{ formItem.fundId }}</span>
        </h-form-item>
        <h-form-item>
          <label class="msgLabel">基金账号</label>
          <span style="width: 40%">{{ formItem.accountId }}</span>
        </h-form-item>
        <h-form-item>
          <label class="msgLabel">申购金额</label>
          <span style="width: 40%">{{ formItem.amount }}</span>
        </h-form-item>
        <h-form-item>
          <label class="msgLabel">申购时间</label>
          <span style="width: 40%">{{ subscriptionTime }}</span>
        </h-form-item>
        <h-form-item>
          <label class="msgLabel">状态</label>
          <span style="width: 40%">申请中</span>
        </h-form-item>
      </h-form>
      <p slot="footer">
        <h-button type="primary" @click="reset">确认</h-button>
      </p>
    </h-msg-box>
  </div>
</template>
<script>
import { postData } from "@/js/api.js";
import { getNow } from "@/js/timeUtil.js";
import CustomerAuth from "@/components/trade/CustomerAuth.vue";
import BankCardPassword from "@/components/trade/BankCardPassword.vue";
export default {
  components: { CustomerAuth, BankCardPassword },
  data() {
    return {
      customerAuth_visiable: false,
      bankCardAuth_visiable: false,
      success_visiable: false,
      phone: "13083976501",
      loading: false,
      formItem: {
        accountId: "",
        fundId: "",
        cardNo: "",
        amount: "",
        dividendMethod: "",
      },
      subscriptionId: "",
      subscriptionTime: "",
      state: "",
    };
  },
  mounted() {
    const routerData = this.$route.query.data;
    if (routerData !== undefined) {
      this.formItem.accountId = routerData.accountId;
      this.formItem.fundId = routerData.fundId;
    }
  },
  methods: {
    closeCustomerAuth() {
      this.customerAuth_visiable = false;
      this.$refs.CustomerAuth.reset();
    },
    closeBankCardAuth() {
      this.bankCardAuth_visiable = false;
      this.$refs.BankCardPassword.resetForm();
    },
    async toSubscription() {
      this.$refs.formItem.validate(async (valid) => {
        if (valid) {
          // try {
          //   const data = await postData(
          //     "/customer/getPhoneById",
          //     this.accountId
          //   );
          //   if (data.code === 0) {
          //     this.phone = data.data;
          this.customerAuth_visiable = true;
          //     } else {
          //       this.$hMessage.error(data.code + ":" + data.msg);
          //     }
          //   } catch (error) {
          //     this.$hMessage.error("请求失败，请重试或联系管理员");
          //   }
        } else {
          this.$hMessage.error("请填写完整信息");
        }
      });
    },

    async toCustomerAuth() {
      // try {
      //   // 验证
      //   const data = await postData("/customer/account/phoneAuthentication", {
      //     phone: this.$refs.CustomerAuth.phone,
      //     code: this.$refs.CustomerAuth.code,
      //   });
      //   if (data.code === 0) {
      this.$hMessage.success("验证成功");
      this.customerAuth_visiable = false;
      this.bankCardAuth_visiable = true;
      //   } else {
      //     this.$hMessage.error(data.code + ":" + data.msg);
      //   }
      // } catch (error) {
      //   this.$hMessage.error("请求失败，请重试或联系管理员");
      // }
    },
    async toBankCardAuth_subscription() {
      this.loading = true;
      try {
        const data = await postData("/trade/subscription/addSubscription", {
          accountId: this.formItem.accountId,
          fundId: this.formItem.fundId,
          cardNo: this.formItem.cardNo,
          amount: this.formItem.amount,
          time: getNow(),
          dividendMethod: this.formItem.dividendMethod,
          password: this.$refs.BankCardPassword.password,
        });
        if (data.code === 0) {
          this.loading = false;
          this.state = data.data.state;
          this.subscriptionId = data.data.subscriptionId;
          this.subscriptionTime = data.data.time;
          this.$hMessage.success("申请申购成功");
          this.success_visiable = true;
          this.bankCardAuth_visiable = false;
        } else {
          this.$hMessage.error(data.code + ":" + data.msg);
        }
      } catch (error) {
        this.$hMessage.error("请求失败，请重试或联系管理员");
      } finally {
        this.loading = false;
      }
    },
    reset() {
      this.success_visiable = false;
      this.$refs.formItem.resetFields();
    },
    async querySearchAsync(queryString, url, callback) {
      if (!queryString.trim()) {
        callback([]);
        return;
      }
      try {
        const data = await postData(url, { queryString });
        console.log(data)
        if (data.code === 0) {
          const results = data.data.list
            .filter(item => item && item.toLowerCase().includes(queryString.toLowerCase()))
            .map(item => ({ value: item })); // 将字符串转换为对象
          console.log(`Filtered results: `, results); // 调试输出
          callback(results);
        } else {
          this.$hMessage.error(data.code + ": " + data.msg);
        }
      } catch (error) {
        this.$hMessage.error("请求失败，请重试或联系管理员");
        console.log(error);
      }
    },
    queryAccountId(queryString, callback) {
      this.querySearchAsync(
        queryString,
        `/customer/account/getAccountIdListForInput`,
        callback
      );
    },
    queryFundId(queryString, callback) {
      this.querySearchAsync(
        queryString,
        `/fund/fund/getFundIdListForInput`,
        callback
      );
    },
    queryCardNo(queryString, callback) {
      this.querySearchAsync(
        queryString,
        `/customer/bankCard/getBankCardListForInput`,
        callback
      );
    },
  },
};
</script>
<style scoped>
.h-form-item {
  width: 70vw;
}

.h-form-item >>> label {
  text-align: right;
  background-color: #f7f7f7;
  width: 7vw;
  display: inline-block; /* 使标签成为行内块级元素 */
  margin-left: 2vw;
  margin-right: 0.5vw;
  font-weight: bolder;
  font-size: x-small;
  padding-right: 1vw;
}

.form {
  overflow: auto;
  height: 86vh;
}
.title {
  margin: 2vh 0 2vh 3vw;
}
.buttons {
  margin-top: 2%;
  margin-left: 15%;
}
</style>
