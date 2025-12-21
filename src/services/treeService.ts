export interface TreeNode {
  id: number
  name: string
  parentId: number
  children?: TreeNode[]
  isLeaf: boolean
}

const BASE_URL = 'http://localhost:3000'

export const treeService = {
  /**
   * Fetch tree nodes. If id is provided, fetch sub-tree.
   */
  async getNodes(id?: number): Promise<TreeNode[]> {
    const url = new URL(`${BASE_URL}/tree`)
    if (id !== undefined) {
      url.searchParams.append('id', id.toString())
    }
    const response = await fetch(url.toString())
    if (!response.ok) throw new Error('Failed to fetch tree nodes')
    const data = await response.json()
    return Array.isArray(data) ? data : [data]
  },

  /**
   * Add a new node.
   */
  async addNode(name: string, parentId: number = 0): Promise<TreeNode> {
    const response = await fetch(`${BASE_URL}/tree`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, parentId }),
    })
    if (!response.ok) throw new Error('Failed to add node')
    return response.json()
  },

  /**
   * Update an existing node's name.
   */
  async updateNode(id: number, name: string): Promise<TreeNode> {
    const response = await fetch(`${BASE_URL}/tree/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })
    if (!response.ok) throw new Error('Failed to update node')
    return response.json()
  },

  /**
   * Delete a node and its descendants.
   */
  async deleteNode(id: number): Promise<{ message: string; deletedIds: number[] }> {
    const response = await fetch(`${BASE_URL}/tree/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error('Failed to delete node')
    return response.json()
  },
}
