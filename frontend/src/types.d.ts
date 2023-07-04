import { i18n } from "vue-composable";
type json = typeof import("@/locales/en.json");
declare module "vue-composable" {
  interface i18n extends json {}
}
