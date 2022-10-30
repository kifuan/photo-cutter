<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { nextTick, ref } from 'vue'
import type { Strategy } from '../stores/strategy'
import { useStrategyStore } from '../stores/strategy'

const { strategy } = storeToRefs(useStrategyStore())
const canvases = [] as HTMLCanvasElement[]
const show = ref(false)

function calcRegularData(image: HTMLImageElement, strategy: Strategy): { unit: number; cutOffset: [ number, number ] } {
  const scale = image.width / image.height
  if (scale > strategy.scale) {
    // The width is more than expected, use height * scale to calculate ideal width.
    const idealWidth = image.height * strategy.scale
    const unit = idealWidth * strategy.unit
    const cutOffsetX = (image.width - idealWidth) / 2
    return { unit, cutOffset: [cutOffsetX, 0] }
  }
  else {
    // The height is more than expected, use width / scale to calculate ideal height.
    const idealHeight = image.width / strategy.scale
    const unit = image.width * strategy.unit
    const cutOffsetY = (image.height - idealHeight) / 2
    return { unit, cutOffset: [0, cutOffsetY] }
  }
}

function handleDownload(canvasIndex: number) {
  const a = document.createElement('a')
  a.download = Math.random().toString(36).substring(2)
  a.href = canvases[canvasIndex].toDataURL()
  a.click()
}

defineExpose<{ setImage(image: HTMLImageElement): void; clearImage(): void }>({
  setImage: (image) => {
    show.value = true
    const { unit, cutOffset: [cutOffsetX, cutOffsetY] } = calcRegularData(image, strategy.value)
    strategy.value.steps.forEach((step, index) => {
      const { size, offset: [offsetX, offsetY] } = step
      const canvas = canvases[index]
      const ctx = canvas.getContext('2d')!
      canvas.width = canvas.height = size * unit
      ctx.drawImage(image, unit * offsetX + cutOffsetX, unit * offsetY + cutOffsetY, unit * size, unit * size, 0, 0, unit * size, unit * size)
    })
  },
  clearImage: () => show.value = false,
})
</script>

<template>
  <h1>处理结果</h1>
  <div v-show="show" class="canvases">
    <div v-for="(step, index) in strategy.steps" :key="index" class="fragment">
      <p>{{ step.label }}</p>
      <canvas
        :ref="el => { canvases[index] = el as HTMLCanvasElement }"
      />
      <button @click="handleDownload(index)">
        下载
      </button>
    </div>
  </div>
  <div v-show="!show">
    暂未数据
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

.canvases {
    display: flex;
    flex-direction: column;
}
</style>
