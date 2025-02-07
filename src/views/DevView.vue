<script setup>
import { ref, useTemplateRef } from 'vue'

import ProbableAnswer from '@/components/assessment/ProbableAnswer.vue'
import NumberImage from '@/common/components/NumberImage.vue'
import Prompt from '@/components/assessment/Prompt.vue'
import LeftRightSwipe from '@/common/components/LeftRightSwipe.vue'
import ExpressionImage from '@/common/components/ExpressionImage.vue'
import { templateRef } from '@vueuse/core'

const goal = ref(4)
const isRevealed = ref(false)
const isHighlighted = ref(false)
const isCorrect = ref(false)
const leftRightSwipeRef = useTemplateRef('left-right-swipe')

function assess(answer) {
  isCorrect.value = answer === goal.value
  isHighlighted.value = true

  console.log(answer)
}

function reset() {
  leftRightSwipeRef.value.reset()
}
</script>

<template>
  <div class="wrapper container mx-auto h-1/2">
    <!-- <probable-answer :correct="goal" @chosen="assess" class="mb-3" v-slot="slotProps">
      <number-image
        :number="slotProps.number"
        :is-revealed="isRevealed"
        class="h-full border border-gray-300 rounded-md shadow-sm bg-gray-50 flex justify-center items-center"
        :class="{
          'border-2 border-green-300 bg-green-50': isHighlighted && slotProps.number === goal,
          'border-2 border-red-300 bg-red-50':
            isHighlighted && !isCorrect && slotProps.number !== goal,
        }"
      ></number-image>
    </probable-answer> -->

    <!-- <left-right-swipe
      @moved="console.log($event)"
      class="h-48 border border-gray-300 rounded-md shadow-sm bg-gray-50 mb-3"
      :class="{
        'bg-green-50 border-green-300': isHighlighted && true,
        'bg-red-50 border-red-300': isHighlighted && false,
      }"
      ref="left-right-swipe"
    >
      <expression-image :expression="'2 + 2'" :is-revealed="isRevealed"></expression-image>
    </left-right-swipe> -->

    <prompt
      :question="'2 + 2'"
      :goal="goal"
      :is-highlighted="isHighlighted"
      :is-correct="isCorrect"
      @answered="assess"
      class="h-full mb-3"
    ></prompt>

    <div class="flex justify-between">
      <button
        @click="isHighlighted = !isHighlighted"
        type="button"
        class="border rounded-md shadow-sm px-2"
        :class="{ 'border-gray-300': !isHighlighted, 'border-green-300': isHighlighted }"
      >
        Is Highlighted
      </button>
      <button
        @click="isRevealed = !isRevealed"
        type="button"
        class="rounded-md shadow-sm px-2"
        :class="{ 'border border-gray-300': !isRevealed }"
      >
        Is Revealed
      </button>
      <button @click="reset" type="button" class="border border-gray-300 rounded-md shadow-sm px-2">
        Reset
      </button>
    </div>
  </div>
</template>
