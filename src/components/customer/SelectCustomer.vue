<template>
  <div class="main">
    <h-form>
      <p class="title">{{ title }}</p>
      <br />
      <h-form-item>
        <h-row>
          <h-col :span="6">
            <label>客户姓名</label>
            <h-input
              :disabled="disabledArr[0]"
              placeholder="可选输入"
              style="width: 55%"
              v-model="selectInfo.customerName"
            ></h-input>
          </h-col>
          <h-col :span="7">
            <label>基金账号</label>
            <h-input
              :disabled="disabledArr[1]"
              placeholder="可选输入"
              style="width: 65%"
              v-model="selectInfo.customerAccountId"
            ></h-input>
          </h-col>
          <h-col :span="7">
            <label>手机/电话</label>
            <h-input
              :disabled="disabledArr[2]"
              placeholder="可选输入"
              style="width: 65%"
              v-model="selectInfo.phone"
            ></h-input>
          </h-col>
          <h-col :span="2">
            <h-button
              type="primary"
              long
              class="select-button"
              @click="getInfo"
            >
              <h-icon name="android-search" />&nbsp;搜索
            </h-button>
          </h-col>
        </h-row>
      </h-form-item>
    </h-form>
  </div>
</template>
<script>
import { postData } from "@/js/api.js";
export default {
  props: {
    disabledArr: Array,
    selectLink: "",
    title:""
  },
  data() {
    return {
      selectInfo: {
        customerName: "",
        customerAccountId: "",
        phone: "",
      },
      getData: [],
    };
  },
  methods: {
    async getInfo() {
      try {
        const data = await postData(this.selectLink + "?current=1&size=999", {
          name: this.selectInfo.customerName,
          accountId: this.selectInfo.customerAccountId,
          phone: this.selectInfo.phone
        });
        if (data.code === 0) {
          this.getData = data.data.list;
          this.sendInfo();
        } else {
          this.$hMessage.error(data.code + ":" + data.msg);
        }
      } catch (error) {
        this.$hMessage.error("请求失败，请重试或联系管理员");
      }
    },
    sendInfo() {
      this.$emit("send-data", this.getData);
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
  margin-bottom: 3vh;
}
.title {
  padding-top: 2vh;
  padding-left: 1vw;
  font-size: medium;
  color: rgb(53, 50, 50);
  font-weight: bold;
}
.select-button {
  margin-left: 40%;
}
</style>