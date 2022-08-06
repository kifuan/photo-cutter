<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, onMounted, onUpdated, watch } from 'vue'
import { useImageStore } from '../stores/image'
import { useStrategyStore, strategies } from '../stores/strategy'

const imageStore = useImageStore()
const strategyStore = useStrategyStore()
const strategy = computed(() => {
    return strategies[strategyStore.strategy]
})
const canvases = [] as HTMLCanvasElement[]

watch(storeToRefs(imageStore).image, image => {
    if (image === undefined) {
        return
    }
    let unit: number, cutOffsetX = 0, cutOffsetY = 0
    const scale = image.width / image.height
    if (scale > strategy.value.scale) {
        const idealWidth = image.height * strategy.value.scale
        unit = idealWidth * strategy.value.unit
        cutOffsetX = (image.width - idealWidth) / 2
    } else {
        const idealHeight = image.width / strategy.value.scale
        unit = image.width * strategy.value.unit
        cutOffsetY = (image.height - idealHeight) / 2
    }
    for (let i = 0; i < canvases.length; i++) {
        const { size, offset: [offsetX, offsetY] } = strategy.value.steps[i]
        const canvas = canvases[i]
        const ctx = canvas.getContext('2d')!
        canvas.width = canvas.height = size * unit
        ctx.drawImage(image, unit * offsetX + cutOffsetX, unit * offsetY + cutOffsetY, unit * size, unit * size, 0, 0, unit * size, unit * size)
    }
})
</script>

<template>
    <div>
        <template v-for="(step, index) in strategy.steps">
            <p>{{step.label}}</p>
            <canvas
                :ref="el => canvases[index] = el as HTMLCanvasElement"
            />
        </template>
    </div>
</template>

<style scoped>
div {
    display: flex;
    flex-direction: column;
}
</style>