import App from "./LayoutContainer.vue";
import router from "./router";

import { createApp, h } from "vue";
import { createPinia } from "pinia";
import { install, enUSLocale } from "vexip-ui";
import Notifications from "@kyvg/vue3-notification";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import Vue3FormWizard from "vue3-form-wizard";
import vueCountryRegionSelect from "vue3-country-region-select";

import "./assets/tailwind.css";
import "notivue/notifications.css";
import "notivue/animations.css";
import "vexip-ui/css/index.css";
import "vue3-form-wizard/dist/style.css";

export const pinia = createPinia();

pinia.use(piniaPluginPersistedState);

createApp({ render: () => h(App) })
  .use(pinia)
  .use(Notifications)
  .use(vueCountryRegionSelect)
  .use(Vue3FormWizard)
  .use(install, {
    locale: enUSLocale(),
  })
  .use(router)
  .mount("#app");
