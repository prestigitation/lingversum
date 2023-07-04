import axios, { AxiosError, AxiosResponse } from "axios";
import useNotifications from "./useNotifications";
import { useI18n } from "vue-composable";

const { useErrorHandler } = useNotifications();

export function useInstance() {
  const i18n = useI18n();
  const axiosInstance = axios.create({
    baseURL: `http://localhost:3000/api/v1/`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
    },
  });

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      const code = error?.response?.status?.toString();
      if (code && code[0] === "4" && error.message && code !== "403") {
        // if response came from server and related to HTTP response codes
        useErrorHandler(error.message);
        return;
      } else {
        console.log(error.code);
        useErrorHandler(i18n.$t("ERROR.SERVER_ERROR").value);
        return;
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
}
