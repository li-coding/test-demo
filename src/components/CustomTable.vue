<template>
  <div class="custom-table-container" ref="containerRef">
    <div class="table-wrapper">
      <a-table
        v-bind="$attrs"
        :columns="columns"
        :data-source="dataSource"
        :pagination="false"
        :loading="loading"
        :scroll="internalScroll"
        @change="handleTableChange"
        size="middle"
      >
        <!-- Custom header cell -->
        <!-- <template #headerCell="{ column }">
          <slot name="headerCell" :column="column">
            <span>{{ column.title }}</span>
          </slot>
        </template> -->

        <!-- Custom body cell -->
        <!-- <template #bodyCell="{ column, record, index, text }">
          <template v-if="column.key === 'operation'">
            <slot name="operation" :record="record" :index="index" :column="column">
            </slot>
          </template>
          <template v-else>
            <slot name="bodyCell" :column="column" :record="record" :index="index" :text="text">
              {{ text }}
            </slot>
          </template>
        </template> -->
        <template #bodyCell="{ column, record, index, text }">
          <slot
            name="bodyCell"
            :column="column"
            :record="record"
            :index="index"
            :text="text"
          ></slot>
        </template>
      </a-table>
    </div>

    <!-- Fixed Bottom Pagination -->
    <div v-if="pagination" class="pagination-wrapper">
      <a-pagination
        v-bind="pagination"
        @change="handlePageChange"
        @showSizeChange="handleSizeChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends Object">
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue'
import type { TableProps, PaginationProps } from 'ant-design-vue'

interface Props {
  columns: any[]
  dataSource: T[]
  pagination?: PaginationProps | false
  loading?: boolean
  scrollY?: number | string
}

const props = withDefaults(defineProps<Props>(), {
  pagination: () =>
    ({
      current: 1,
      pageSize: 10,
      total: 0,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total: number) => `Total ${total} items`,
    }) as PaginationProps,
  loading: false,
})

const emit = defineEmits(['change', 'update:pagination'])

const containerRef = ref<HTMLElement | null>(null)
const tableHeight = ref<number | string>(400)

// Calculate adaptive height
const calculateHeight = () => {
  nextTick(() => {
    if (containerRef.value) {
      const containerHeight = containerRef.value.offsetHeight
      const paginationHeight = props.pagination ? 56 : 0 // Standard pagination height
      const headerHeight = 55 // Approximate Ant Design Table header height
      // Subtract header and pagination to get body scroll height
      const calculatedBodyHeight = containerHeight - paginationHeight - headerHeight
      tableHeight.value = calculatedBodyHeight > 100 ? calculatedBodyHeight : 400
    }
  })
}

const internalScroll = computed(() => {
  if (props.scrollY) return { y: props.scrollY }
  return { y: tableHeight.value, x: 'max-content' }
})

onMounted(() => {
  calculateHeight()
  window.addEventListener('resize', calculateHeight)
})

onUnmounted(() => {
  window.removeEventListener('resize', calculateHeight)
})

const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter, extra) => {
  emit('change', { pagination, filters, sorter, extra })
}

const handlePageChange = (page: number, pageSize: number) => {
  if (props.pagination) {
    const newPagination = { ...props.pagination, current: page, pageSize }
    emit('update:pagination', newPagination)
    emit('change', {
      pagination: newPagination,
      filters: {},
      sorter: {},
      extra: { action: 'paginate' },
    })
  }
}

const handleSizeChange = (current: number, size: number) => {
  if (props.pagination) {
    const newPagination = { ...props.pagination, current: 1, pageSize: size }
    emit('update:pagination', newPagination)
    emit('change', {
      pagination: newPagination,
      filters: {},
      sorter: {},
      extra: { action: 'pageSize' },
    })
  }
}
</script>

<style scoped>
.custom-table-container {
  display: flex;
  flex-direction: column;
  height: 100%; /* Parent must have height */
  width: 100%;
  background: #fff;
  border-radius: 4px;
}

.table-wrapper {
  flex: 1;
  overflow: hidden; /* Important for table scroll */
}

.pagination-wrapper {
  padding: 12px 16px;
  display: flex;
  justify-content: flex-end;
  background: #fff;
  border-top: 1px solid #f0f0f0;
  z-index: 10;
}

/* Ensure table header sticks */
:deep(.ant-table-header) {
  position: sticky;
  top: 0;
  z-index: 2;
}
</style>
