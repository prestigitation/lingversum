<template>
  <header class="layout-header">
    <RouterLink to="/">
      <div class="text-2xl">{{ APP_NAME }}</div>
    </RouterLink>
    <nav class="flex gap-4">
      <RouterLink to="/login">
        <Button>Login</Button>
      </RouterLink>
      <RouterLink to="/register">
        <Button>Register</Button>
      </RouterLink>
    </nav>
  </header>
</template>
<script lang="ts" setup>
import { RouterLink } from "vue-router";
import { Button } from "vexip-ui";
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
