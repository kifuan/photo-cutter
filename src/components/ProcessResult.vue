<script setup lang="ts">
import { useStrategyStore, strategies } from '../stores/strategy'
import { useImageStore } from '../stores/image'
import { drawImages } from '../util'
import { watch, ref } from 'vue'
import { storeToRefs } from 'pinia'

const imageStore = useImageStore()
const strategyStore = useStrategyStore()
const canvases = ref<HTMLDivElement|undefined>()

watch(storeToRefs(imageStore).image, value => {
    if (value === undefined) {
        return
    }
    drawImages(value, strategies[strategyStore.strategy], canvases.value!)
})
</script>

<template>
    <h1>处理结果</h1>
    <div v-show="imageStore.image === undefined">
        暂无数据
    </div>
    <div v-show="imageStore.image !== undefined">
        <div ref="canvases" class="canvases"/>
    </div>
</template>

<style scoped>
.canvases {
    display: flex;
    flex-direction: column;
}
</style>