<script setup lang="ts">
const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <button class="px-2 py-1 shadow transition duration-300 rounded outline-none border-2 border-indigo-400 hover:bg-indigo-500 hover:text-white" @click="emit('click')">
    <slot />
  </button>
</template>
