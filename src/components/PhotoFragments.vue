<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { computed, watch } from 'vue'
import { useImageStore } from '../stores/image'
import { strategies, useStrategyStore } from '../stores/strategy'

const imageStore = useImageStore()
const strategyStore = useStrategyStore()
const strategy = computed(() => {
  return strategies[strategyStore.strategy]
})
const canvases = [] as HTMLCanvasElement[]

watch(storeToRefs(imageStore).image, (image) => {
  if (image === undefined)
    return

  let unit: number; let cutOffsetX = 0; let cutOffsetY = 0
  const scale = image.width / image.height
  if (scale > strategy.value.scale) {
    const idealWidth = image.height * strategy.value.scale
    unit = idealWidth * strategy.value.unit
    cutOffsetX = (image.width - idealWidth) / 2
  }
  else {
    const idealHeight = image.width / strategy.value.scale
    unit = image.width * strategy.value.unit
    cutOffsetY = (image.height - idealHeight) / 2
  }
  for (let i = 0; i < canvases.length; i++) {
    const { size, offset: [offsetX, offsetY] } = strategy.value.steps[i]
    const canvas = canvases[i]
    const ctx = canvas.getContext('2d')!
    canvas.width = canvas.height = size * unit
    ctx.drawImage(image, unit * offsetX + cutOffsetX, unit * offsetY + cutOffsetY, unit * size, unit * size, 0, 0, unit * size, unit * size)
  }
})

function handleDownload(canvasIndex: number) {
  const a = document.createElement('a')
  a.download = Math.random().toString(36).substring(2)
  a.href = canvases[canvasIndex].toDataURL()
  a.click()
}
</script>

<template>
  <div v-for="(step, index) in strategy.steps" :key="index" class="fragment">
    <p>{{ step.label }}</p>
    <canvas
      :ref="el => { canvases[index] = el as HTMLCanvasElement }"
    />
    <button @click="handleDownload(index)">
      下载
    </button>
  </div>
</template>

<style scoped>
.fragment {
    display: flex;
    flex-direction: column;
}

.fragment > * {
    margin-bottom: 15px;
}
</style>
