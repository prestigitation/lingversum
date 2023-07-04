<template>
  <ErrorMessage class="text-red-700" :name="props.name" />
</template>
<script lang="ts" setup>
import { ErrorMessage } from "vee-validate";

const props = defineProps<{
  name: string;
}>();
</script>
