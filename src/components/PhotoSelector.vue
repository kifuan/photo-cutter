<script setup lang="ts">
import { ref } from 'vue'
import { strategies, useStrategyStore } from '../stores/strategy'
import { useImageStore } from '../stores/image'

const imageStore = useImageStore()
const strategyStore = useStrategyStore()
const uploader = ref<HTMLInputElement | undefined>()
const scale = ref<number>(0)

function handleSelect() {
  uploader.value!.value = ''
  scale.value = 0
  imageStore.image = undefined
}

function readImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => {
      const image = new Image()
      image.src = reader.result as string
      image.onload = () => resolve(image)
    }
    reader.readAsDataURL(file)
  })
}

async function handleImage() {
  const files = uploader.value!.files
  if (files === null || files.length !== 1)
    return

  const image = await readImage(files[0])
  scale.value = image.width / image.height
  imageStore.image = image
}
</script>

<template>
  <h1>参数选择</h1>
  <div class="container">
    <div>
      <label>模式: </label>
      <select v-model="strategyStore.strategy" @change="handleSelect">
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
      <button @click="uploader?.click()">
        选择图片
      </button>
    </div>
    <div>
      <label>实际宽高比: </label>
      <span>{{ scale.toFixed(2) }}</span>
    </div>
  </div>
  <!-- Make no effects on this hidden element -->
  <input ref="uploader" type="file" accept="image/*" @change="handleImage">
</template>

<style scoped>
input[type="file"] {
    display: none;
}

.container > * {
    margin-bottom: 20px;
}
</style>
