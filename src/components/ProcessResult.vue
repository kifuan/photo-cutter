<script setup lang="ts">
import { useImageStore } from '../stores/image'

import PhotoFragments from './PhotoFragments.vue'

const imageStore = useImageStore()
</script>

<template>
  <h1>处理结果</h1>
  <div v-show="imageStore.image === undefined">
    暂无数据
  </div>
  <div v-show="imageStore.image !== undefined">
    <PhotoFragments />
  </div>
</template>

<style scoped>
.canvases {
    display: flex;
    flex-direction: column;
}
</style>
