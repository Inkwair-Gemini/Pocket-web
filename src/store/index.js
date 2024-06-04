import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    registerInfo : {
      name:"",
      phone:"",
      idNo:"",
      type:0,
      investmentStyle:"",
      certificateType:0
    },
    username:"", //登陆后的用户名
    tradeDay:"" //交易日
  },
  mutations: {
    setRegisterInfo_basic(state,basicInfo) {
      state.registerInfo.name = basicInfo.name
      state.registerInfo.phone = basicInfo.phone
      state.registerInfo.idNo = basicInfo.idNo
    },
    setRegisterInfo_Style(state,investmentStyle){
      state.registerInfo.investmentStyle = investmentStyle
    },
    clearRegisterInfo() {
      state.registerInfo = {
        name:"",
        phone:"",
        idNo:"",
        type:0,
        investmentStyle:"",
        certificateType:0
      }
    },
    setUsername(state, username) {
      state.username = username;
    },
    clearUsername(state) {
      state.username = '';
    },
    setTradeDay(state, tradeDay) {
      state.tradeDay = tradeDay;
    },
    clearTradeDay(state) {
      state.tradeDay = '';
    }
  },
});

export default store;