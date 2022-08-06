import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useImageStore = defineStore('image', () => {
  const image = ref<HTMLImageElement | undefined>()
  return { image }
})
