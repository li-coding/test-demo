<template>
  <div class="custom-tree">
    <div class="tree-header">
      <el-button type="primary" size="small" @click="handleAddRoot">Add Root Node</el-button>
    </div>
    <el-tree
      ref="treeRef"
      :props="treeProps"
      :load="loadNode"
      lazy
      node-key="id"
      class="infinite-tree"
    >
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <span v-if="!data.isEdit" class="node-label">{{ node.label }}</span>
          <el-input
            v-else
            v-model="data.editName"
            size="small"
            class="edit-input"
            @blur="handleSave(node, data)"
            @keyup.enter="handleSave(node, data)"
            v-focus
          />

          <span class="node-ops">
            <el-button link type="primary" size="small" @click.stop="handleAdd(node, data)">
              Add
            </el-button>
            <el-button link type="primary" size="small" @click.stop="handleEdit(node, data)">
              Edit
            </el-button>
            <el-popconfirm
              title="Are you sure to delete this node?"
              @confirm="handleDelete(node, data)"
            >
              <template #reference>
                <el-button link type="danger" size="small" @click.stop> Delete </el-button>
              </template>
            </el-popconfirm>
          </span>
        </span>
      </template>
    </el-tree>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { treeService, type TreeNode } from '@/services/treeService'
import { ElMessage } from 'element-plus'
import type Node from 'element-plus/es/components/tree/src/model/node'

const treeRef = ref()
const treeProps = {
  label: 'name',
  children: 'children',
  isLeaf: 'isLeaf',
}

// Directive for auto-focusing the edit input
const vFocus = {
  mounted: (el: HTMLElement) => el.querySelector('input')?.focus(),
}

/**
 * Lazy loading function for el-tree
 */
const loadNode = async (
  node: Node,
  resolve: (data: (TreeNode & { isEdit: boolean; editName: string })[]) => void,
) => {
  try {
    const parentId = node.level === 0 ? 0 : (node.data as TreeNode).id
    const nodes = await treeService.getNodes(parentId)
    // Initialize nodes with extra UI state
    const data = nodes.map((n) => ({
      ...n,
      isEdit: false,
      editName: n.name,
    }))
    console.log(data)
    if (data[0].children?.length) {
      resolve(data[0].children)
    } else {
      resolve(data)
    }
  } catch (error: unknown) {
    ElMessage.error(error instanceof Error ? error.message : 'Unknown error')
    resolve([])
  }
}

/**
 * Add a root node
 */
const handleAddRoot = async () => {
  try {
    const newNode = await treeService.addNode('New Root Node', 0)
    // Refresh root nodes or append
    treeRef.value.append({ ...newNode, isEdit: true, editName: newNode.name }, null)
  } catch (error: unknown) {
    ElMessage.error(error instanceof Error ? error.message : 'Unknown error')
  }
}

/**
 * Add a child node
 */
const handleAdd = async (node: Node, data: TreeNode & { isLeaf: boolean }) => {
  try {
    const newNode = await treeService.addNode('New Child Node', data.id)
    if (data.isLeaf) {
      data.isLeaf = false
      // Force reload if it was a leaf
      node.loaded = false
      node.expand()
    } else {
      treeRef.value.append({ ...newNode, isEdit: true, editName: newNode.name }, node)
      node.expand()
    }
  } catch (error: unknown) {
    ElMessage.error(error instanceof Error ? error.message : 'Unknown error')
  }
}

/**
 * Enter edit mode
 */
const handleEdit = (_node: Node, data: TreeNode & { isEdit: boolean; editName: string }) => {
  data.isEdit = true
  data.editName = data.name
}

/**
 * Save node name
 */
const handleSave = async (_node: Node, data: TreeNode & { isEdit: boolean; editName: string }) => {
  if (!data.isEdit) return
  if (!data.editName.trim()) {
    data.isEdit = false
    return
  }
  try {
    const updated = await treeService.updateNode(data.id, data.editName)
    data.name = updated.name
    data.isEdit = false
    ElMessage.success('Node updated')
  } catch (error: unknown) {
    ElMessage.error(error instanceof Error ? error.message : 'Unknown error')
  }
}

/**
 * Delete node
 */
const handleDelete = async (node: Node, data: TreeNode) => {
  try {
    await treeService.deleteNode(data.id)
    treeRef.value.remove(node)
    ElMessage.success('Node deleted')
  } catch (error: unknown) {
    ElMessage.error(error instanceof Error ? error.message : 'Unknown error')
  }
}
</script>

<style scoped>
.custom-tree {
  padding: 16px;
  background: #fff;
  border-radius: 8px;
}

.tree-header {
  margin-bottom: 12px;
}

.infinite-tree {
  max-width: 600px;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.node-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.edit-input {
  width: 150px;
}

.node-ops {
  margin-left: 12px;
}
</style>
