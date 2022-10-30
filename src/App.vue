<script lang="ts" setup>
import { ref } from 'vue'
import IntroHeader from './components/IntroHeader.vue'
import PhotoSelector from './components/PhotoSelector.vue'
import PhotoResult from './components/PhotoResult.vue'

const result = ref()
</script>

<template>
  <IntroHeader />
  <PhotoSelector @select="result?.setImage" @clear="result?.clearImage" />
  <PhotoResult ref="result" />
  <footer>
    <a href="https://github.com/kifuan/photo-cutter" target="_blank">Github仓库</a>
  </footer>
</template>

<style>
body {
    padding: 20px;
}

footer {
    padding-top: 50px;
}
</style>
