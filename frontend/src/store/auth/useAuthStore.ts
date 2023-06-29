import { defineStore } from "pinia";
import state from "./state";

export const useAuthStore = defineStore("auth", {
  state: state,
});
