<template>
  <div class="h-full flex flex-col items-center justify-center">
    <span class="text-xl mb-8 font-bold">Welcome back to {{ APP_NAME }}!</span>
    <form class="form_wrapper">
      <Input v-model="email">E-mail</Input>
      <Input v-model="password">Password</Input>
    </form>
    <span class="mb-4 mt-8">
      <span>Not yet registered?&nbsp;</span>
      <RouterLink to="/register" class="text-blue-500">Register!</RouterLink>
    </span>
    <Button color="primary">Sign In</Button>
  </div>
</template>
<script lang="ts" setup>
import { APP_NAME } from "@/types/constants/app.constants";

import { ref } from "vue";

import { Input, Button } from "vexip-ui";
import { RouterLink } from "vue-router";

const email = ref("");
const password = ref("");
</script>
<style lang="scss" scoped src="../styles/auth.scss"></style>
