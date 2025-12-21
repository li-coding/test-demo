<template>
  <div class="tree-demo-page">
    <el-card title="Infinite Tree Component Demo" class="demo-card">
      <template #header>
        <div class="card-header">
          <span>Infinite Tree (Lazy Load)</span>
          <el-tag type="info">Element Plus</el-tag>
        </div>
      </template>
      <div class="demo-content">
        <p class="description">
          This tree component supports infinite nesting, lazy loading from the API, and inline CRUD
          operations (Add, Edit, Delete).
        </p>
        <CustomTree />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import CustomTree from './CustomTree.vue'
</script>

<style scoped>
.tree-demo-page {
  padding: 24px;
  background: #f0f2f5;
  min-height: 100vh;
}

.demo-card {
  max-width: 800px;
  margin: 0 auto;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.description {
  margin-bottom: 20px;
  color: #666;
  font-size: 14px;
}

.demo-content {
  background: #fff;
  border-radius: 4px;
}
</style>
