<template>
  <div class="project-card">
    <div class="card-header">
      <div class="header-left">
        <div class="icon-placeholder">
          <!-- Placeholder for icon as requested -->
          <component :is="icon" v-if="icon && typeof icon !== 'string'" />
          <img :src="icon" v-else-if="icon" class="custom-icon" />
          <div v-else class="default-icon"></div>
        </div>
        <span class="title">{{ title }}</span>
      </div>
      <div class="header-right">
        <SettingOutlined class="setting-icon" />
      </div>
    </div>

    <div class="card-body">
      <p class="description">{{ description }}</p>
    </div>

    <div class="card-footer">
      <div class="stats">
        <span>用例数：{{ stats.cases }}个</span>
        <span class="ml-4">计划数：{{ stats.plans }}个</span>
      </div>
      <div class="manager">项目管理员：{{ manager }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SettingOutlined } from '@ant-design/icons-vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  icon: {
    type: [String, Object], // Can be URL or Component
    default: null,
  },
  stats: {
    type: Object,
    default: () => ({ cases: 0, plans: 0 }),
  },
  manager: {
    type: String,
    default: 'Unknown',
  },
})
</script>

<style scoped>
.project-card {
  width: 100%;
  aspect-ratio: 420 / 236; /* Based on typical card proportions or just auto height */
  background-image: url('../images/project-card-bg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  color: #333;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  transition: transform 0.2s;
}

.project-card:hover {
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon-placeholder {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.default-icon {
  width: 32px;
  height: 32px;
  background-color: #e6f7ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.default-icon::after {
  content: '';
  width: 16px;
  height: 16px;
  background-color: #1890ff;
  border-radius: 2px;
}

.custom-icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.title {
  font-size: 18px;
  font-weight: 600;
  color: #1f1f1f;
}

.setting-icon {
  font-size: 18px;
  color: #1890ff; /* Ant Design Blue */
  cursor: pointer;
}

.card-body {
  flex: 1;
  overflow: hidden;
}

.description {
  font-size: 13px;
  color: rgba(0, 0, 0, 0.65); /* Less contrast for description */
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Limit text lines */
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: justify;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.06); /* Subtle separator */
}

.stats {
  display: flex;
}

.ml-4 {
  margin-left: 16px;
}

.manager {
  text-align: right;
}
</style>
