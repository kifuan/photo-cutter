import { defineStore, storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import type { CalculatedStrategyData } from './strategy'
import { useStrategyStore } from './strategy'

export const useImageStore = defineStore('image', () => {
  const image = ref<HTMLImageElement>()
  const { strategy } = storeToRefs(useStrategyStore())

  function setImage(img: HTMLImageElement) {
    image.value = img
  }

  function clearImage() {
    image.value = undefined
  }

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

  return { image, setImage, clearImage, calculatedData }
})
