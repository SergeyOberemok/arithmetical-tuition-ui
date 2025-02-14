<script setup>
const emit = defineEmits(['prev', 'next'])
</script>

<template>
  <div class="stepper-controls-wrapper flex justify-between">
    <button
      @click="emit('prev')"
      type="button"
      class="border border-gray-300 rounded-md shadow-sm px-3 py-1"
    >
      Previous
    </button>
    <button
      @click="emit('next')"
      type="button"
      class="border border-gray-300 rounded-md shadow-sm px-3 py-1"
    >
      Next
    </button>
  </div>
</template>
