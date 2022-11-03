<script setup lang="ts">
import { ref } from 'vue'

const zh = ref(false)
</script>

<template>
  <div class="space-y-4">
    <div class="flex flex-row space-x-3 items-end">
      <h1 class="text-3xl">
        Photo Cutter
      </h1>

      <span class="text-xl">v1.19.0</span>

      <a class="hidden md:block" href="https://github.com/kifuan/photo-cutter">
        <img src="https://img.shields.io/github/stars/kifuan/photo-cutter?style=social" alt="GitHub">
      </a>
    </div>

    <div class="space-y-2">
      <template v-if="zh">
        <p>下载时<span class="text-red-500">从上向下</span>依次下载，在QQ或其它App中编辑时也从前往后依次选中就没问题。</p>
        <p>实际宽高比可以与理想宽高比不同，我会把边缘部分裁掉，留下中间的部分。</p>
        <p>请<span class="text-red-500">不要在QQ或其它App中一次性全部选中</span>，可能会造成乱序。</p>
      </template>
      <template v-else>
        <p>Download the images from top to bottom.</p>
        <p>The extra part of your image will be cropped.</p>
        <p>Please <span class="text-red-500">do not select all images in one go</span> when posting them on your app. They may be unordered as a result.</p>
      </template>
      <p><a href="javascript:void(0)" class="underline decoration-sky-300 hover:decoration-sky-400 active:decoration-sky-500" @click="zh = !zh">{{ zh ? 'English Intro' : '中文说明' }}</a></p>
    </div>
  </div>
</template>
