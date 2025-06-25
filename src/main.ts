import ElementPlus from "element-plus";
import { createApp } from "vue";

import "@/style.scss";
import "@/styles/reset.css";
import App from "@/App.vue";

import router from "./router";
import pinia from "./store";

import "element-plus/dist/index.css";
import "@/styles/reset-element.scss";

// TODO: 实例化vue-app
const application = createApp(App);

// TODO: 挂载全局状态
application.use(pinia);
// TODO: 挂载路由
application.use(router);

// TODO: 挂载组件
application.use(ElementPlus);

// TODO: 挂载到全局
application.mount("#app");
