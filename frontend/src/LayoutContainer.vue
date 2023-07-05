<template>
  <notifications />
  <LayoutHeader />
  <div class="h-[94vh]">
    <RouterView />
  </div>
</template>
<script lang="ts" setup>
import { RouterView } from "vue-router";
import LayoutHeader from "./components/ui/LayoutHeader.vue";

import { setI18n } from "vue-composable";
import en from "@/locales/en.json";

setI18n({
  locale: "en",
  messages: {
    en,
  },
});
</script>
<style lang="scss">
@import url("./main.scss");
</style>
