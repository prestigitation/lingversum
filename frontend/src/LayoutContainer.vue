<template>
  <LayoutHeader />
  <div class="h-[94vh]">
    <RouterView />
  </div>
</template>
<script lang="ts" setup>
import { RouterView } from "vue-router";
import LayoutHeader from "./components/ui/LayoutHeader.vue";
</script>
<style lang="scss">
@import url("./main.scss");
</style>
