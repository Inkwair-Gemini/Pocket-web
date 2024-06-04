<template>
  <div>
    <Top :current="current" :title="title"></Top>
    <div class="content">
      <img class="picture" src="http://misitetong.com/pocket-web-assets/success.png" alt="图片描述" />
      <h1 class="title">
        基金账号：<span style="color: blue">{{ customerAccountId }}</span
        >，开户成功！
      </h1>
      <h2 class="risk">
        该客户的风险类型为：<span style="color: blue">{{
          investmentStyle
        }}</span>
      </h2>
    </div>
    <div>
      <h-button class="h-button" type="primary" @click="toNext">完成</h-button>
    </div>
  </div>
</template>

<script>
import Top from "@/components/customer/AccountRegister/Top.vue";
export default {
  components: { Top },
  data() {
    return {
      current: 3,
      title: "完成注册",
      customerAccountId:"",
      investmentStyle: "",
      next: "layouts/customer/AccountRegister/BasicInfo",
    };
  },
  mounted() {
    this.customerAccountId = this.$route.query.accountId
    this.investmentStyle = this.$route.query.investmentStyle
  },
  methods: {
    toNext() {
      this.$store.commit("clearRegisterInfo");
      this.$router.push("/" + this.next);
    },
  },
};
</script>

<style scoped>
.picture {
  position: relative;
  left: 38%;
  top: 7vh;
  height: 30vh;
  width: auto;
}
.title {
  position: relative;
  left: 34%;
  top: 9vh;
  width: 40vw;
}
.risk {
  position: relative;
  left: 38%;
  top: 12vh;
  width: 40vw;
}
.h-button {
  position: relative;
  left: 44.5%;
  top: 18vh;
  font-size: large;
}
</style>