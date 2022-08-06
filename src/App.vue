<script lang="ts" setup>
import IntroHeader from './components/IntroHeader.vue'
import PhotoSelector from './components/PhotoSelector.vue'
import ProcessResult from './components/ProcessResult.vue'
</script>

<template>
    <intro-header/>
    <photo-selector/>
    <process-result/>
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