import axios, { AxiosError, AxiosResponse } from "axios";
import useNotifications from "./useNotifications";

import { useAuthStore } from "@/store/useAuthStore";
import { logout } from "@/composables/useAuth";
import { storeToRefs } from "pinia";
import useI18nComposable from "./useI18nComposable";

const { useErrorHandler } = useNotifications();
const i18n = useI18nComposable;

export function useInstance() {
  const axiosInstance = axios.create({
    baseURL: `http://localhost:3000/api/v1/`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
    },
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const { getUserToken } = storeToRefs(useAuthStore());
      if (getUserToken.value) {
        config.headers["authorization"] = "Bearer " + getUserToken.value;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      const code = error?.response?.status?.toString();
      const responseData = error?.response?.data as { message: string };
      if (code && code[0] === "4" && responseData.message && code !== "401") {
        // if response came from server and related to HTTP response codes
        useErrorHandler(responseData.message);
        return;
      } else if (code === "401" || code === "403") {
        if (code === "403") {
          logout(); // token has expired and we have to renew it on the login page, resetting the old data
        }
        window.location.href = "/login";
        return;
      } else {
        useErrorHandler(i18n.$t("ERROR.SERVER_ERROR").value);
        return;
      }
    }
  );

  return axiosInstance;
}
