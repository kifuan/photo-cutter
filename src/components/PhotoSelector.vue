<script setup lang="ts">
import { ref } from 'vue'
import { strategies, useStrategyStore } from '../stores/strategy'
import Button from './Button.vue'

const emits = defineEmits<{
  (e: 'select', image: HTMLImageElement): void
  (e: 'clear'): void
}>()

const strategyStore = useStrategyStore()
const scale = ref<number>(0)
const uploadEl = ref<HTMLInputElement>()

function loadImage(path: string): Promise<HTMLImageElement> {
  const image = new Image()
  image.src = path
  return new Promise(resolve => image.onload = () => resolve(image))
}

async function handleImage() {
  const file = uploadEl.value!.files![0]
  const image = await loadImage(URL.createObjectURL(file))
  scale.value = image.width / image.height
  emits('select', image)
}
</script>

<template>
  <input ref="uploadEl" type="file" accept="image/*" class="hidden" @change="handleImage">
  <div class="space-y-4">
    <h1 class="text-3xl">
      参数选择
    </h1>
    <div class="space-y-2 flex flex-col">
      <span class="font-medium text-slate-500">模式</span>
      <select
        v-model="strategyStore.name"
        class="px-2 py-1 w-72 transition duration-300 border-2 outline-none border-indigo-400 hover:bg-indigo-500 hover:text-white rounded"
        @change="scale = 0; emits('clear')"
      >
        <option
          v-for="[name, strategy] in Object.entries(strategies)"
          :key="name"
          class="bg-white text-black"
          :value="name"
        >
          {{ strategy.label }} 宽高比{{ strategy.scale.toFixed(2) }}
        </option>
      </select>
    </div>

    <div class="space-y-2 flex flex-col">
      <span class="font-medium text-slate-500">图片</span>
      <Button class="w-24" @click="uploadEl!.click()">
        选择图片
      </Button>
    </div>
    <div class="space-y-2 flex flex-col">
      <span class="font-medium text-slate-500">实际宽高比</span>
      <span class="font-medium text-slate-900">{{ scale.toFixed(2) }}</span>
    </div>
  </div>
</template>
