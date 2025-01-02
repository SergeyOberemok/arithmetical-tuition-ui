<script setup>
import { ref } from 'vue'

import ExpressionImage from '@/common/components/ExpressionImage.vue'
import ProbableAnswer from '@/components/assessment/ProbableAnswer.vue'
import Question from '@/components/assessment/Question.vue'

const isRevealed = ref(false)
</script>

<template>
  <div class="wrapper container mx-auto h-64 px-3">
    <button
      type="button"
      @click="isRevealed = !isRevealed"
      class="border border-gray-300 rounded-md shadow-sm mb-3 px-2"
    >
      Reveal
    </button>

    <probable-answer
      :choices="[1, 2]"
      :correct="1"
      :is-revealed="isRevealed"
      class="mb-3"
    ></probable-answer>

    <question class="h-2/3">
      <template #question>
        <expression-image expression="2 x 2" :is-revealed="isRevealed"></expression-image>
      </template>
      <template #answer>
        <expression-image expression="2 x 2 = 5" :is-revealed="isRevealed"></expression-image>
      </template>
    </question>
  </div>
</template>
