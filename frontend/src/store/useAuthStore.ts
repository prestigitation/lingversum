import { defineStore } from "pinia";
import UserInterface from "@/interfaces/userInterface";
import { computed, ref } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { useInstance } from "@/composables/useAxiosClient";
import { AxiosResponse } from "axios";
const http = useInstance();

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

    const getUser = computed(() => user);
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

    const fetchUserProfile = async () => {
      return await http.get("users/profile").then((response: AxiosResponse) => {
        setUserProfile(response.data);
      });
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

      fetchUserProfile,

      resetUser,
    };
  },
  {
    persist: true,
  }
);
