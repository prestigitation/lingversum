import LoginPage from "@/pages/LoginPage.vue";
import MainPage from "@/pages/MainPage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";
import ProfilePage from "@/pages/ProfilePage.vue";
import { RouteRecordRaw } from "vue-router";
import { useAuthStore } from "@/store/useAuthStore";
import { pinia } from "@/main";
import { storeToRefs } from "pinia";
import router from ".";

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
  {
    path: "/profile",
    name: "profile",
    component: ProfilePage,
    beforeEnter: (to, from, next) => {
      const authStore = storeToRefs(useAuthStore(pinia));
      if (authStore.getUserToken.value) {
        next();
        return;
      } else {
        router.push({ name: "login" });
      }
    },
  },
] as Array<RouteRecordRaw>;
