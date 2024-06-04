<template>
  <h-form :model="bankCard">
    <h-row>
      <h-form-item label="银行卡号" prop="bankCardId"> 
        <h-input
          readonly
          v-model="bankCard.cardNo"
          style="width: 20vw"
        ></h-input>
      </h-form-item>
    </h-row>
    <h-row>
      <h-form-item label="预留手机号" prop="phone">
        <h-input
          readonly
          v-model="bankCard.phone"
          style="width: 12vw"
        ></h-input>
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
          <template v-if="countdown > 0">{{ countdown }} 秒后重新发送</template>
          <template v-else>发送</template>
        </h-button>
      </h-form-item>
    </h-row>
  </h-form>
</template>

<script>
import { getData } from "@/js/api.js";
export default {
  props: { bankCard: Object },
  data() {
    return {
      loading: false,
      countdown: 0,
      code: "",
    };
  },
  methods: {
    async questCode() {
      if (this.countdown === 0) {
        // 按钮为不可用状态
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
      this.code = "";
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
</style>