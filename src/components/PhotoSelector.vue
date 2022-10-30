<script setup lang="ts">
import { ref } from 'vue'
import { useFileSystemAccess } from '@vueuse/core'
import { strategies, useStrategyStore } from '../stores/strategy'

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

async function handleGetImage() {
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
  <h1>参数选择</h1>
  <div class="container">
    <div>
      <label>模式: </label>
      <select v-model="strategyStore.name" @change="scale = 0; emits('clear')">
        <option
          v-for="[name, strategy] in Object.entries(strategies)"
          :key="name"
          :value="name"
        >
          {{ strategy.label }} 宽高比{{ strategy.scale.toFixed(2) }}
        </option>
      </select>
    </div>
    <div>
      <label>图片: </label>
      <button @click="handleGetImage">
        选择图片
      </button>
    </div>
    <div>
      <label>实际宽高比: </label>
      <span>{{ scale.toFixed(2) }}</span>
    </div>
  </div>
</template>

<style scoped>
.container > * {
    margin-bottom: 20px;
}
</style>
