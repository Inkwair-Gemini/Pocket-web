<template>
  <div class="__404__">
    <img alt="Not Found" src="http://misitetong.com/pocket-web-assets/404.png" class="not-found" />
    <div>
      <p style="font-size: 72px; font-weight: 700; line-height: 60px; color: #333333;">404</p>
      <p style="font-size: 20px; line-height: 20px; color: #555555; margin-top: 44px;">抱歉，您访问的页面不存在</p>
      <div class="back" @click="jump('/home')">返回首页</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    jump(path) {
      this.$hCore.navigate(path);
    }
  }
};
</script>

<style lang="less" scoped>
.__404__ {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 160px;
}
.not-found {
  width: 414px;
  margin-right: 60px;
}
.back {
  cursor: pointer;
  margin-top: 24px;
  width: 64px;
  height: 32px;
  text-align: center;
  background-color: #4686f2;
  border-radius: 2px;
  font-size: 12px;
  line-height: 32px;
  color: #ffffff;
}
</style>
