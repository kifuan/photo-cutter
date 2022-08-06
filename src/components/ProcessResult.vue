<script setup lang="ts">
import { useStrategyStore, strategies } from '../stores/strategy'
import { useImageStore } from '../stores/image'
import PhotoFragments from './PhotoFragments.vue'

const imageStore = useImageStore()
const strategyStore = useStrategyStore()
</script>

<template>
    <h1>处理结果</h1>
    <div v-if="imageStore.image === undefined">
        暂无数据
    </div>
    <div v-else>
        <photo-fragments
            :image="imageStore.image"
            :strategy="strategies[strategyStore.strategy]!"
        />
    </div>
</template>