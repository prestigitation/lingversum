import App from "./LayoutContainer.vue";
import router from "./router";

import { createApp, h } from "vue";
import { createPinia } from "pinia";
import { install, enUSLocale } from "vexip-ui";
import Notifications from "@kyvg/vue3-notification";

import "./assets/tailwind.css";
import "notivue/notifications.css";
import "notivue/animations.css";
import "vexip-ui/css/index.css";

const pinia = createPinia();

createApp({ render: () => h(App) })
  .use(pinia)
  .use(Notifications)
  .use(install, {
    locale: enUSLocale(),
  })
  .use(router)
  .mount("#app");
