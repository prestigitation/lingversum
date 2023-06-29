import App from "./LayoutContainer.vue";
import router from "./router";

import { createApp, h } from "vue";
import { createPinia } from "pinia";
import { install } from "vexip-ui";

import "./assets/tailwind.css";

import "vexip-ui/css/index.css";
import "./styles/vexip.rewrite.scss";
import { enUSLocale } from "vexip-ui";

const pinia = createPinia();

createApp({ render: () => h(App) })
  .use(pinia)
  .use(install, {
    locale: enUSLocale(),
  })
  .use(router)
  .mount("#app");
