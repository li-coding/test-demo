<template>
  <div class="project-page">
    <div class="content-container">
      <div class="card-grid">
        <ProjectCard
          v-for="(project, index) in projects"
          :key="index"
          :title="project.title"
          :description="project.description"
          :icon="project.icon"
          :stats="project.stats"
          :manager="project.manager"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ProjectCard from '@/components/ProjectCard.vue'
import {
  CarOutlined,
  DeploymentUnitOutlined,
  DropboxOutlined,
  GlobalOutlined,
  CodeSandboxOutlined,
} from '@ant-design/icons-vue'

// Mock data
const projects = ref([
  {
    title: '名称1',
    description:
      '这里是一段文字描述这里是一段文字描述这里是一段文字描述这里是一段文字描述这里是一段文字描述这里是一段文字描述这里是一段文字描述这里是一段文字描述这里是一段文字描述这里...',
    icon: DeploymentUnitOutlined,
    stats: { cases: 1000, plans: 200 },
    manager: '张三',
  },
  {
    title: '名称2',
    description:
      '这里是一段文字描述这里是一段文字描述这里是一段文字描述这里是一段文字描述这里是一段文字描述这里是一段文字描述这里是一段文字描述这里是一段文字描述这里是一段文字描述这里...',
    icon: GlobalOutlined, // Using placeholder/icon directly
    stats: { cases: 1000, plans: 200 },
    manager: '张三',
  },
  {
    title: '名称3',
    description:
      '这里是一段文字描述这里是一段文字描述这里是一段文字描述这里是一段文字描述这里是一段文字描述这里是一段文字描述这里是一段文字描述这里是一段文字描述这里是一段文字描述这里...',
    icon: CodeSandboxOutlined,
    stats: { cases: 1000, plans: 200 },
    manager: '张三',
  },
  {
    title: '名称4',
    description:
      '这里是一段文字描述这里是一段文字描述这里是一段文字描述这里是一段文字描述这里是一段文字描述这里是一段文字描述这里是一段文字描述这里是一段文字描述这里是一段文字描述这里...',
    icon: CarOutlined,
    stats: { cases: 1000, plans: 200 },
    manager: '张三',
  },
  {
    title: '名称5',
    description:
      '这里是一段文字描述这里是一段文字描述这里是一段文字描述这里是一段文字描述这里是一段文字描述这里是一段文字描述这里是一段文字描述这里是一段文字描述这里是一段文字描述这里...',
    icon: GlobalOutlined,
    stats: { cases: 1000, plans: 200 },
    manager: '张三',
  },
  {
    title: '名称6',
    description:
      '这里是一段文字描述这里是一段文字描述这里是一段文字描述这里是一段文字描述这里是一段文字描述这里是一段文字描述这里是一段文字描述这里是一段文字描述这里是一段文字描述这里...',
    icon: DropboxOutlined,
    stats: { cases: 1000, plans: 200 },
    manager: '张三',
  },
  {
    title: '名称7',
    description:
      '这里是一段文字描述这里是一段文字描述这里是一段文字描述这里是一段文字描述这里是一段文字描述这里是一段文字描述这里是一段文字描述这里是一段文字描述这里是一段文字描述这里...',
    icon: DeploymentUnitOutlined,
    stats: { cases: 1200, plans: 250 },
    manager: '李四',
  },
])
</script>

<style scoped>
.project-page {
  width: 100vw;
  height: 100vh;
  background-image: url('../images/project-bg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.content-container {
  width: 90%;
  max-width: 1400px;
  /*
    Approx height for 2 rows of cards + gap + padding.
    Assuming card height ~240px. 2 rows ~ 480px + gap 24px = ~504px.
    Set max-height to 550px to be safe.
  */
  max-height: 550px;
  display: flex;
  flex-direction: column;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); /* Responsive columns */
  gap: 24px;
  overflow-y: auto;
  padding: 20px; /* Padding for shadow/hover space */

  /* Scrollbar styling */
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.5) transparent;
}

/* Custom scrollbar for Webkit */
.card-grid::-webkit-scrollbar {
  width: 8px;
}

.card-grid::-webkit-scrollbar-track {
  background: transparent;
}

.card-grid::-webkit-scrollbar-thumb {
  background-color: rgba(189, 189, 189, 0.5);
  border-radius: 4px;
}

/*
  Requirement: Max 3 per row.
  We can force max-columns with media queries if auto-fill goes to 4 on huge screens.
*/
@media (min-width: 1600px) {
  /* Adjust based on card min-width */
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Responsive adjustment for smaller screens */
@media (max-width: 1200px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 800px) {
  .card-grid {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
