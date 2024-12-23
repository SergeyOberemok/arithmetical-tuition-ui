<script setup>
import { generateRandomNear, pickRandom } from '@/common/utils/numbers'
import { promiseTimeout } from '@vueuse/core'
import { shuffle } from 'lodash-es'
import { ref, shallowRef, watch } from 'vue'

const { correct } = defineProps({
  correct: Number,
})
const emit = defineEmits(['chosen'])
const choises = shallowRef([])
const isCorrectChosen = ref(false)
const isWrongChosen = ref(false)

function randomizeChoices() {
  const random = pickRandom(generateRandomNear(correct).filter((i) => i != correct))

  choises.value = shuffle([
    [correct, 'border-2 border-green-300'],
    [random, 'border-2 border-red-300'],
  ])
}

function highlightCorrectness(isCorrect) {
  isCorrectChosen.value = isCorrect
  isWrongChosen.value = !isCorrect
  promiseTimeout(1000).then(() => ((isCorrectChosen.value = false), (isWrongChosen.value = false)))
}

function isCorrectnessHighlighted(doHighlight) {
  if (isWrongChosen.value) {
    return true
  }

  return doHighlight && isCorrectChosen.value
}

watch(() => correct, randomizeChoices)
</script>

<template>
  <div class="wrapper grid gap-3 grid-cols-2">
    <button
      v-for="([choice, highlightClass], index) in choises"
      :key="`${index}${choice}`"
      type="button"
      @click="emit('chosen', choice) || highlightCorrectness(choice === correct)"
      class="border border-gray-300 rounded-md shadow-sm"
      :class="{ [highlightClass]: isCorrectnessHighlighted(choice === correct) }"
    >
      {{ choice }}
    </button>
  </div>
</template>
