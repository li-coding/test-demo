<template>
  <div class="demo-page">
    <a-card title="Custom Table Component Demo" :bordered="false">
      <div class="table-container">
        <CustomTable
          :columns="columns"
          :data-source="dataSource"
          v-model:pagination="pagination"
          :loading="loading"
          @change="handleTableChange"
        >
          <!-- Custom Status Rendering -->
          <template #bodyCell="{ column, text }">
            <template v-if="column.key === 'status'">
              <a-tag :color="text === 'Active' ? 'green' : 'red'">
                {{ text }}
              </a-tag>
            </template>
            <template v-if="column.key === 'operation'">
              <a-space>
                <a-button type="link" size="small" @click="handleEdit(record)">Edit</a-button>
                <a-divider type="vertical" />
                <a-button type="link" size="small" danger @click="handleDelete(record)"
                  >Delete</a-button
                >
              </a-space>
            </template>
          </template>
        </CustomTable>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CustomTable from './CustomTable.vue'
import { message } from 'ant-design-vue'
interface UserData {
  id: number
  name: string
  age: number
  status: string
  address: string
}
// 1. Column Definitions
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 80,
    sorter: true,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 200,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: 100,
    sorter: true,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: 120,
    filters: [
      { text: 'Active', value: 'Active' },
      { text: 'Inactive', value: 'Inactive' },
    ],
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 150,
  },
]

// 2. Data State
const dataSource = ref<UserData[]>([])
const loading = ref(false)
const pagination = ref({
  current: 1,
  pageSize: 10,
  total: 50,
  showSizeChanger: true,
  showTotal: (total: number) => `Total ${total} items`,
})

// 3. Mock Data Fetching
const fetchData = (params: any = {}) => {
  loading.value = true
  // Simulate API call
  setTimeout(() => {
    const data = []
    for (let i = 0; i < pagination.value.pageSize; i++) {
      const index = (pagination.value.current - 1) * pagination.value.pageSize + i + 1
      if (index > pagination.value.total) break
      data.push({
        id: index,
        name: `User ${index}`,
        age: Math.floor(Math.random() * 40) + 20,
        status: Math.random() > 0.3 ? 'Active' : 'Inactive',
        address: `London No. ${index} Lake Park`,
      })
    }
    dataSource.value = data
    loading.value = false
  }, 500)
}

// 4. Handle Table Change (Pagination, Sort, Filter)
const handleTableChange = (params: any) => {
  console.log('Table Change Params:', params)
  pagination.value = params.pagination
  fetchData(params)
}

// 5. Actions
const handleEdit = (record: any) => {
  message.info(`Editing User: ${record.name}`)
}

const handleDelete = (record: any) => {
  message.warning(`Deleted User: ${record.name}`)
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.demo-page {
  padding: 24px;
  background: #f0f2f5;
  min-height: 100vh;
}

/* Container for the table should have a fixed height or flex to show adaptive scroll */
.table-container {
  height: calc(100vh - 200px); /* Example of providing height to parent */
  border: 1px solid #f0f0f0;
}
</style>
