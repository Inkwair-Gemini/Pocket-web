<template>
    <div class="main">
        <h-breadcrumb>
            <h-breadcrumb-item >
            {{ formatPath(breadList[2].name) }}
            </h-breadcrumb-item>
        </h-breadcrumb>
    </div>
</template>

<script>
export default {
  data() {
    return {
      breadList: [] // 路由集合
    };
  },
  watch: {
    $route() {
      this.breadList = this.$route.matched;
    }
  },
  methods: {
    formatPath(path) {
      return path.split('/').join(' / ');
    }
  },
  created() {
    this.breadList = this.$route.matched;
  }
};
</script>
<style scoped>
.main{
  padding-left:0.5%;
  height:3vh;
  margin-top:-0.5vh;
  background-color: white;
}
</style>