<script setup>
import { computed, ref } from 'vue'

import NumberImage from '@/common/components/NumberImage.vue'

const { correct, choices } = defineProps({
  choices: Array,
  correct: Number,
})
const emit = defineEmits(['chosen'])
defineExpose({ highlightCorrectness, reset })

const isCorrectChosen = ref(false)
const isWrongChosen = ref(false)
const isCorrectHighlighted = computed(() => isCorrectChosen.value || isWrongChosen.value)

function highlightCorrectness(isCorrect) {
  isCorrectChosen.value = isCorrect
  isWrongChosen.value = !isCorrect
}

function reset() {
  isCorrectChosen.value = false
  isWrongChosen.value = false
}
</script>

<template>
  <div class="wrapper grid gap-3 grid-cols-2">
    <button
      v-for="(choice, index) in choices"
      :key="`${index}${choice}`"
      type="button"
      @click="emit('chosen', choice) || highlightCorrectness(choice === correct)"
      class="border border-gray-300 rounded-md shadow-sm bg-gray-50 flex justify-center"
      :class="{
        'border-2 border-green-300 bg-green-50': isCorrectHighlighted && choice === correct,
        'border-2 border-red-300 bg-red-50': isWrongChosen && choice !== correct,
      }"
    >
      <number-image :number="choice"></number-image>
    </button>
  </div>
</template>
