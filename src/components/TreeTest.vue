<template>
  <div class="tree-test">
    <div class="toolbar">
      <a-button size="small" @click="resetTree">重置节点</a-button>
      <a-button size="small" @click="expandAll">展开全部</a-button>
      <a-button size="small" @click="collapseAll">收起全部</a-button>
    </div>

    <a-tree
      v-model:expandedKeys="expandedKeys"
      v-model:selectedKeys="selectedKeys"
      :tree-data="treeData"
      blockNode
      draggable
      @select="handleSelect"
      @drop="onDrop"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { AntTreeNodeDropEvent } from 'ant-design-vue/es/tree'

// 完整的 Tree 节点类型定义
interface TreeNode {
  key: string
  title: string
  children?: TreeNode[]
}

// 初始示例数据
const initialData: TreeNode[] = [
  {
    key: '0',
    title: '车控仪表',
    children: [
      { key: '0-0', title: '报警音' },
      { key: '0-1', title: '报警文字' },
    ],
  },
  {
    key: '1',
    title: '主交互',
    children: [
      { key: '1-0', title: '报警音1' },
      { key: '1-1', title: '报警文字1' },
    ],
  },
  {
    key: '2',
    title: '音频',
    children: [
      { key: '2-0', title: '报警音2' },
      { key: '2-1', title: '报警文字2' },
    ],
  },
]

// 响应式数据
const treeData = ref<TreeNode[]>(JSON.parse(JSON.stringify(initialData)))
const expandedKeys = ref<string[]>([])
const selectedKeys = ref<string[]>([])

// 工具函数：递归遍历，找到匹配 key 后执行回调
function loop(
  data: TreeNode[],
  key: string,
  callback: (item: TreeNode, index: number, arr: TreeNode[]) => void,
) {
  for (let i = 0; i < data.length; i++) {
    const item = data[i]!
    if (item.key === key) {
      callback(item, i, data)
      return
    }
    if (item.children && item.children.length) {
      loop(item.children, key, callback)
    }
  }
}

function handleSelect(keys: string[]) {
  selectedKeys.value = keys
}

// 重置树为初始数据
function resetTree() {
  treeData.value = JSON.parse(JSON.stringify(initialData))
  expandedKeys.value = []
  selectedKeys.value = []
}

function expandAll() {
  const keys: string[] = []
  function collect(d: TreeNode[]) {
    d.forEach((n) => {
      keys.push(n.key)
      if (n.children) collect(n.children)
    })
  }
  collect(treeData.value)
  expandedKeys.value = keys
}

function collapseAll() {
  expandedKeys.value = []
}

// 处理拖放并更新 treeData（支持同级移动和移动为子节点）
const onDrop = (info: AntTreeNodeDropEvent) => {
  // 拖动节点 key
  type RawNode = { key: string }
  const dragKey = (info.dragNode as unknown as RawNode).key
  // 目标放置节点 key
  const dropKey = (info.node as unknown as RawNode).key
  const dropToGap = info.dropToGap

  // 找到并删除拖动的节点（获得被移动的对象）
  let dragObj: TreeNode | undefined
  loop(treeData.value, dragKey, (item, index, arr) => {
    dragObj = arr.splice(index, 1)[0]
  })

  if (!dragObj) return

  if (!dropToGap) {
    // 放到目标节点内部，作为子节点的最后一项
    loop(treeData.value, dropKey, (item) => {
      item.children = item.children || []
      item.children.push(dragObj!)
    })
  } else {
    // 放到目标节点同级（上方或下方），根据 dropPosition 决定插入位置
    let ar: TreeNode[] = treeData.value
    let insertIndex = 0
    loop(treeData.value, dropKey, (_item, index, arr) => {
      ar = arr
      insertIndex = index
    })

    const position = info.dropPosition
    // dropPosition > 0 表示放在目标节点之后
    const insertAt = position > 0 ? insertIndex + 1 : insertIndex
    ar.splice(insertAt, 0, dragObj)
  }

  // 触发 Vue 的更新
  treeData.value = JSON.parse(JSON.stringify(treeData.value))
}
</script>

<style scoped>
.tree-test {
  padding: 12px;
}
.toolbar {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}
</style>
