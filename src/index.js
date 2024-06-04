//入口文件：vue的main.js
import hCore from "@hsui/core";
import "./reset.css";
import Vue from 'vue'
import store from './store'; // 导入 Vuex store

//引入组件库
import h_ui from 'h_ui'
import "h_ui/dist/h_ui.min.css"
import { Autocomplete } from 'element-ui';
import "element-ui/lib/theme-chalk/index.css";

Vue.use(Autocomplete)
Vue.use(h_ui)

const app = hCore({
  extraModelOptions: {
    store,
  },
});

app.start();
