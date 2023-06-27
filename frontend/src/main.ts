import { createApp } from "vue";
import App from "./LayoutContainer.vue";
import router from "./router";
import { createPinia } from "pinia";

import "./assets/tailwind.css";
import "keen-ui/dist/keen-ui.css";

const pinia = createPinia();

createApp(App).use(pinia).use(router).mount("#app");
