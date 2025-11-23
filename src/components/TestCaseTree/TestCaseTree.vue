<template>
  <a-tree
    v-model:expandedKeys="expandedKeys"
    :selectedKeys="selectedKeys"
    @select="handleNodeSelect"
    @dragenter="onDragEnter"
    :tree-data="treeData"
    blockNode
    draggable
  >
    <template #title="{ title, key }">
      <div class="node-title">
        <span class="node-text">{{ title }}</span>
        <a-popover
          title="添加子节点"
          trigger="click"
          placement="bottom"
          @openChange="handlePopoverOpen"
        >
          <template #content>
            <div style="min-width: 200px">
              <a-form layout="vertical">
                <a-form-item>
                  <a-input
                    ref="nodeInputRef"
                    v-model:value="newNodeName"
                    placeholder="请输入节点名称"
                    @keyup.enter="handleAddNode(title, key)"
                  />
                </a-form-item>
                <a-form-item>
                  <a-space>
                    <a-button type="primary" size="small" @click="handleAddNode(title, key)"
                      >确认</a-button
                    >
                    <a-button size="small" @click="addCancel">取消</a-button>
                  </a-space>
                </a-form-item>
              </a-form>
            </div>
          </template>
          <span class="node-actions">
            <PlusOutlined />
          </span>
        </a-popover>
      </div>
    </template>
  </a-tree>
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import type { AntTreeNodeDragEnterEvent } from 'ant-design-vue/es/tree'
// Tree 节点信息接口
interface TreeNodeInfo {
  key: string
  title: string
  children?: TreeNodeInfo[]
}

// Tree 选择事件参数接口
interface TreeSelectInfo {
  node: TreeNodeInfo
  selected: boolean
  selectedNodes: TreeNodeInfo[]
  nativeEvent: MouseEvent
}
const treeData: TreeNodeInfo[] = [
  {
    title: '车控仪表',
    key: '0-0',
    children: [
      {
        title: '报警音',
        key: '0-0-0',
      },
      {
        title: '报警文字',
        key: '0-0-1',
      },
    ],
  },
  {
    title: '主交互',
    key: '0-1',
    children: [
      {
        title: '报警音1',
        key: '0-1-0',
      },
      {
        title: '报警文字1',
        key: '0-1-1',
      },
    ],
  },
  {
    title: '音频',
    key: '0-2',
    children: [
      {
        title: '报警音2',
        key: '0-2-0',
      },
      {
        title: '报警文字2',
        key: '0-2-1',
      },
    ],
  },
]

const expandedKeys = ref<string[]>([])
const selectedKeys = ref<string[]>([])

function handleNodeSelect(keys: string[], info: TreeSelectInfo) {
  const key = info.node.key
  selectedKeys.value = [key]
}

const newNodeName = ref<string>('')
const nodeInputRef = ref()

// 添加节点处理函数
const handleAddNode = (parentTitle: string, parentKey: string) => {
  if (!newNodeName.value.trim()) {
    // 可以添加错误提示
    return
  }

  console.log('添加节点:', {
    parentTitle,
    parentKey,
    newNodeName: newNodeName.value,
  })

  // TODO: 实际添加节点到 treeData 的逻辑
  // 这里可以添加递归查找父节点并添加子节点的逻辑

  // 清空输入框并关闭弹窗
  newNodeName.value = ''
  // 这里可能需要手动关闭 popover
}

const addCancel = () => {
  newNodeName.value = ''
  console.log('取消添加节点')
}

// 打开弹窗时聚焦输入框
const handlePopoverOpen = () => {
  nextTick(() => {
    if (nodeInputRef.value) {
      nodeInputRef.value.focus()
    }
  })
}

function onDragEnter(info: AntTreeNodeDragEnterEvent) {
  console.log('onDragEnter:', info)
}
</script>

<style>
.ant-tree {
  height: 100%;
  width: 260px;
  padding: 10px;
  background: none;
  border-radius: 0;
  border-right: 1px solid #e9e9e9;
}
.ant-tree-treenode,
.ant-tree-node-content-wrapper {
  width: 100%;
}
.ant-tree-treenode {
  padding: 4px !important;
}
.ant-tree-treenode:hover,
.ant-tree-treenode.ant-tree-treenode-selected {
  background: #e6f4ff;
  color: #1677ff;
}
.ant-tree-node-content-wrapper:hover,
.ant-tree-node-content-wrapper.ant-tree-node-selected {
  background: none !important;
}

.node-title {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.node-text {
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.node-actions {
  opacity: 0;
  transition: opacity 0.15s ease-in-out;
  display: inline-flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.45);
}

.node-title:hover .node-actions,
.ant-tree-treenode.ant-tree-treenode-selected .node-actions {
  opacity: 1;
}
</style>
