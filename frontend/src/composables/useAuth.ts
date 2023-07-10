import { useAuthStore } from "@/store/useAuthStore";
import { AxiosResponse } from "axios";
import { storeToRefs } from "pinia";

export function authenticated() {
  const { getUserToken } = storeToRefs(useAuthStore());
  return !!getUserToken.value;
}

export function login(response: AxiosResponse) {
  const { setUserToken, setUserName, setUserEmail } = useAuthStore();

  setUserToken(response.data.token);
  setUserName(response.data.name);
  setUserEmail(response.data.email);
}

export function logout() {
  const { resetUser } = useAuthStore();
  resetUser();
}
