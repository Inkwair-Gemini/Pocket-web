<template>
  <h-msg-box
    v-model="operate_button_show"
    :closable="false"
    title="添加银行卡"
    :maskClosable="false"
  >
    <h-form :model="bankCard" ref="bankCard">
      <h-row>
        <h-form-item label="银行卡号" prop="cardNo" required>
          <el-autocomplete
            v-model="bankCard.cardNo"
            style="width: 20vw"
            size="small"
            :fetch-suggestions="queryCardNo"
          ></el-autocomplete>
        </h-form-item>
      </h-row>
      <h-row>
        <h-form-item label="开户银行" prop="bankName" required>
          <h-select
            v-model="bankCard.bankName"
            placeholder="请选择"
            :setDefSelect="true"
            style="width: 10vw"
          >
            <h-option key="1" value="拿下银行">拿下银行</h-option>
          </h-select>
        </h-form-item>
      </h-row>
      <h-row>
        <h-form-item label="预留手机号" prop="phone" required>
          <el-autocomplete
            v-model="bankCard.phone"
            style="width: 12vw"
            size="small"
            :fetch-suggestions="queryPhone"
          ></el-autocomplete>
        </h-form-item>
      </h-row>
      <h-row>
        <h-form-item label="验证码">
          <h-input v-model="code" style="width: 10vw"></h-input>
          &nbsp;
          <h-button
            :loading="loading || countdown > 0"
            @click="questCode"
            type="primary"
          >
            <template v-if="countdown > 0"
              >{{ countdown }} 秒后重新发送</template
            >
            <template v-else>发送</template>
          </h-button>
        </h-form-item>
      </h-row>
      <h-row class="buttons">
        <h-button @click="closeAddBox">取消</h-button>
        <h-button type="primary" @click="addBankCard" style="margin-left: 20px"
          >添加</h-button
        >
      </h-row>
    </h-form>
    <p slot="footer"></p>
  </h-msg-box>
</template>

<script>
import { postData, getData } from "@/js/api.js";
export default {
  props: {
    operate_button_show: Boolean,
    CustomerIdNo: String,
    CustomerId: String,
    CustomerName:String
  },
  data() {
    return {
      showMessageBox: false,
      loading: false,
      countdown: 0,
      bankCard: {
        cardNo: "",
        bankName: "",
        phone: "",
      },
      code: "",
      addConmit: false,
    };
  },
  methods: {
    closeAddBox() {
      this.$emit("closeBox");
      this.resetForm();
    },
    async questCode() {
      if (this.countdown === 0) {
        // 恢复按钮为不可用状态
        this.loading = true;
        // 设置倒计时为15秒
        this.countdown = 15;
        // 开始倒计时
        this.startCountdown();
        try {
          // 发送表单数据到后端
          const data = await getData(
            `/customer/account/getPhoneCode?phone=${this.bankCard.phone}`
          );
          if (data.code !== 0) {
            this.$hMessage.error(data.code + ":" + data.msg);
          }
        } catch (error) {
          this.$hMessage.error("请求失败，请重试或联系管理员");
        }
      }
    },
    addSuccess() {
      //反馈
      this.$hMessage.success("绑定成功");

      //向父组件发送消息
      this.$emit("sendCard", this.bankCard);

      //隐藏
      this.closeAddBox();
      //清理
      this.resetForm();
    },
    addBankCard() {
      this.$refs.bankCard.validate(async (valid) => {
        if (valid) {
          if (
            this.CustomerId === undefined &&
            this.CustomerIdNo !== undefined
          ) {
            this.addBankCardByIdNo();
          } else if (
            this.CustomerId !== undefined &&
            this.CustomerIdNo === undefined
          ) {
            this.addBankCardByCustomerId();
          }
        } else {
          this.$hMessage.error("请正确填写表单");
        }
      });
    },
    async addBankCardByIdNo() {
      try {
        const data = await postData(
          "/customer/account/bankCardPhoneAuthentication",
          {
            phone: this.bankCard.phone,
            code: this.code,
          }
        );
        if (data.code === 0) {
          const data = await postData(
            "/customer/account/bankCardAuthentication",
            {
              idNo: this.CustomerIdNo,
              cardNo: this.bankCard.cardNo,
              bankName: this.bankCard.bankName,
              phone: this.bankCard.phone,
            }
          );
          if (data.code === 0) {
            this.addSuccess();
          } else {
            this.$hMessage.error(data.code + ":" + data.msg);
          }
        } else {
          this.$hMessage.error(data.code + ":" + data.msg);
        }
      } catch (error) {
        this.$hMessage.error("请求失败，请重试或联系管理员");
      }
    },
    async addBankCardByCustomerId() {
      try {
        const data = await postData(
          "/customer/account/bankCardPhoneAuthentication",
          {
            phone: this.bankCard.phone,
            code: this.code,
          }
        );
        if (data.code === 0) {
          const data = await postData(
            "/customer/bankCard/bindBankCard",
            {
              accountId: this.CustomerId,
              cardNo: this.bankCard.cardNo,
              bankName: this.bankCard.bankName,
              phone: this.bankCard.phone,
            }
          );
          if (data.code === 0) {
            this.addSuccess();
          } else {
            this.$hMessage.error(data.code + ":" + data.msg);
          }
        } else {
          this.$hMessage.error(data.code + ":" + data.msg);
        }
      } catch (error) {
        this.$hMessage.error("请求失败，请重试或联系管理员");
      }
    },
    startCountdown() {
      const countdownInterval = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          clearInterval(countdownInterval);
          // 清除定时器后，按钮恢复可用状态
          this.loading = false;
        }
      }, 1000); // 每秒减少1秒
    },
    resetForm() {
      this.bankCard = {
        cardNo: "",
        bankName: "拿下银行",
        phone: "",
      };
      this.code = "";
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
    queryCardNo(queryString, callback) {
      this.querySearchAsync(
        queryString,
        `/customer/bankCard/getBankCardListForInput`,
        callback
      );
    },
    queryPhone(queryString, callback) {
      this.querySearchAsync(
        queryString,
        `/customer/account/getPhoneListForInput`,
        callback
      );
    },
  },
};
</script>

<style scoped>
.h-form-item >>> label {
  text-align: right;
  background-color: #f7f7f7;
  width: 7vw;
  display: inline-block; /* 使标签成为行内块级元素 */
  margin-left: 1vw;
  margin-right: 0.5vw;
  font-weight: bolder;
  font-size: x-small;
  padding-right: 1vw;
}
h-row {
  width: 28vw;
}
.buttons {
  margin-top: 20px;
  text-align: right;
}
</style>