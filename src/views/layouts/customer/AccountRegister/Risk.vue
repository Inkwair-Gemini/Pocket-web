<template>
  <div>
    <Top :current="current" :title="title"></Top>
    <div class="content">
      <div
        v-for="question in QuestionList"
        :key="question.no"
        :id="question.no"
        class="question-container"
      >
        <p class="question-title">
          问题{{ question.no }}：{{ question.question }}
        </p>
        <div class="answer-options">
          <h-radio-group
            v-for="(answer, aIndex) in question.answers"
            :key="aIndex"
            v-model="question.selectedAnswer"
          >
            <h-radio
              class="radio"
              size="large"
              :label="answer.answer"
            ></h-radio>
          </h-radio-group>
        </div>
      </div>
      <div class="next">
        <h-button class="h-button" type="primary" @click="toNext"
          >下一步</h-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import { postData, getData } from "@/js/api.js";
import { calculateRiskLevel } from "@/js/question.js";
import Top from "@/components/customer/AccountRegister/Top.vue";
export default {
  components: { Top },
  data() {
    return {
      current: 2,
      title: "风险评估",
      nextRouter: "layouts/customer/AccountRegister/Complete",
      QuestionList: [],
    };
  },
  computed: {
    customerPhone() {
      return this.$store.state.openingPhoneNumber;
    },
  },
  async mounted() {
    try {
      const data = await getData(
        `/customer/question/getQuestionList?current=1&size=99`
      );
      if (data.code === 0) {
        this.QuestionList = data.data.list.map((question) => {
          return { ...question, selectedAnswer: "" };
        });
      } else {
        this.$hMessage.error(data.code + ":" + data.msg);
      }
    } catch (error) {
      this.$hMessage.error("请求失败，请重试或联系管理员");
    }
  },
  methods: {
    check() {
      // 检查是否有未回答的问题
      const unansweredQuestion = this.QuestionList.find(
        (question) => !question.selectedAnswer
      );
      if (unansweredQuestion) {
        const questionContainer = document.getElementById(
          `${unansweredQuestion.no}`
        );
        if (questionContainer) {
          const scrollOptions = {
            behavior: "smooth",
            block: "start",
          };
          questionContainer.scrollIntoView(scrollOptions);
          const radioInput = questionContainer.querySelector(".answer-radio");
          if (radioInput) {
            radioInput.focus();
          }
        }
        this.$hMessage.warning("存在未回答的问题");
        return false;
      }
      return true;
    },
    async toNext() {
      if (this.check()) {
        const Style = calculateRiskLevel(this.QuestionList);
        this.$store.commit("setRegisterInfo_Style", Style.level);
        try {
          const data = await postData(
            `customer/account/openAccount`,
            this.$store.state.registerInfo
          );
          if (data.code === 0) {
            this.$hMessage.success("提交成功");
            this.$router.push({
              path:"/" + this.nextRouter,
              query:{
                investmentStyle:data.data.investmentStyle,
                accountId:data.data.accountId
              }
            });
          } else {
            this.$hMessage.error(data.code + ":" + data.msg);
          }
        } catch (error) {
          this.$hMessage.error("请求失败，请重试或联系管理员");
        }
      }
    },
  },
};
</script>
<style scoped>
.content {
  overflow: auto;
  height: 67vh;
  width: 100%;
}
.question-container {
  padding: 6vh 10% 0 20%;
  padding-left: 15vh;
}

.question-title {
  margin-bottom: 4vh;
  font-weight: bold;
  font-size: large;
  background: linear-gradient(to right, #e2e5e7, white);
}
.answer-options {
  display: flex;
  flex-direction: column;
}
.radio {
  font-size: medium;
  margin-bottom: 4vh;
}
.next {
  height: 30vh;
  width: 100%;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}
</style>