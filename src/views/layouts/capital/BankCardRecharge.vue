<template>
  <div>
    <h-form ref="formItem" :model="formItem" class="form">
      <p class="title">银行卡充值</p>
      <br />
      <h-form-item label="银行卡号" prop="bankCardId" required>
        <el-autocomplete
          v-model="formItem.bankCardId"
          style="width: 40%"
          size="small"
          :fetch-suggestions="queryCardNo"
        ></el-autocomplete>
      </h-form-item>
      <h-form-item label="充值金额" prop="rechargeAmount" required>
        <h-input
          v-model="formItem.rechargeAmount"
          placeholder="单位：元"
          style="width: 40%"
        ></h-input>
      </h-form-item>
      <div class="buttons">
        <h-button type="primary" @click="subscription">提交</h-button>
        <h-button type="ghost" @click="reset" style="margin-left: 8px">
          重置
        </h-button>
      </div>
    </h-form>
    <h-msg-box v-model="visiable" title="充值成功">
      <h-form :model="formItem">
        <h-form-item label="银行卡号">
          <span style="width: 40%">{{ formItem.bankCardId }}</span>
        </h-form-item>
        <h-form-item label="充值金额">
          <span style="width: 40%">{{ formItem.rechargeAmount }}</span>
        </h-form-item>
        <h-form-item label="充值时间">
          <span style="width: 40%">{{ rechargeTime }}</span>
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
export default {
  data() {
    return {
      visiable: false,
      formItem: {
        bankCardId: "",
        rechargeAmount: "",
      },
      rechargeTime: "",
    };
  },
  methods: {
    async subscription() {
      this.$refs.formItem.validate(async (valid) => {
        if (valid) {
          try {
            /*
            const data = await postData("/bank/bankCard/recharge", {
              amount: this.formItem.rechargeAmount,
              cardNo: this.formItem.bankCardId,
            });
            console.log(data);
            // 请求成功的处理
            if (data.code === 0) {
              this.rechargeTime = getNow();
              this.visiable = true; // 显示充值成功提示框
            } else {
              // 请求失败的处理
              this.$hMessage.error(data.code + ":" + data.msg);
            } */
            const resp = await postData("/bank/bankCard/recharge", {
              amount: this.formItem.rechargeAmount,
              cardNo: this.formItem.bankCardId,
            });
            console.log(resp);
            if(resp.msg==="成功"){
                   const div=document.createElement('divform');
                   console.log(div);
                   div.innerHTML=resp.data;
                   document.body.appendChild(div);
                   document.forms[0].acceptCharset='GBK';
                   document.forms[0].setAttribute('target', '_blank')
                   //document.write(resp.data);
                   const newWindow = window.open('target', '_blank');
                   newWindow.document.write(resp.data);
                   newWindow.focus();
                   //document.forms[0].submit();
                   //document.forms[0].submit();
               }else{
                this.$hMessage.error(data.code + ":" + data.msg);
               }
          } catch (error) {
            this.$hMessage.error("请求失败");
          }
        } 
        else {
          this.$Message.error("请输入正确的充值信息");
        }
      });
    },
    reset() {
      this.visiable = false;
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
.title {
  padding-top: 2vh;
  font-size: medium;
  color: rgb(53, 50, 50);
  font-weight: bold;
}
.form {
  margin-left:3%;
}
.buttons {
  margin-top: 2%;
  margin-left: 15%;
}
.h-form-item >>> label {
  text-align: right;
  background-color: #f7f7f7;
  width: 6vw;
  display: inline-block; /* 使标签成为行内块级元素 */
  margin-left: 2vw;
  margin-right: 0.5vw;
  font-weight: bolder;
  font-size: x-small;
  padding-right: 1vw;
}
</style>
