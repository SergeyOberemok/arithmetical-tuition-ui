<script setup>
const { digit } = defineProps({
  digit: Number,
})
</script>

<template>
  <div class="wrapper">
    <img :src="`/${digit}.jpg`" :alt="digit" class="pointer-events-none" />
  </div>
</template>
