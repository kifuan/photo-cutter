<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'

import { useImageStore } from '../stores/image'
import type { StrategyStep } from '../stores/strategy'
import Button from './Button.vue'

const {
  step: { size, offset: [offsetX, offsetY] },
} = defineProps<{ step: StrategyStep }>()

const { image, calculatedData } = storeToRefs(useImageStore())

const canvas = ref<HTMLCanvasElement>()

function handleDownload() {
  const a = document.createElement('a')
  a.download = Math.random().toString(36).substring(2)
  a.href = canvas.value!.toDataURL()
  a.click()
}

watch(image, (image) => {
  if (image === undefined)
    return

  const { unit, cutOffset: [cutOffsetX, cutOffsetY] } = calculatedData.value
  const el = canvas.value!
  const ctx = el.getContext('2d')!
  el.width = el.height = size * unit
  ctx.drawImage(image, unit * offsetX + cutOffsetX, unit * offsetY + cutOffsetY, unit * size, unit * size, 0, 0, unit * size, unit * size)
})
</script>

<template>
  <div v-show="image !== undefined" class="flex flex-col space-y-4">
    <p>{{ step.label }}</p>
    <canvas ref="canvas" />
    <Button @click="handleDownload">
      下载
    </Button>
  </div>
</template>
