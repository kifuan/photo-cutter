<script setup lang="ts">
import { useStrategyStore, strategies } from '../stores/strategy'
import { useImageStore } from '../stores/image'
import { ref } from 'vue'

const imageStore = useImageStore()
const strategyStore = useStrategyStore()
const uploader = ref<HTMLInputElement | undefined>()
const scale = ref<number>(0)

function handleSelect() {
    uploader.value!.value = ''
    scale.value = 0
    imageStore.image = undefined
}

function handleClick() {
    uploader.value!.click()
}

function handleImage() {
    const files = uploader.value!.files
    if (files === null || files.length !== 1) {
        return
    }
    const file = files[0]
    
    const image = new Image()
    const reader = new FileReader()
    reader.onload = () => {
        image.src = reader.result as string
        image.onload = () => {
            scale.value = image.width / image.height
            imageStore.image = image
        }
    }
    reader.readAsDataURL(file)
}
</script>

<template>
    <h1>参数选择</h1>
    <div class="container">
        <div>
            <label>模式: </label>
            <select v-model="strategyStore.strategy" @change="handleSelect">
                <option
                    v-for="[name, strategy] in Object.entries(strategies)"
                    :key="name"
                    :value="name"
                >
                    {{strategy.label}}
                </option>
            </select>
        </div>
        <div>
            <label>图片: </label>
            <button @click="handleClick">选择图片</button>
        </div>
        <div>
            <label>实际宽高比: </label>
            <span>{{scale.toFixed(2)}}</span>
        </div>
    </div>
    <!-- Make no effects on this hidden element -->
    <input type="file" ref="uploader" accept="image/*" @change="handleImage">
</template>

<style scoped>
input[type="file"] {
    display: none;
}
</style>
