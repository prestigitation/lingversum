<template>
  <div class="h-full flex flex-col items-center justify-center">
    <span class="text-xl mb-8 font-bold">Register</span>
    <ui-textbox v-model="name">Your Name</ui-textbox>
    <ui-textbox v-model="email">Type your e-mail</ui-textbox>
    <ui-textbox v-model="password">Password</ui-textbox>
    <span class="mb-4">
      <span>Registered yet?&nbsp;</span>
      <router-link to="/login" class="text-blue-500">Sign In!</router-link>
    </span>
    <ui-button color="green">Register</ui-button>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

import UiTextbox from "keen-ui/src/UiTextbox.vue";
import UiButton from "keen-ui/src/UiButton.vue";

const name = ref("");
const email = ref("");
const password = ref("");
</script>
