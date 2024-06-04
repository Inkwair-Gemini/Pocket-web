<template>
  <h-form>
    <h-row>
      <h-form-item>
        <label>银行卡号</label>
        <h-input
          readonly
          v-model="bankCardId"
          style="width: 20vw"
        ></h-input>
      </h-form-item>
    </h-row>
    <h-row>
      <h-form-item>
        <label>密码</label>
        <h-input type="password" v-model="password" class="required" style="width: 10vw"></h-input>
        &nbsp;
      </h-form-item>
    </h-row>
  </h-form>
</template>

<script>
export default {
  props: { bankCardId: String },
  data() {
    return {
      password: "",
    };
  },
  methods: {
    resetForm() {
      this.password = "";
    },
  },
};
</script>

<style sscoped>
label {
  text-align: right;
  background-color: #f7f7f7;
  width: 5vw;
  display: inline-block; /* 使标签成为行内块级元素 */
  margin-left: 1vw;
  font-weight: bolder;
  font-size: x-small;
  padding-right: 1vw;
}
label.required::before {
  content: "*";
  color: red;
  display: inline-block;
  font-weight: bolder;
}
h-row {
  width: 28vw;
}
</style>