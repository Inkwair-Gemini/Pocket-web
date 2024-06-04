<template>
  <div class="form">
    <div class="title">
      <h2>分红表单</h2>
    </div>
    <h-form :model="formItem" ref="formItem">
      <h-form-item label="基金代码" prop="fundId" required>
        <el-autocomplete
          v-model="formItem.fundId"
          style="width: 40%"
          size="small"
          :fetch-suggestions="queryFundId"
        ></el-autocomplete>
      </h-form-item>
      <h-form-item label="分红比率" prop="divideRatio" required>
        <h-input
          :setDefSelect="true"
          style="width: 30%"
          v-model="formItem.divideRatio"
        >
        </h-input>
      </h-form-item>
      <div class="buttons">
        <h-button type="primary" @click="divide">提交</h-button>
        <h-button type="ghost" @click="reset" style="margin-left: 8px"
          >重置</h-button
        >
      </div>
    </h-form>
    <h-msg-box v-model="visiable" title="分红申请成功">
      <h-form :model="formItem">
        <h-form-item label="基金代码">
          <span style="width: 40%">{{ formItem.fundId }}</span>
        </h-form-item>
        <h-form-item label="分红比率">
          <span style="width: 40%">{{ formItem.divideRatio }}</span>
        </h-form-item>
        <h-form-item label="状态">
          <span style="width: 40%">{{ state }}</span>
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
export default {
  data() {
    return {
      visiable: false,
      formItem: {
        fundId: "",
        divideRatio: "",
      },
      state: "",
    };
  },
  mounted() {
    const routerData = this.$route.query.data;
    if (routerData !== undefined) {
      this.formItem.fundId = routerData.fundId;
    }
  },
  methods: {
    async divide() {
      this.$refs.formItem.validate(async (valid) => {
        if (valid) {
          try {
            const data = await postData("/liquidation/dividents", formItem);
            if (data.code === 0) {
              this.state = data.data.state;
              this.visiable = true;
            } else {
              this.$hMessage.error(data.code + ":" + data.msg);
            }
          } catch (error) {
            this.$hMessage.error("请求失败，请重试或联系管理员");
          }
        } else {
          this.$hMessage.error("请正确填写表单");
        }
      });
    },
    reset() {
      this.visiable = false;
      // 重置表单验证状态
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
    queryFundId(queryString, callback) {
      this.querySearchAsync(
        queryString,
        `/fund/fund/getFundIdListForInput`,
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
.h-form-item >>> label {
  text-align: right;
  background-color: #f7f7f7;
  width: 7vw;
  display: inline-block; /* 使标签成为行内块级元素 */
  margin-left: 2vw;
  margin-right: 0.5vw;
  font-weight: bolder;
  font-size: x-small;
  padding-right: 1vw;
}
.form {
  overflow: auto;
  height: 86vh;
}
.title {
  margin: 2vh 0 2vh 3vw;
}
.buttons {
  margin-top: 2%;
  margin-left: 15%;
}
</style>
