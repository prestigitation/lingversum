import LoginPage from "@/pages/LoginPage.vue";
import MainPage from "@/pages/MainPage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";
import { RouteRecordRaw } from "vue-router";

export default [
  {
    path: "/",
    name: "home",
    component: MainPage,
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
  },
] as Array<RouteRecordRaw>;
