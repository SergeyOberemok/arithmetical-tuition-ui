<script setup>
import Summaries from '@/components/assessment/Summaries.vue'
import { computed, ref } from 'vue'

const results = computed(() =>
  Array.from(Array(5), () => ['2 + 2', 4, 4, !!Math.floor(Math.random() * 2)]),
)
const isStripped = ref(false)
</script>

<template>
  <div class="wrapper container mx-auto h-64 px-3">
    <button
      type="button"
      class="border border-gray-300 rounded-md shadow-sm px-2 mb-3"
      @click="isStripped = !isStripped"
    >
      Strip
    </button>
    <summaries :results="results" :is-images-stripped="isStripped"></summaries>
  </div>
</template>
