<template>
  <a-layout theme="light" style="height: 100%">
    <HeaderLayout />
    <a-layout>
      <SiderLayout />
      <a-layout-content>
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import HeaderLayout from './HeaderLayout.vue'
import SiderLayout from './SiderLayout.vue'
</script>

<style>
a-layout-header,
.ant-layout-header {
  border-bottom: 1px solid #f0f0f0;
}
</style>
