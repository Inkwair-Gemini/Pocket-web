<template>
  <h-msg-box
    v-model="modal1"
    :escClose="true"
    @on-open="handleReset()"
    title="基金上架"
  >
    <h-form ref="formValidate" :model="formValidate" >
      <h-form-item label="基金名称" prop="name" required>
        <h-input
          v-model="formValidate.name"
          placeholder="请输入基金名称"
          style="width: 60%"
        ></h-input>
      </h-form-item>
      <h-form-item label="基金类型" prop="type" required>
        <h-select
          placeholder="请选择基金类型"
          v-model="formValidate.type"
          style="width: 60%"
        >
          <h-option
            v-for="item in TypeList"
            :value="item.value"
            :key="item.value"
            >{{ item.label }}</h-option
          >
        </h-select>
      </h-form-item>
      <h-form-item label="资产规模" prop="scale" required>
        <h-input
          v-model="formValidate.scale"
          placeholder="请输入资产规模（以万结尾）"
          style="width: 60%"
        ></h-input>
      </h-form-item>
      <h-form-item label="基金管理人" prop="manager" required>
        <h-input
          v-model="formValidate.manager"
          placeholder="请输入基金管理人"
          style="width: 60%"
        ></h-input>
      </h-form-item>
      <h-form-item label="基金托管人" prop="custodian" required>
        <h-input
          v-model="formValidate.custodian"
          placeholder="请输入基金托管人"
          style="width: 60%"
        ></h-input>
      </h-form-item>
      <h-form-item label="成立日期" prop="createTime" required>
        <h-date-picker
          style="width: 60%"
          type="date"
          placeholder="选择日期"
          v-model="formValidate.createTime"
        ></h-date-picker>
      </h-form-item>
      <div>
        <div class="button-container">
          <h-button type="primary" @click="handleSubmit()">提交</h-button>
          <h-button type="ghost" @click="handleReset()">重置</h-button>
        </div>
      </div>
    </h-form>
    <p slot="footer"></p>
  </h-msg-box>
</template>

<script>
import { postData } from "@/js/api.js";
import { transferTime } from "@/js/timeUtil.js";
export default {
  data() {
    return {
      modal1: false,
      TypeList: [
        { value: 0, label: "货币基金" },
        { value: 1, label: "债券型基金" },
        { value: 2, label: "混合型基金" },
        { value: 3, label: "股票型基金" },
      ],
      formValidate: {
        name: "",
        type: "",
        scale: "",
        manager: "",
        custodian: "",
        createTime: "",
      },
      
    };
  },
  methods: {
    openModal() {
      this.modal1 = true;
    },
    check() {
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          this.handleSubmit();
        } else {
          // 表单验证失败
          this.$hMessage.error("表单填写有误，请检查并重试");
        }
      });
    },
    async handleSubmit() {
      // 表单验证通过，执行提交操作
      try {
        const data = await postData("/fund/fund/addFund", {
          name: this.formValidate.name,
          type: this.formValidate.type,
          scale: Number(this.formValidate.scale) * 10000,
          manager: this.formValidate.manager,
          custodian: this.formValidate.custodian,
          createTime: transferTime(this.formValidate.createTime),
          netWorth: 1,
        });
        if (data.code === 0) {
          this.$hMessage.success("基金上架成功");
          this.$emit("addSuccess")
          this.handleReset();
          this.modal1 = false;
        } else {
          this.$hMessage.error(data.code + ":" + data.msg);
        }
      } catch (error) {
        this.$hMessage.error("请求失败，请重试或联系管理员");
      }
    },
    handleReset() {
      this.$refs.formValidate.resetFields();
    },
  },
};
</script>

<style scoped>
.h-form-item >>> .h-form-item-label {
  width: 120px !important;
}
.button-container {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}
.button-container > *:not(:last-child) {
  margin-right: 30px; /* 在按钮之间添加间距 */
}
</style>
