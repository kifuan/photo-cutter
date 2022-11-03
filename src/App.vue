<script lang="ts" setup>
import IntroHeader from './components/IntroHeader.vue'
import PhotoSelector from './components/PhotoSelector.vue'
import PhotoResult from './components/PhotoResult.vue'
</script>

<template>
  <div class="space-y-8">
    <IntroHeader />
    <PhotoSelector />
    <PhotoResult />
    <footer>
      <a href="https://github.com/kifuan/photo-cutter" class="underline decoration-sky-300 hover:decoration-sky-400 active:decoration-sky-500">GitHub</a>
    </footer>
  </div>
</template>

<style>
body {
    padding: 3rem;
}
</style>
