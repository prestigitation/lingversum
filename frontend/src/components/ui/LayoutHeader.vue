<template>
  <header class="layout-header">
    <router-link to="/">
      <div class="text-2xl">{{ APP_NAME }}</div>
    </router-link>
    <nav class="flex gap-4">
      <router-link to="/login">
        <ui-button color="primary">Login</ui-button>
      </router-link>
      <router-link to="/register">
        <ui-button color="green">Register</ui-button>
      </router-link>
    </nav>
  </header>
</template>
<script lang="ts" setup>
import UiButton from "keen-ui/src/UiButton.vue";
import { APP_NAME } from "@/types/constants/app.constants";
</script>
<style lang="scss" scoped>
.layout {
  &-header {
    @apply flex justify-between px-4 py-2 items-center h-[6vh];
    background: rgb(220, 223, 61);
  }
}
</style>
