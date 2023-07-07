<template>
  <div class="profile_wrapper">
    <template v-if="isProfileEmpty"></template>
    <template v-else></template>
  </div>
</template>
<script lang="ts" setup>
import { useAuthStore } from "@/store/useAuthStore";
import { storeToRefs } from "pinia";
import { computed, onMounted } from "vue";

const authStore = useAuthStore();
const { getUserProfile } = storeToRefs(authStore);

const isProfileEmpty = computed(
  () =>
    !getUserProfile ||
    (getUserProfile &&
      (Object.keys(getUserProfile).length === 0 ||
        Object.values(getUserProfile).every((value) => {
          return (
            Object.keys(value).length === 0 && value.constructor === Object
          );
        })))
);

onMounted(async () => {
  return await authStore.fetchUserProfile();
});
</script>
