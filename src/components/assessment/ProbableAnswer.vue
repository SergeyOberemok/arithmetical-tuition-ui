<script setup>
import { ref, watch } from 'vue'

import { generateChoices } from '@/common/utils/numbers'

const choices = ref([])
const isCorrectChosen = ref(false)

const { correct } = defineProps({
  correct: {
    type: Number,
    required: true,
  },
})
const emit = defineEmits(['chosen'])
defineExpose({ choices, reset })

function reset() {
  isCorrectChosen.value = false
}

watch(
  () => correct,
  (goal) => (choices.value = generateChoices(goal)),
  { immediate: true },
)
</script>

<template>
  <div class="wrapper grid gap-3 grid-cols-2 h-48 min-h-48">
    <button
      v-for="(choice, index) in choices"
      :key="`${index}${choice}`"
      @click="((isCorrectChosen = choice === correct), emit('chosen', choice))"
      class="w-full h-full"
      type="button"
    >
      <slot :number="choice"></slot>
    </button>
  </div>
</template>
