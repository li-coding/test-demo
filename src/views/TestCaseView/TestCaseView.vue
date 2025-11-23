<template>
  <div class="test-case-card">
    <a-flex justify="space-between" style="height: 100%">
      <div>
        <!-- <TestCaseTree /> -->
        <TreeTest />
      </div>
      <div>右边用例列表</div>
    </a-flex>
  </div>
</template>

<script lang="ts" setup>
import TestCaseTree from '@/components/TestCaseTree/TestCaseTree.vue'
import TreeTest from '@/components/TreeTest.vue'
</script>

<style scoped>
.test-case-card {
  height: 100%;
  /* background-color: #fff; */
  /* border-radius: 8px; */
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); */
}
</style>
