<template>
  <div class="drag-table-container">
    <a-table
      class="single-drag-table"
      :columns="columns"
      :data-source="dataSource"
      row-key="key"
      bordered
      :pagination="false"
    >
      <template #bodyCell="{ column }">
        <template v-if="column.dataIndex === 'sort'">
          <MenuOutlined class="drag-handle" />
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useSortable } from '@vueuse/integrations/useSortable'
import { MenuOutlined } from '@ant-design/icons-vue'

const columns = ref([
  {
    title: 'Sort',
    dataIndex: 'sort',
    width: 30,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 200,
    resizable: true,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: 100,
    resizable: true,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    width: 300,
    resizable: true,
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    width: 200,
    resizable: true,
  },
  {
    title: 'Action',
    key: 'action',
  },
])

const dataSource = ref([
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
])

onMounted(async () => {
  await nextTick()
  const el = document.querySelector('.single-drag-table .ant-table-tbody') as HTMLElement
  console.log('Sortable target element:', el)
  if (el) {
    useSortable(el, dataSource, {
      animation: 150,
      handle: '.drag-handle',
      onUpdate: (e) => {
        console.log('Sortable update:', e)
      },
    })
  }
})
</script>

<style scoped>
.drag-table-container {
  padding: 24px;
}
.drag-handle {
  cursor: grab;
  color: #999;
}
</style>
