<script setup lang="ts">
import { ref } from 'vue'
import { useFileSystemAccess } from '@vueuse/core'
import { strategies, useStrategyStore } from '../stores/strategy'
import Button from './Button.vue'

const emits = defineEmits<{
  (e: 'select', image: HTMLImageElement): void
  (e: 'clear'): void
}>()

const strategyStore = useStrategyStore()
const scale = ref<number>(0)

function loadImage(path: string): Promise<HTMLImageElement> {
  const image = new Image()
  image.src = path
  return new Promise(resolve => image.onload = () => resolve(image))
}

async function handleSelectImage() {
  const res = useFileSystemAccess({
    dataType: 'Blob',
    types: [{
      description: 'Images',
      accept: {
        'image/*': [],
      },
    }],
  })
  await res.open()
  const image = await loadImage(URL.createObjectURL(res.data.value!))
  scale.value = image.width / image.height
  emits('select', image)
}
</script>

<template>
  <div class="space-y-4">
    <h1 class="text-3xl">
      参数选择
    </h1>
    <div class="space-y-2 flex flex-col">
      <span class="font-medium text-slate-500">模式</span>
      <select v-model="strategyStore.name" class="px-2 py-1 shadow w-48 outline-none border-2 rounded border-indigo-400 hover:border-indigo-500 active:border-indigo-600" @change="scale = 0; emits('clear')">
        <option
          v-for="[name, strategy] in Object.entries(strategies)"
          :key="name"
          :value="name"
        >
          {{ strategy.label }} 宽高比{{ strategy.scale.toFixed(2) }}
        </option>
      </select>
    </div>

    <div class="space-y-2 flex flex-col">
      <span class="font-medium text-slate-500">图片</span>
      <Button class="w-24" @click="handleSelectImage">
        选择图片
      </Button>
    </div>
    <div class="space-y-2 flex flex-col">
      <span class="font-medium text-slate-500">实际宽高比</span>
      <span class="font-medium text-slate-900">{{ scale.toFixed(2) }}</span>
    </div>
  </div>
</template>
