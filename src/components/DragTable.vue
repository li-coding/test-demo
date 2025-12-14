<template>
  <div class="drag-table-container">
    <a-table
      class="single-drag-table"
      :columns="columns"
      :data-source="dataSource"
      bordered
      :pagination="false"
      :scroll="{ x: 1000 }"
    >
      <template #headerCell="{ column }">
        <template v-if="column.resizable">
          <div class="resizable-header-cell">
            <span>{{ column.title }}</span>
            <div
              class="resize-handle"
              @mousedown.stop.prevent="onResizeStart($event, column)"
              @click.stop
            ></div>
          </div>
        </template>
      </template>
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'name'">
          <a>{{ text }}</a>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Sortable from 'sortablejs'

const columns = ref([
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

interface ResizableColumn {
  width?: number
  resizable?: boolean
  [key: string]: unknown
}

const draggingColumn = ref<ResizableColumn | null>(null)
const startX = ref(0)
const startWidth = ref(0)

const onResizeStart = (e: MouseEvent, column: ResizableColumn) => {
  draggingColumn.value = column
  startX.value = e.clientX
  startWidth.value = column.width || 100
  document.addEventListener('mousemove', onResizeMove)
  document.addEventListener('mouseup', onResizeEnd)
  document.body.style.cursor = 'col-resize'
}

const onResizeMove = (e: MouseEvent) => {
  if (draggingColumn.value) {
    const offset = e.clientX - startX.value
    const targetColumn = columns.value.find((col) => col.key === draggingColumn.value?.key)
    if (targetColumn) {
      targetColumn.width = Math.max(50, startWidth.value + offset)
    }
    if (targetColumn?.width <= 100) {
      targetColumn.width = 100
    }
  }
}

const onResizeEnd = () => {
  draggingColumn.value = null
  document.removeEventListener('mousemove', onResizeMove)
  document.removeEventListener('mouseup', onResizeEnd)
  document.body.style.cursor = ''
}

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

onMounted(() => {
  const tableBody =
    document.querySelector('.single-drag-table .ant-table-body tbody') ||
    document.querySelector('.single-drag-table tbody')
  if (tableBody) {
    Sortable.create(tableBody as HTMLElement, {
      animation: 150,
      onEnd: ({ oldIndex, newIndex }) => {
        if (oldIndex !== undefined && newIndex !== undefined && oldIndex !== newIndex) {
          const targetRow = dataSource.value.splice(oldIndex, 1)[0]
          if (targetRow) {
            dataSource.value.splice(newIndex, 0, targetRow)
          }
        }
      },
    })
  }
})
</script>

<style scoped>
.drag-table-container {
  padding: 24px;
}

.resizable-header-cell {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.resize-handle {
  position: absolute;
  right: -5px;
  bottom: 0;
  width: 10px;
  height: 100%;
  cursor: col-resize;
  z-index: 1;
}

.resize-handle:hover {
  background-color: #1890ff;
  opacity: 0.5;
}
</style>
