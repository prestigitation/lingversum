<template>
  <div class="profile_wrapper">
    <div class="profile_wrapper--empty" v-if="isProfileEmpty">
      <h1 class="text-2xl font-bold my-8">
        {{ i18n.$t("PROFILE.EMPTY.TITLE").value }}
      </h1>
      <step-wizard />
    </div>
    <div class="profile_wrapper--info" v-else>profileisnotempty</div>
  </div>
</template>
<script lang="ts" setup>
import useI18nComposable from "@/composables/useI18nComposable";
import stepWizard from "@/components/ui/wizard/StepWizard.vue";
import { useAuthStore } from "@/store/useAuthStore";
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";

const i18n = useI18nComposable;
const authStore = useAuthStore();
const { getUserProfile } = storeToRefs(authStore);

const isProfileEmpty = computed(
  () =>
    !getUserProfile.value ||
    (getUserProfile.value &&
      (Object.keys(getUserProfile.value).length === 0 ||
        Object.values(getUserProfile.value).every((value) => {
          return (
            Object.keys(value).length === 0 && value.constructor === Object
          );
        })))
);

onMounted(async () => {
  return await authStore.fetchUserProfile();
});
</script>
<style lang="scss" scoped>
.profile {
  &_wrapper {
    @apply h-full;
  }
}
</style>
