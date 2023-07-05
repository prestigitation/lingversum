import App from "./LayoutContainer.vue";
import router from "./router";

import { createApp, h, watch } from "vue";
import { createPinia, setActivePinia } from "pinia";
import { install, enUSLocale } from "vexip-ui";
import Notifications from "@kyvg/vue3-notification";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";

import "./assets/tailwind.css";
import "notivue/notifications.css";
import "notivue/animations.css";
import "vexip-ui/css/index.css";

export const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

createApp({ render: () => h(App) })
  .use(pinia)
  .use(Notifications)
  .use(install, {
    locale: enUSLocale(),
  })
  .use(router)
  .mount("#app");
