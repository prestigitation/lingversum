<template>
  <header class="layout-header">
    <RouterLink to="/">
      <div class="text-2xl">{{ APP_NAME }}</div>
    </RouterLink>
    <nav class="flex gap-4">
      <template v-if="!getUserToken">
        <RouterLink to="/login">
          <Button>Login</Button>
        </RouterLink>
        <RouterLink to="/register">
          <Button>Register</Button>
        </RouterLink>
      </template>
      <template v-else>
        <Button @click="logout">Logout</Button>
      </template>
    </nav>
  </header>
</template>
<script lang="ts" setup>
import { RouterLink, useRouter } from "vue-router";
import { Button } from "vexip-ui";
import { APP_NAME } from "@/types/constants/app.constants";
import { useAuthStore } from "@/store/useAuthStore";
import { logout as resetUser } from "@/composables/useAuth";
import { computed } from "vue";
import { storeToRefs } from "pinia";

const router = useRouter();

const { getUserToken } = storeToRefs(useAuthStore());

const logout = () => {
  resetUser();
  router.push({ name: "login" });
};
</script>
<style lang="scss" scoped>
.layout {
  &-header {
    @apply flex justify-between px-4 py-2 items-center h-[6vh];
    background: rgb(220, 223, 61);
  }
}
</style>
