<script setup>
import { ref, useTemplateRef, watchEffect } from 'vue'
import ProbableAnswer from '@/components/assessment/ProbableAnswer.vue'

const isHighlighted = ref(false)
const choices = ref(getArr12())
const probableAnswerRef = useTemplateRef('probableAnswerRef')

function assess(message) {
  console.log(message)
}

function refresh() {
  choices.value = getArr12()
}

function getArr12() {
  return Array.from(Array(2), (_, i) => i)
}

watchEffect(() => probableAnswerRef?.value?.highlightCorrectness(isHighlighted.value))
</script>

<template>
  <div class="wrapper container mx-auto h-64">
    <div class="flex mb-3">
      <button
        type="button"
        @click="isHighlighted = !isHighlighted"
        class="border border-gray-300 px-2 rounded-md shadow-sm me-2"
      >
        Toggle highlight
      </button>
      <button
        type="button"
        @click="refresh"
        class="border border-gray-300 px-2 rounded-md shadow-sm me-2"
      >
        Refresh
      </button>
    </div>

    <probable-answer
      :choices="choices"
      :correct="choices[0]"
      ref="probableAnswerRef"
    ></probable-answer>
  </div>
</template>
