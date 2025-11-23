<template>
  <div class="project-page">
    <header class="page-header">
      <h1>项目列表</h1>
      <p class="subtitle">卡片式布局 · 现代科技化背景 · 自适应一行最多 3 个</p>
    </header>

    <a-row :gutter="[24, 24]" class="cards-row">
      <a-col v-for="proj in projects" :key="proj.id" :xs="24" :sm="12" :md="8">
        <a-card hoverable class="proj-card">
          <template #title>
            <div class="card-title">
              <a-avatar :size="48" class="proj-avatar">
                <component :is="proj.icon" />
              </a-avatar>
              <div class="title-meta">
                <div class="name">{{ proj.name }}</div>
                <div class="meta-id">
                  编号: <span>{{ proj.id }}</span>
                </div>
              </div>
            </div>
          </template>

          <div class="card-body">
            <div class="desc">{{ proj.description }}</div>
            <div class="info-row">
              <div class="owner"><user-outlined /> {{ proj.owner }}</div>
              <div class="cases">
                案例数: <strong>{{ proj.cases }}</strong>
              </div>
            </div>
          </div>

          <template #actions>
            <a-space>
              <a-button type="text" icon="">查看</a-button>
              <a-button type="text" icon=""> <setting-outlined /> 设置 </a-button>
            </a-space>
          </template>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Row, Col, Card, Avatar, Button, Space } from 'ant-design-vue'
import {
  SettingOutlined,
  UserOutlined,
  ProjectOutlined,
  FileTextOutlined,
} from '@ant-design/icons-vue'

export default defineComponent({
  name: 'ProjectView',
  components: {
    'a-row': Row,
    'a-col': Col,
    'a-card': Card,
    'a-avatar': Avatar,
    'a-button': Button,
    'a-space': Space,
    'setting-outlined': SettingOutlined,
    'user-outlined': UserOutlined,
    'project-outlined': ProjectOutlined,
    'filetext-outlined': FileTextOutlined,
  },
  setup() {
    const projects = ref([
      {
        name: '智能风控平台',
        id: 'PRJ-001',
        owner: '张三',
        description: '面向金融场景的智能风控系统，支持模型接入、规则引擎与可视化监控。',
        cases: 12,
        icon: 'project-outlined',
      },
      {
        name: '视觉检测系统',
        id: 'PRJ-002',
        owner: '李四',
        description: '基于深度学习的图像缺陷检测与追溯平台，支持多摄像头并行处理。',
        cases: 8,
        icon: 'filetext-outlined',
      },
      {
        name: '客户画像服务',
        id: 'PRJ-003',
        owner: '王五',
        description: '整合多源数据构建客户画像，提供标签管理与画像查询 API。',
        cases: 23,
        icon: 'user-outlined',
      },
      {
        name: '自动化测试平台',
        id: 'PRJ-004',
        owner: '赵六',
        description: '流水线式自动化测试，支持多语言脚本与并发执行。',
        cases: 5,
        icon: 'project-outlined',
      },
      {
        name: '大数据采集',
        id: 'PRJ-005',
        owner: '孙七',
        description: '分布式采集框架，支持离线/实时数据接入与流式处理。',
        cases: 16,
        icon: 'filetext-outlined',
      },
      {
        name: '智能推荐引擎',
        id: 'PRJ-006',
        owner: '周八',
        description: '基于行为与内容的个性化推荐系统，支持 A/B 实验与在线学习。',
        cases: 34,
        icon: 'project-outlined',
      },
    ])

    return { projects }
  },
})
</script>

<style scoped>
.project-page {
  min-height: 100vh;
  padding: 40px 36px;
  box-sizing: border-box;
  background:
    radial-gradient(1200px 600px at 10% 10%, rgba(58, 123, 213, 0.12), transparent 10%),
    radial-gradient(1000px 500px at 90% 90%, rgba(131, 58, 180, 0.08), transparent 10%),
    linear-gradient(135deg, #0f1724 0%, #071026 50%, #041226 100%);
  color: #e6eef8;
  position: relative;
  overflow: hidden;
}

.project-page::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.02) 0 1px, transparent 1px 60px),
    repeating-linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0 1px, transparent 1px 60px);
  pointer-events: none;
}

.page-header {
  margin-bottom: 24px;
}

.page-header h1 {
  margin: 0 0 6px 0;
  font-size: 28px;
  font-weight: 700;
  color: #f5fbff;
}

.subtitle {
  margin: 0;
  color: rgba(245, 251, 255, 0.75);
}

.cards-row {
  position: relative;
  z-index: 1;
}

.proj-card {
  border-radius: 12px;
  overflow: hidden;
  backdrop-filter: blur(6px);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));
  box-shadow: 0 6px 18px rgba(2, 6, 23, 0.6);
}

.card-title {
  display: flex;
  align-items: center;
}

.proj-avatar {
  background: linear-gradient(135deg, #3a7bd5, #833ab4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.title-meta {
  margin-left: 12px;
}

.title-meta .name {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
}

.meta-id {
  color: rgba(255, 255, 255, 0.65);
  font-size: 12px;
  margin-top: 4px;
}

.card-body {
  margin-top: 12px;
}
.desc {
  color: rgba(255, 255, 255, 0.8);
  min-height: 44px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  color: rgba(255, 255, 255, 0.75);
  font-size: 13px;
}
.info-row .owner {
  display: flex;
  align-items: center;
  gap: 8px;
}

.ant-avatar svg {
  color: #fff;
}

@media (max-width: 575px) {
  .project-page {
    padding: 20px 12px;
  }
}
</style>
