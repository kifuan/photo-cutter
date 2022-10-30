<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { CalculatedStrategyData, StrategyStep } from '../stores/strategy'
import Button from './Button.vue'

const {
  step: { size, offset: [offsetX, offsetY], label },
  calculatedData: { unit, cutOffset: [cutOffsetX, cutOffsetY] },
  image,
} = defineProps<{
  step: StrategyStep
  calculatedData: CalculatedStrategyData
  image: HTMLImageElement
}>()

const canvas = ref<HTMLCanvasElement>()

function handleDownload() {
  const a = document.createElement('a')
  a.download = Math.random().toString(36).substring(2)
  a.href = canvas.value!.toDataURL()
  a.click()
}

onMounted(() => {
  const el = canvas.value!
  const ctx = el.getContext('2d')!
  el.width = el.height = size * unit
  ctx.drawImage(image, unit * offsetX + cutOffsetX, unit * offsetY + cutOffsetY, unit * size, unit * size, 0, 0, unit * size, unit * size)
})
</script>

<template>
  <div class="flex flex-col space-y-4">
    <p>{{ label }}</p>
    <canvas ref="canvas" />
    <Button @click="handleDownload()">
      下载
    </Button>
  </div>
</template>
