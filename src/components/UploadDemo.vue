<template>
  <div style="padding: 24px; background: #f0f2f5; min-height: 100vh">
    <a-card
      title="Custom Upload Component Demo"
      :bordered="false"
      style="max-width: 800px; margin: 0 auto"
    >
      <div style="margin-bottom: 24px">
        <h3>1. Default Upload (Single, 10MB limit)</h3>
        <CustomUpload v-model="fileList1" />
        <pre style="background: #fafafa; padding: 8px; margin-top: 8px">{{ fileList1Names }}</pre>
      </div>

      <div style="margin-bottom: 24px">
        <h3>2. Multiple Upload (Max 3 files, Images only, 2MB limit)</h3>
        <CustomUpload
          v-model="fileList2"
          :multiple="true"
          :limit="3"
          accept="image/*"
          :maxSize="2"
          buttonText="Upload Images"
        />
        <pre style="background: #fafafa; padding: 8px; margin-top: 8px">{{ fileList2Names }}</pre>
      </div>

      <div>
        <h3>3. Custom Slot</h3>
        <CustomUpload v-model="fileList3">
          <template #uploadTrigger>
            <div class="custom-trigger">
              <plus-outlined />
              <div style="margin-top: 8px">Custom Slot</div>
            </div>
          </template>
        </CustomUpload>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import CustomUpload from './CustomUpload.vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import type { UploadFile } from 'ant-design-vue'

const fileList1 = ref<UploadFile[]>([])
const fileList2 = ref<UploadFile[]>([])
const fileList3 = ref<UploadFile[]>([])

const fileList1Names = computed(() => fileList1.value.map((f) => f.name).join(', ') || 'No files')
const fileList2Names = computed(() => fileList2.value.map((f) => f.name).join(', ') || 'No files')
</script>

<style scoped>
.custom-trigger {
  border: 1px dashed #d9d9d9;
  border-radius: 8px;
  width: 128px;
  height: 128px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.3s;
}

.custom-trigger:hover {
  border-color: #1677ff;
}
</style>
