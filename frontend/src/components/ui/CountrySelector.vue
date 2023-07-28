<template>
  <div class="country_selector country_selector--wrapper">
    <country-select
      :disablePlaceholder="true"
      :placeholder="placeholder"
      :style="selectStyles"
      :modelValue="modelValue"
      @change="onChange"
      class="country_selector--picker vxp-input vxp-input-vars"
    />
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";

interface countrySelectorPropsInterface {
  placeholder: string;
  modelValue: any;
}
const props = defineProps<countrySelectorPropsInterface>();
const emit = defineEmits(["update:modelValue"]);
const selectStyles = ref("color:lightgray !important;");
const onChange = (event: Event) => {
  const target = event.target as EventTarget & { value: string };
  selectStyles.value = "color:rgb(73, 80, 87) !important;";
  emit("update:modelValue", target.value);
};
</script>
<style lang="scss">
.country_selector {
  & > :first-child:is(option) {
    color: red;
  }
  &--picker {
    border: var(--vxp-border-shape) var(--vxp-input-b-color);
    border-radius: var(--vxp-input-radius);
    @apply pl-2 my-2 w-full;
    option {
      @apply mx-2;
    }
  }
}
</style>
