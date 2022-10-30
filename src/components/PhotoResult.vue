<script lang="ts" setup>
import { computed } from '@vue/reactivity'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import type { CalculatedStrategyData } from '../stores/strategy'
import { useStrategyStore } from '../stores/strategy'
import PhotoFragment from './PhotoFragment.vue'

const { strategy } = storeToRefs(useStrategyStore())
const image = ref<HTMLImageElement>()

const calculatedData = computed<CalculatedStrategyData>(() => {
  const img = image.value
  const st = strategy.value
  if (img === undefined || st === undefined)
    return { unit: 0, cutOffset: [0, 0] }

  const scale = img.width / img.height
  if (scale > st.scale) {
    // The width is more than expected, use height * scale to calculate ideal width.
    const idealWidth = img.height * st.scale
    const unit = idealWidth * st.unit
    const cutOffsetX = (img.width - idealWidth) / 2
    return { unit, cutOffset: [cutOffsetX, 0] }
  }
  else {
    // The height is more than expected, use width / scale to calculate ideal height.
    const idealHeight = img.width / st.scale
    const unit = img.width * st.unit
    const cutOffsetY = (img.height - idealHeight) / 2
    return { unit, cutOffset: [0, cutOffsetY] }
  }
})

defineExpose<{ setImage(image: HTMLImageElement): void; clearImage(): void }>({
  setImage: img => image.value = img,
  clearImage: () => image.value = undefined,
})
</script>

<template>
  <div class="space-y-4">
    <h1 class="text-3xl">
      处理结果
    </h1>
    <div v-if="image !== undefined" class="canvases">
      <PhotoFragment
        v-for="(step, index) in strategy.steps"
        :key="index"
        :calculated-data="calculatedData"
        :step="step"
        :image="image"
      />
    </div>
    <div v-else class="text-slate-500 font-medium">
      暂无数据
    </div>
  </div>
</template>
