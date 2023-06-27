<script lang="ts" setup>
import LayoutHeader from "./components/ui/LayoutHeader.vue";
</script>
<template>
  <LayoutHeader />
  <div class="h-[94vh]">
    <router-view />
  </div>
</template>
<style lang="scss">
@import url("./main.scss");
</style>
