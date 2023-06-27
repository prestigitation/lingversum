<template>
  <div class="h-full flex flex-col items-center justify-center">
    <h1
      class="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
    >
      Welcome to {{ APP_NAME }}
    </h1>
    <p>
      We provide the excellent service to make the cultural and language
      exchange comfortable and accessible to you.
    </p>
    <ui-button class="mt-6">
      <template v-if="store.user.token">
        <router-link to="/register"> Continue communicating! </router-link>
      </template>
      <template v-else>
        <router-link to="/register"> Get Started </router-link>
      </template>
    </ui-button>
  </div>
</template>
<script lang="ts" setup>
import { APP_NAME } from "@/types/constants/app.constants";

import { useAuthStore } from "../store/auth/useAuthStore";

import UiButton from "keen-ui/src/UiButton.vue";

const store = useAuthStore();
</script>
