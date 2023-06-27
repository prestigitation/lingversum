<template>
  <div class="h-full flex flex-col items-center justify-center">
    <span class="text-xl mb-8 font-bold">Welcome back to {{ APP_NAME }}!</span>
    <ui-textbox v-model="email">E-mail</ui-textbox>
    <ui-textbox v-model="password">Password</ui-textbox>
    <span class="mb-4">
      <span>Not yet registered?&nbsp;</span>
      <router-link to="/register" class="text-blue-500">Register!</router-link>
    </span>
    <ui-button color="primary">Sign In</ui-button>
  </div>
</template>
<script lang="ts" setup>
import { APP_NAME } from "@/types/constants/app.constants";

import { ref } from "vue";

import UiTextbox from "keen-ui/src/UiTextbox.vue";
import UiButton from "keen-ui/src/UiButton.vue";

const email = ref("");
const password = ref("");
</script>
