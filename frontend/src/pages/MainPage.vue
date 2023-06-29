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
    <Button class="mt-6">
      <template v-if="false">
        <RouterLink to="/register"> Continue communicating! </RouterLink>
      </template>
      <template v-else>
        <RouterLink to="/register"> Get Started </RouterLink>
      </template>
    </Button>
  </div>
</template>
<script lang="ts" setup>
import { APP_NAME } from "@/types/constants/app.constants";

import { Button } from "vexip-ui";
import { RouterLink } from "vue-router";
</script>
