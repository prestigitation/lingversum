<template>
  <div class="h-full flex flex-col items-center justify-center">
    <span class="text-xl mb-6 font-bold">Register</span>
    <form class="form_wrapper">
      <Input v-model="name">Your Name</Input>
      <Input v-model="email">Type your e-mail</Input>
      <Input v-model="password">Password</Input>
    </form>
    <span class="mb-4 mt-8">
      <span>Registered yet?&nbsp;</span>
      <RouterLink to="/login" class="text-blue-500">Sign In!</RouterLink>
    </span>
    <Button color="green">Register</Button>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

import { Input, Button } from "vexip-ui";
import { RouterLink } from "vue-router";

const name = ref("");
const email = ref("");
const password = ref("");
</script>
<style lang="scss" scoped src="../styles/auth.scss"></style>
