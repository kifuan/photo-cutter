<script setup lang="ts">
const emits = defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <button class="px-2 py-1 shadow rounded outline-none border-2 border-indigo-400 hover:border-indigo-500 active:border-indigo-600" @click="emits('click')">
    <slot />
  </button>
</template>
