<template>
  <div class="country_selector country_selector--wrapper">
    <country-select
      :disablePlaceholder="true"
      :placeholder="placeholder"
      :modelValue="modelValue"
      @change="onChange"
      class="country_selector--picker vxp-input vxp-input-vars"
    />
  </div>
</template>
<script lang="ts" setup>
interface countrySelectorPropsInterface {
  placeholder: string;
  modelValue: any;
}
defineProps<countrySelectorPropsInterface>();
const emit = defineEmits(["update:modelValue"]);
const onChange = (event: Event) => {
  const target = event.target as EventTarget & { value: string };
  console.log(target.value);
  emit("update:modelValue", target.value);
};
//emit('update:modelValue', $event.target.value)
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
