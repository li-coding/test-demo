<template>
  <a-layout-sider theme="light" collapsible width="200" class="sider-layout">
    <SiderMenu />
  </a-layout-sider>
</template>

<script lang="ts" setup>
import SiderMenu from '@/components/SiderMenu/SiderMenu.vue'
</script>

<style scoped>
.sider-layout {
  /* box-shadow: 0 2px 5px #00000014;
  z-index: 10; */
  border-right: 1px solid rgba(5, 5, 5, 0.06);
}
</style>
