<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    :items="items"
    @click="handleClick"
  >
  </a-menu>
</template>

<script lang="ts" setup>
import { type Reactive, ref, reactive, h, onMounted } from 'vue'
import { PieChartOutlined, MailOutlined } from '@ant-design/icons-vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const openKeys = ref<string[]>([])
const selectedKeys = ref<string[]>([])
// 菜单项信息接口
interface MenuItemInfo {
  key: string
  label: string
  title?: string
  icon?: () => unknown
  url?: string
  children?: MenuItemInfo[]
}
// 菜单数据
const items: Reactive<MenuItemInfo[]> = reactive([
  {
    key: 'dashboard',
    icon: () => h(PieChartOutlined),
    label: '工作台',
    title: '工作台',
    url: '/dashboard',
  },
  {
    key: 'test-case-management',
    icon: () => h(MailOutlined),
    label: '测试用例',
    title: '测试用例',
    children: [
      {
        key: 'test-case',
        label: '用例池',
        title: '用例池',
        url: '/test-case',
      },
      {
        key: 'test-suite',
        label: '用例套件',
        title: '用例套件',
      },
      {
        key: 'test-review',
        label: '用例评审',
        title: '用例评审',
      },
    ],
  },
])

function handleClick(info: MenuItemInfo) {
  console.log('click', info)
  // 优先使用 url，如果没有则使用 key
  const targetPath = info.url || `/${info.key}`
  router.push(targetPath)
}
onMounted(() => {
  const routeName = route.name
  selectedKeys.value.push(routeName as string)
})
</script>

<style>
.ant-menu {
  border-inline-end: none !important;
}
</style>
