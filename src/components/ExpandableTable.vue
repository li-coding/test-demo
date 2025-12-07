<template>
  <div>
    <el-table
      id="expandable-table"
      :data="tableData"
      style="width: 100%"
      row-key="id"
      :default-expand-all="false"
    >
      <el-table-column label=" " width="40">
        <template #default="{ row }">
          <div
            class="drag-handle"
            draggable="true"
            @dragstart="onDragStart($event, row)"
            @dragover.prevent
            @drop="onDropRow($event, row)"
            title="拖动排序"
          >
            ☰
          </div>
        </template>
      </el-table-column>
      <el-table-column type="expand">
        <template #default="{ row }">
          <el-table
            :data="row.children || []"
            style="width: 100%"
            size="small"
            :row-key="getChildRowKeyFactory(row.id)"
            :show-header="false"
          >
            <el-table-column prop="id" label="子项 ID" width="100" />
            <el-table-column prop="name" label="子项 名称" />
            <el-table-column prop="value" label="值" width="140" />
          </el-table>
        </template>
      </el-table-column>

      <el-table-column prop="id" label="ID" width="100" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="count" label="子项数量" width="120" />
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElTable, ElTableColumn } from 'element-plus'
interface ChildItem {
  id: number
  name: string
  value?: string | number
}

interface RowItem {
  id: number
  name: string
  count: number
  children?: ChildItem[]
}

const tableData = ref<RowItem[]>([
  {
    id: 1,
    name: '车辆信息',
    count: 2,
    children: [
      { id: 1, name: '发动机', value: 'OK' },
      { id: 2, name: '变速箱', value: 'OK' },
    ],
  },
  {
    id: 2,
    name: '传感器',
    count: 3,
    children: [
      { id: 1, name: '速度传感器', value: 120 },
      { id: 2, name: '温度传感器', value: '36°C' },
      { id: 3, name: '油压传感器', value: '正常' },
    ],
  },
  {
    id: 3,
    name: '网络',
    count: 0,
  },
])

function getChildRowKeyFactory(parentId: number) {
  return (r: ChildItem) => `${parentId}-${r.id}`
}

// HTML5 原生拖拽实现（仅针对顶级行）
function onDragStart(e: DragEvent, row: RowItem) {
  const idx = tableData.value.indexOf(row)
  if (e.dataTransfer && idx >= 0) {
    e.dataTransfer.setData('text/plain', String(idx))
    e.dataTransfer.effectAllowed = 'move'
  }
}

function onDropRow(e: DragEvent, targetRow: RowItem) {
  const fromStr = e.dataTransfer?.getData('text/plain')
  if (!fromStr) return
  const from = Number(fromStr)
  const to = tableData.value.indexOf(targetRow)
  if (isNaN(from) || to < 0) return
  if (from === to) return
  const moved = tableData.value.splice(from, 1)[0] as RowItem
  tableData.value.splice(to, 0, moved)
  tableData.value = JSON.parse(JSON.stringify(tableData.value))
}
</script>

<style scoped>
/* 简单样式，保持与项目风格一致 */
</style>
