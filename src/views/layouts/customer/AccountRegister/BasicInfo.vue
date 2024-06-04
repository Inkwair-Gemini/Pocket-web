<template>
  <div class="main">
    <Top :current="current" :title="title"></Top>
    <div class="forms">
      <h-form ref="businessInfoForm" :model="form.businessInfo">
        <p class="title">业务信息</p>
        <br />
        <h-row>
          <h-col :span="12">
            <h-form-item label="委托方式" prop="WeiTuo" required>
              <h-select
                clearable
                style="width: 60%"
                v-model="form.businessInfo.WeiTuo"
              >
                <h-option
                  v-for="item in WeiTuoList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</h-option
                >
              </h-select>
            </h-form-item>
          </h-col>
          <h-col :span="12">
            <h-form-item label="TA代码" prop="TAcode" required>
              <h-select
                id="TAselect"
                multiple
                placeholder="请选择（多选）"
                style="width: 60%"
                v-model="form.businessInfo.TAcode"
              >
                <h-option
                  v-for="item in TAList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</h-option
                >
              </h-select>
            </h-form-item>
          </h-col>
        </h-row>
        <h-row>
          <h-col :span="12">
            <h-form-item label="其他委托方式">
              <h-select
                style="width: 60%"
                v-model="form.businessInfo.otherWeiTuo"
              >
                <h-option
                  v-for="item in otherWeiTuoList"
                  :value="item.value"
                  :key="item.value"
                  >{{ item.label }}</h-option
                >
              </h-select>
            </h-form-item>
          </h-col>
        </h-row>
      </h-form>
      <h-form :model="form.customerInfo" ref="CustomerForm">
        <p class="title">客户信息</p>
        <br />
        <h-row>
          <h-col :span="12">
            <h-form-item label="客户姓名" prop="name" required>
              <h-input
                v-model="form.customerInfo.name"
                :disabled="state1"
                style="width: 60%"
              ></h-input>
            </h-form-item>
          </h-col>
          <h-col :span="12">
            <h-form-item label="证件类型" prop="type" required>
              <h-input
                value="身份证"
                :disabled="true"
                style="width: 60%"
              ></h-input>
            </h-form-item>
          </h-col>
        </h-row>
        <h-row>
          <h-form-item label="证件号码" prop="idNo" required>
            <h-input
              v-model="form.customerInfo.idNo"
              style="width: 60%"
              :disabled="state1"
            ></h-input>
          </h-form-item>
        </h-row>
        <h-row>
          <h-col :span="12">
            <h-form-item label="证件有效期" required>
              <h-date-picker
                type="daterange"
                placement="bottom-end"
                placeholder="选择日期"
                :disabled="Disabled_DatePicker || state1"
                style="width: 50%"
                v-model="form.customerInfo.certificateTime"
              ></h-date-picker>
            </h-form-item>
          </h-col>
          <h-col :span="2">
            <h-checkbox
              class="long-checkbox"
              v-model="form.customerInfo.isLongValid"
              :disabled="state1"
              >长期有效</h-checkbox
            >
          </h-col>
        </h-row>
        <h-row>
          <h-col :span="12">
            <h-form-item label="客户性别">
              <h-select
                placeholder="请选择"
                style="width: 60%"
                v-model="form.customerInfo.sex"
              >
                <h-option key="1" value="男">男</h-option>
                <h-option key="0" value="女">女</h-option>
              </h-select>
            </h-form-item>
          </h-col>
          <h-col :span="12">
            <h-form-item label="婚姻">
              <h-select
                v-model="form.customerInfo.marriage"
                placeholder="请选择"
                style="width: 60%"
              >
                <h-option key="1" value="未婚">未婚</h-option>
                <h-option key="2" value="已婚">已婚</h-option>
              </h-select>
            </h-form-item>
          </h-col>
        </h-row>
      </h-form>
      <h-button v-show="state1" class="AuthButton" long type="success">
        <span>已验证</span>
      </h-button>
      <h-button
        v-show="!state1"
        :loading="loading1"
        class="AuthButton"
        long
        type="warning"
        @click="toAuthCustomer"
      >
        <span>待验证</span>
      </h-button>
      <h-form :model="form.touchInfo" ref="TouchForm">
        <p class="title">联系方式</p>
        <br />
        <h-row>
          <h-col :span="12">
            <h-form-item label="手机/电话" prop="phone" required>
              <h-input
                v-model="form.touchInfo.phone"
                style="width: 60%"
                :disabled="state2"
              ></h-input>
            </h-form-item>
          </h-col>
          <h-col :span="12">
            <h-form-item label="电子邮箱">
              <h-input
                v-model="form.touchInfo.email"
                style="width: 60%"
              ></h-input> </h-form-item
          ></h-col>
        </h-row>
      </h-form>
      <h-button v-show="state2" class="AuthButton" long type="success">
        <span>已验证</span>
      </h-button>
      <h-button
        v-show="!state2"
        :loading="loading2"
        class="AuthButton"
        long
        type="warning"
        @click="toAuthPhone"
      >
        <span>待验证</span>
      </h-button>
      <div class="next">
        <h-button class="h-button" type="primary" @click="toNext"
          >下一步</h-button
        >
      </div>
    </div>
    <h-msg-box
      v-model="customerAuth_visiable"
      title="短信验证"
      :maskClosable="false"
      :closable="false"
    >
      <CustomerAuth
        :phone="form.touchInfo.phone"
        ref="CustomerAuth"
      ></CustomerAuth>
      <p slot="footer">
        <h-button @click="closeCustomerAuth">取消</h-button>
        <h-button type="primary" @click="authPhone">验证</h-button>
      </p>
    </h-msg-box>
  </div>
</template>

<script>
import { postData } from "@/js/api.js";
import Top from "@/components/customer/AccountRegister/Top.vue";
import CustomerAuth from "@/components/trade/CustomerAuth.vue";
export default {
  components: { Top, CustomerAuth },
  data() {
    return {
      current: 0,
      title: "基本信息登记",
      nextRouter: "layouts/customer/AccountRegister/BankCard",
      state1: false,
      state2: false,
      loading1: false,
      loading2: false,
      customerAuth_visiable: false,
      WeiTuoList: [
        {
          value: 1,
          label: "柜台委托",
        },
        {
          value: 2,
          label: "非柜台委托",
        },
      ],
      otherWeiTuoList: [
        {
          value: 1,
          label: "电话委托",
        },
        {
          value: 2,
          label: "磁卡委托",
        },
        {
          value: 3,
          label: "自助委托",
        },
        {
          value: 4,
          label: "网上委托",
        },
      ],
      TAList: [
        {
          value: 1,
          label: "510510",
        },
        {
          value: 2,
          label: "501029",
        },
        {
          value: 3,
          label: "159929",
        },
        {
          value: 4,
          label: "163402",
        },
      ],
      form: {
        businessInfo: {
          WeiTuo: [],
          otherWeiTuo: "",
          TAcode: [],
        },
        customerInfo: {
          name: "",
          idNo: "",
          certificateTime: [],
          isLongValid: false,
          sex: "",
          marriage: "",
        },
        touchInfo: {
          phone: "",
          code: "",
          email: "",
        },
      },
    };
  },
  computed: {
    Disabled_DatePicker() {
      return this.form.customerInfo.isLongValid;
    },
  },
  methods: {
    closeCustomerAuth() {
      this.customerAuth_visiable = false;
      this.loading2 = false;
      this.$refs.CustomerAuth.reset();
    },
    toAuthCustomer() {
      this.$refs.CustomerForm.validate((valid) => {
        if (valid) {
          this.loading1 = true;
          this.AuthCustomer();
        } else {
          this.$hMessage.error("请先完成客户信息表单");
        }
      });
    },
    async AuthCustomer() {
      try {
        let validTime = "";
        if (this.form.customerInfo.isLongValid) {
          validTime = "长期有效";
        } else {
          validTime = certificateTime[0] + "," + certificateTime[1];
        }
        const data = await postData("/customer/account/idCardAuthentication", {
          name: this.form.customerInfo.name,
          idNo: this.form.customerInfo.idNo,
          validTime: validTime,
          sex: this.form.customerInfo.sex,
          marriage: this.form.customerInfo.marriage,
        });
        if (data.code === 0) {
          this.state1 = true;
          this.$hMessage.success("验证成功");
        } else {
          this.loading1 = false;
          this.$hMessage.error(data.code + ":" + data.msg);
        }
      } catch (error) {
        this.$hMessage.error("请求失败，请重试或联系管理员");
      } finally {
        this.loading1 = false;
      }
    },
    toAuthPhone() {
      this.$refs.TouchForm.validate((valid) => {
        if (valid) {
          this.loading2 = true;
          this.customerAuth_visiable = true;
        } else {
          this.$hMessage.error("请先完成联系方式表单");
        }
      });
    },
    async authPhone() {
      try {
        const data = await postData(
          "/customer/account/accountPhoneAuthentication",
          {
            phone: this.form.touchInfo.phone,
            code: this.$refs.CustomerAuth.code,
          }
        );
        if (data.code === 0) {
          this.state2 = true;
          this.customerAuth_visiable = false;
          this.$hMessage.success("验证成功");
        } else {
          this.loading1 = false;
          this.$hMessage.error(data.code + ":" + data.msg);
        }
      } catch (error) {
        this.$hMessage.error("请求失败，请重试或联系管理员");
      } finally {
        this.loading2 = false;
      }
    },
    async toNext() {
      //先验证业务信息表单是否非空
      this.$refs.businessInfoForm.validate(async (valid) => {
        if (valid) {
          if (!this.state1 || !this.state2) {
            this.$hMessage.error("请先完成验证");
          } else {
            this.$store.commit("setRegisterInfo_basic", {
              phone: this.form.touchInfo.phone,
              idNo: this.form.customerInfo.idNo,
              name: this.form.customerInfo.name,
            });
            this.$router.push("/" + this.nextRouter);
          }
        } else {
          this.$hMessage.error("请先完成业务表单");
        }
      });
    },
  },
};
</script>

<style scoped>
.h-form-item >>> label {
  text-align: right;
  background-color: #f7f7f7;
  width: 8vw;
  display: inline-block; /* 使标签成为行内块级元素 */
  margin-left: 2vw;
  margin-right: 0.5vw;
  font-weight: bolder;
  font-size: x-small;
  padding-right: 1vw;
}
.forms {
  overflow: auto;
  height: 67vh;
}
.title {
  padding-top: 2vh;
  padding-left: 1vw;
  font-size: medium;
  color: rgb(53, 50, 50);
  font-weight: bold;
}
.long-checkbox {
  /* 设置默认值 */
  border: initial;
  background-color: initial;
  text-align: initial;
  width: initial;
  display: initial;
  margin-left: initial;
  padding-right: initial;
  position: relative;
  left: -8vw;
  top: 1vh;
}
.next {
  height: 30vh;
  width: 100%;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}
.AuthButton {
  margin-left: 30vw;
  height: 4vh;
  width: 15vw;
}
#TAselect >>> label {
  text-align: left;
  background-color: white;
  width: 2vw;
  display: inline-block; /* 使标签成为行内块级元素 */
  margin-right: 0vw;
  padding-right: 0vw;
}
</style>
