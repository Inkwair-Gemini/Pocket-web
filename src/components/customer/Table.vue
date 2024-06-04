<template>
  <div class="content">
    <div class="table">
      <h-table :canDrag="false" :data="tData" :columns="columns" stripe border> </h-table>
    </div>
    <div class="page">
      <h-page
        :total="data.length"
        @on-change="dataChange"
        show-elevator
        show-total
        fastArrival
         :page-size="page_size"
      ></h-page>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    page_size: Number,
    data: Array,
    columns: Array,
  },
  data() {
    return {
      tData: [],
    };
  },
  created() {
    this.tData = this.data.slice(0, this.page_size);
  },
  methods: {
    dataChange(i) {
      this.$emit("sendPage",i)
      this.tData = this.data.slice(
        (i - 1) * this.page_size,
        i * this.page_size
      );
    }
  }
};
</script>
<style scoped>
.content {
  height: 100%;
}
.table {
  width: 80vw;
  margin-left: 2%;
  padding-bottom: 1%;
  height: 92%;
}
.page {
  height: 7%;
  text-align: right;
  margin-right: 2.5%;
}
</style>