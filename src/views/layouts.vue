 <template>
  <div>
    <div class="layout">
      <div class="layout-top">
        <div class="logo">
          <img id="logo" src="http://misitetong.com/pocket-web-assets/hundsunLOGO.jpg" alt="hundsunLogo" />
          <p style="font-size: large; color: rgb(248, 243, 243)">
            <br />基金交易系统
          </p>
        </div>
        <div class="tradeDay">
          <h2>当前交易日: {{ this.$store.state.tradeDay }}</h2>
        </div>
        <div class="buttonGroup">
          <h-button type="primary" class="button-Group">帮助</h-button>
          <h-button type="primary" class="button-Group">其他</h-button>
        </div>
        <div class="account">
          <h-icon name="t-b-userallocation" color="white" size="40"></h-icon>
          <div class="account-info">
            <span style="font-size: medium">账号：{{ this.$store.state.username }}</span>
            <h-button size="small" class="quitButton" @click="quitLogin">退出登录</h-button>
          </div>
        </div>
      </div>
      <div class="layout-content">
        <Menu></Menu>
        <div class="layout-content-main">
          <Breadcrumb></Breadcrumb>
          <div class="content">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/layout/Breadcrumb.vue";
import Menu from "@/components/layout/Menu.vue";
import { getData } from "@/js/api";
export default {
  components: { Menu, Breadcrumb },
  async mounted() {
    try {
      const data = await getData("/liquidation/dailyInitialization/getInitializationData");
      if (data.code === 0) {
        const day = data.data.tradingDay.slice(0,10);
        this.$store.commit('setTradeDay', day);
      } else {
        this.$hMessage.error(data.code + ":" + data.msg);
      }
    } catch (error) {
      this.$hMessage.error("请求失败，请重试或联系管理员");
    }
  },
  methods:{
    quitLogin(){
      this.$router.push("/login")
      this.$store.commit('clearUsername')
    }
  }
};
</script>
<style scoped>
.layout {
  height: 100vh;
  width: 100vw;
}
.layout-top {
  height: 9%;
  width: 100vw;
  background-color: #4a92f6;
  display: flex;
}
#logo {
  width: 8vw;
  height: 8vh;
}
.logo {
  padding-top: 0.3vh;
  margin-left: 1%;
  display: flex;
  width: 16%;
}
.tradeDay {
  width: 50%;
  padding: 1.5% 0 0 30%;
  color: rgb(248, 243, 243);
}
.buttonGroup {
  width: 18%;
  text-align: right;
  padding-right: 5%;
}
.button-Group {
  margin: 2.3vh 0 2.3vh 1vw;
  background: #3d84e7;
}
.account {
  width: 15%;
  display: flex;
  padding-top: 1vh;
}
.account-info {
  color: rgb(248, 243, 243);
  margin-left: 1vw;
  padding-top: 0.5vh;
  display: flex;
  flex-direction: column;
}
.quitButton {
  size: 10px;
  margin-top: 0.5vh;
  background: #3d84e7;
  color: rgb(248, 243, 243);
}
.layout-content {
  height: 91%;
  width: 100vw;
  display: flex;
  background-color: #add2fc;
}
.layout-content-main {
  height: 100%;
  width: 84%;
  padding: 8px;
}
.content {
  background-color: white;
  height: 97%;
  margin-top: 0.3%;
}
</style>