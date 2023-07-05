import { defineStore } from "pinia";
import state from "./auth/state";
import UserInterface from "@/interfaces/userInterface";
import { computed, ref } from "vue";
import { useLocalStorage } from "@vueuse/core";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const user = ref(
      useLocalStorage("user", <UserInterface>{
        email: undefined,
        token: undefined,
        name: undefined,
        profile: {},
      })
    );

    const getUser = computed(() => {
      return user;
    });
    const getUserEmail = computed(() => user.value?.email);
    const getUserToken = computed(() => user?.value?.token);
    const getUserName = computed(() => user?.value?.name);
    const getUserProfile = computed(() => user?.value?.profile);

    const setUserToken = (token: string) => {
      user.value.token = token;
    };
    const setUserEmail = (email: string) => {
      user.value.email = email;
    };
    const setUserName = (name: string) => {
      user.value.name = name;
    };
    const setUserProfile = (profile: object) => {
      user.value.profile = profile;
    };

    const resetUser = () => {
      user.value = {
        email: undefined,
        token: undefined,
        name: undefined,
        profile: {},
      };
    };

    return {
      getUser,
      getUserEmail,
      getUserToken,
      getUserName,
      getUserProfile,

      setUserEmail,
      setUserToken,
      setUserName,
      setUserProfile,

      resetUser,
    };
  },
  {
    persist: true,
  }
);
