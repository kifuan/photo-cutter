<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useImageStore } from '../stores/image'
import { useStrategyStore } from '../stores/strategy'
import PhotoFragment from './PhotoFragment.vue'

const { strategy } = storeToRefs(useStrategyStore())
const { image } = storeToRefs(useImageStore())
</script>

<template>
  <div class="space-y-4">
    <h1 class="text-3xl">
      Result
    </h1>
    <PhotoFragment
      v-for="(step, index) in strategy.steps"
      :key="step.label + index"
      :index="index"
    />
    <div v-show="image === undefined" class="text-slate-500 font-medium">
      No data yet.
    </div>
  </div>
</template>
