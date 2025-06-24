import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import { useBasePath } from "@/hooks/basePathHook";
import { useUtils } from "@/hooks/utilsHook";

// TODO: 基础路径
const basePath = useBasePath();

// TODO: 获取工具
const utils = useUtils();

// TODO: 路由列表
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    meta: {
      isLogin: true,
    },
    component: () => import("@/views/Home/HomePage.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      isLogin: false,
    },
    component: () => import("@/views/Login/LoginPage.vue"),
  },
];

// TODO: 路由实例
const router = createRouter({
  history: createWebHistory(basePath),
  routes,
});

// TODO: 路由守卫
router.beforeEach((to, _, next) => {
  if (to.meta.isLogin) {
    if (!utils.storage.getToken("token", "string")) {
      next();
    } else {
      next("/login");
    }
  }
  next();
});

// TODO: 抛出路由
export default router;
