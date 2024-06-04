<template>
  <div class="form">
    <div class="title">
      <h2>填写赎回单</h2>
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
      <h-form-item label="银行卡号">
        <h-input disabled placeholder="原卡退还" style="width: 40%"></h-input>
      </h-form-item>
      <h-form-item label="赎回份额" prop="portion" required>
        <h-input
          v-model="formItem.portion"
          placeholder="单位:份"
          style="width: 20%"
        ></h-input>
      </h-form-item>
      <br />
      <span style="margin-left: 7%"
        >注意：在申请订单交易日内可撤销，下个交易日后不可撤销！</span
      >
      <div class="buttons">
        <h-button type="primary" @click="toRedemption">提交</h-button>
        <h-button type="ghost" @click="reset" style="margin-left: 8px"
          >重置</h-button
        >
      </div>
    </h-form>
    <h-msg-box
      v-model="customerAuth_visiable"
      title="客户短信验证"
      :maskClosable="false"
      :closable="false"
    >
      <CustomerAuth :phone="phone" ref="CustomerAuth"></CustomerAuth>
      <p slot="footer">
        <h-button @click="closeCustomerAuth">取消</h-button>
        <h-button type="primary" @click="toCustomerAuth_Redemption"
          >验证</h-button
        >
      </p>
    </h-msg-box>
    <h-msg-box
      v-model="success_visiable"
      :maskClosable="false"
      :closable="false"
      title="申请赎回成功"
    >
      <h-form :model="formItem">
        <h-form-item label="申请编号">
          <span style="width: 40%">{{ redemptionId }}</span>
        </h-form-item>
        <h-form-item label="基金代码">
          <span style="width: 40%">{{ formItem.fundId }}</span>
        </h-form-item>
        <h-form-item label="基金账号">
          <span style="width: 40%">{{ formItem.accountId }}</span>
        </h-form-item>
        <h-form-item label="赎回份额">
          <span style="width: 40%">{{ formItem.portion }}</span>
        </h-form-item>
        <h-form-item label="赎回时间">
          <span style="width: 40%">{{ redemptionTime }}</span>
        </h-form-item>
        <h-form-item label="状态">
          <span style="width: 40%">{{ state }}</span>
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
export default {
  components: { CustomerAuth },
  data() {
    return {
      customerAuth_visiable: false,
      success_visiable: false,
      phone: "13083976501",
      formItem: {
        accountId: "",
        fundId: "",
        portion: "",
      },
      redemptionId: "",
      redemptionTime: "",
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
      this.$ref.CustomerAuth.reset();
    },
    async toRedemption() {
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
          //   } else {
          //     this.$hMessage.error(data.code + ":" + data.msg);
          //   }
          // } catch (error) {
          //   this.$hMessage.error("请求失败，请重试或联系管理员");
          // }
        } else {
          this.$hMessage.error("请正确填写表单");
        }
      });
    },

    async toCustomerAuth_Redemption() {
      try {
        const data = await postData("/trade/redemption/addRedemption", {
          accountId: this.formItem.accountId,
          fundId: this.formItem.fundId,
          portion: this.formItem.portion,
          // phone: this.phone,
          // code: this.$refs.CustomerAuth.code,
          time: getNow(),
        });
        if (data.code === 0) {
          this.$hMessage.success("验证成功");
          this.customerAuth_visiable = false;

          this.state = "申请中";
          this.redemptionId = data.data.redemptionId;
          this.redemptionTime = data.data.time;

          this.success_visiable = true;
          this.$hMessage.success("申请赎回成功");
        } else {
          this.$hMessage.error(data.code + ":" + data.msg);
        }
      } catch (error) {
        this.$hMessage.error("请求失败，请重试或联系管理员");
      }
    },
    reset() {
      this.success_visiable = false;
      this.formItem = {
        accountId: "",
        fundId: "",
        portion: "",
      };
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
