<template>  

  <div class="login-container" >   
    <img id="logo" src="http://misitetong.com/pocket-web-assets/hundsunLOGO.jpg" style="transform: scale(0.8);position: relative;left:-50px;width:650px;border: none;margin: 0;padding: 0;" alt="hundsunLogo">
    <div class="login-box" style="transform: scale(0.8);width:600px;height: 500px;">  
      <form @submit.prevent="login">  
        <h1 style="position: relative;left: 250px;">登录</h1>
        <div class="input-group" style="position: relative;left:-70px;top:100px">  
          <label for="username" class="label" >用户名：</label>  
          <input type="text" id="username" v-model="username" required class="input">  
        </div>  
        <div class="input-group" style="position: relative;left:-70px;top:150px;">  
          <label for="password" class="label">密码：</label>  
          <input type="password" id="password"  v-model="password" required class="input">  
        </div>   
          <button type="submit" class="button" style="width:100px;position: relative;left:100px;top:200px" @click="login">登录</button>  
          <button @click="resetForm" class="button" style="width:100px;position: relative;left:280px;top:200px;background-color:gray;">重置</button>  
      </form> 
     <h1 style="position: relative;top:-360px;left: -400px;font-size: 50px; color: aliceblue;">基金交易系统</h1> 
    </div>  
  </div>  
</template>  
  
<script>  
export default {  
  data() {  
    return {  
      username: '',  
      password: ''  
    };  
  },  
  methods: {  
    login() {  
      this.$store.commit('setUsername', this.username);
      this.$router.push('/layouts');
    },  
    resetForm() {  
      this.username = '';  
      this.password = '';  
    }  
  }  
};  
</script>  
  
<style scoped>  
.login-container {  
  display: flex;  
  justify-content: center;  
  align-items: center;  
  height: 100vh; 
  background-color: #0275d8; /* 天蓝色背景 */  
  overflow: hidden;
}  
  
.login-box {  
  width: 700px; /* 增加了宽度 */  
  height: 600px;
  padding: 20px;  
  background-color: #fff; /* 白色登录框 */  
  border-radius: 5px;  
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);  
}  
  
.input-group {  
  display: flex;  
  align-items: center;  
  margin-bottom: 10px;  
}  
  
.label {  
  flex: 1;  
  margin-right: 10px;  
  text-align: right;  
}  
  
.input {  
  flex: 2;  
  padding: 10px; 
  border: 1px solid #ccc;  
  border-radius: 3px;  
}  
  
.button-group {  
  display: flex;  
  justify-content: space-between;  
  margin-top: 10px;  
}  
  
.button {  
  flex: 1;  
  padding: 10px;  
  background-color: #0275d8;  
  color: #fff;  
  border: none;  
  border-radius: 3px;  
  cursor: pointer;  
}  
  
.button:hover {  
  background-color: #015ba1;  
}  
</style>
