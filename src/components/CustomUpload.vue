<template>
  <div class="custom-upload">
    <a-upload
      v-model:file-list="innerFileList"
      :name="name"
      :multiple="multiple"
      :action="action"
      :accept="accept"
      :headers="headers"
      :data="data"
      :before-upload="handleBeforeUpload"
      @change="handleChange"
      @remove="handleRemove"
      class="upload-area"
    >
      <div v-if="innerFileList.length < limit">
        <slot name="uploadTrigger">
          <a-button>
            <upload-outlined />
            {{ buttonText }}
          </a-button>
        </slot>
      </div>
    </a-upload>

    <!-- Custom Progress (Optional, if you want something more visual than default) -->
    <div v-for="file in uploadingFiles" :key="file.uid" class="upload-progress-item">
      <div class="file-info">
        <span class="file-name text-truncate">{{ file.name }}</span>
        <span class="file-percent">{{ file.percent }}%</span>
      </div>
      <!-- <a-progress
        :percent="file.percent"
        size="small"
        :status="file.status === 'error' ? 'exception' : 'active'"
      /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { message } from 'ant-design-vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import type { UploadChangeParam, UploadFile, UploadProps } from 'ant-design-vue'

interface Props {
  modelValue?: UploadFile[]
  action?: string
  multiple?: boolean
  maxSize?: number // In MB
  accept?: string
  limit?: number
  name?: string
  buttonText?: string
  headers?: any
  data?: any
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  action: 'http://localhost:3000/upload', // Default mock
  multiple: true,
  maxSize: 10,
  accept: '*',
  limit: 5,
  name: 'file',
  buttonText: 'Click to Upload',
})

const emit = defineEmits(['update:modelValue', 'change', 'success', 'error', 'remove'])

const innerFileList = ref<UploadFile[]>(props.modelValue)

// Sync with modelValue
watch(
  () => props.modelValue,
  (val) => {
    innerFileList.value = val
  },
  { deep: true },
)

const uploadingFiles = computed(() => {
  return innerFileList.value.filter((file) => file.status === 'uploading')
})

const handleBeforeUpload: UploadProps['beforeUpload'] = (file) => {
  const isLtMaxSize = file.size / 1024 / 1024 < props.maxSize
  if (!isLtMaxSize) {
    message.error(`File must be smaller than ${props.maxSize}MB!`)
  }

  // Type validation could be added here if 'accept' isn't enough

  return isLtMaxSize
}

const handleChange = (info: UploadChangeParam) => {
  let resFileList = [...info.fileList]

  // 1. Limit the number of uploaded files
  resFileList = resFileList.slice(-props.limit)

  // 2. Read from response and show link
  resFileList = resFileList.map((file) => {
    console.log('handleChange file', file)
    if (file.response) {
      // Component will show file.url as link
      file.url = file.response.file.url
    }
    return file
  })

  innerFileList.value = resFileList
  emit('update:modelValue', resFileList)
  emit('change', info)

  if (info.file.status === 'done') {
    message.success(`${info.file.name} file uploaded successfully`)
    emit('success', info.file)
  } else if (info.file.status === 'error') {
    message.error(`${info.file.name} file upload failed.`)
    emit('error', info.file)
  }
}

const handleRemove = (file: UploadFile) => {
  emit('remove', file)
}
</script>

<style scoped>
.custom-upload {
  width: 100%;
}

.upload-area {
  margin-bottom: 16px;
}

.upload-progress-item {
  margin-top: 8px;
  padding: 8px;
  background: #f9f9f9;
  border-radius: 4px;
}

.file-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  font-size: 12px;
  color: #666;
}

.file-name {
  max-width: 80%;
}

.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
