<script setup lang="ts">
import { ref } from 'vue'
import { useImageStore } from '../stores/image'
import { strategies, useStrategyStore } from '../stores/strategy'
import Button from './Button.vue'

const { setImage, clearImage } = useImageStore()

const store = useStrategyStore()
const scale = ref<number>(0)
const uploadEl = ref<HTMLInputElement>()

function loadImage(path: string): Promise<HTMLImageElement> {
  const image = new Image()
  image.src = path
  return new Promise(resolve => image.onload = () => resolve(image))
}

async function handleImage() {
  const files = uploadEl.value!.files
  if (!files || files.length === 0)
    return

  const image = await loadImage(URL.createObjectURL(files[0]))
  scale.value = image.width / image.height
  setImage(image)

  // Clear the file list.
  uploadEl.value!.value = ''
}
</script>

<template>
  <input ref="uploadEl" type="file" accept="image/*" class="hidden" @change="handleImage">
  <div class="space-y-4">
    <h1 class="text-3xl">
      Arguments
    </h1>
    <div class="space-y-2 flex flex-col">
      <span class="font-medium text-slate-500">Mode</span>
      <select
        v-model="store.strategyName"
        class="px-2 py-1 w-72 transition duration-300 border-2 outline-none border-indigo-400 hover:bg-indigo-500 hover:text-white rounded"
        @change="scale = 0; clearImage()"
      >
        <option
          v-for="[name, strategy] in Object.entries(strategies)"
          :key="name"
          class="bg-white text-black"
          :value="name"
        >
          {{ strategy.label }}
        </option>
      </select>
    </div>

    <div class="space-y-2 flex flex-col">
      <span class="font-medium text-slate-500">Photo</span>
      <Button class="w-24" @click="uploadEl!.click()">
        Select
      </Button>
    </div>
    <div class="space-y-2 flex flex-col">
      <span class="font-medium text-slate-500">Real Aspect Ratio</span>
      <span class="font-medium text-slate-900">{{ scale.toFixed(2) }}</span>
    </div>
  </div>
</template>
