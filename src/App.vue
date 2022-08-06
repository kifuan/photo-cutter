<script lang="ts" setup>
import { onMounted } from 'vue'
import IntroHeader from './components/IntroHeader.vue'
import PhotoSelector from './components/PhotoSelector.vue'
import ProcessResult from './components/ProcessResult.vue'
import { dom } from './script'
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
.container {
    display: flex;
    flex-direction: column;
}

.container * {
    margin-bottom: 15px;
}

body {
    max-width: 1000px;
    padding: 20px;
}

footer {
    padding-top: 50px;
}
</style>