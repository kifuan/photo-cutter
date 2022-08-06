<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Strategy } from '../stores/strategy'

const { image, strategy } = defineProps<{
    image: HTMLImageElement,
    strategy: Strategy
}>()

const container = ref<HTMLDivElement | undefined>()

onMounted(() => {
    // Cut the edges of the image off.
    let unit: number, cutOffsetX = 0, cutOffsetY = 0
    const scale = image.width / image.height
    if (scale > strategy.scale) {
        const idealWidth = image.height * strategy.scale
        unit = idealWidth * strategy.unit
        cutOffsetX = (image.width - idealWidth) / 2
    } else {
        const idealHeight = image.width / strategy.scale
        unit = image.width * strategy.unit
        cutOffsetY = (image.height - idealHeight) / 2
    }
    console.log(strategy, unit)
    for (const { label, size, offset: [offsetX, offsetY] } of strategy.steps) {
        const canvas = document.createElement('canvas')
        canvas.width = size * unit
        canvas.height = size * unit
        const labelEl = document.createElement('p')
        labelEl.innerText = label
        const download = document.createElement('button')
        download.innerText = '下载'
        download.onclick = () => {
            const a = document.createElement('a')
            a.download = Math.random().toString(36).substring(2)
            a.href = canvas.toDataURL()
            a.click()
        }
        const ctx = canvas.getContext('2d')!
        ctx.drawImage(image, unit * offsetX + cutOffsetX, unit * offsetY + cutOffsetY, unit * size, unit * size, 0, 0, unit * size, unit * size)

        container.value!.append(labelEl, canvas, download)
    }
})
</script>

<template>
    <div ref="container"/>
</template>

<style scoped>
div {
    display: flex;
    flex-direction: column;
}

div > * {
    margin-bottom: 15px;
}
</style>