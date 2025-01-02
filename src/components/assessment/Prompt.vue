<script setup>
import ExpressionImage from '@/common/components/ExpressionImage.vue'
import { generateChoices } from '@/common/utils/numbers'
import { useAssessmentStore } from '@/stores/assessment.store'
import { promiseTimeout } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { computed, ref, useTemplateRef, watch, watchEffect } from 'vue'
import ProbableAnswer from './ProbableAnswer.vue'
import Question from './Question.vue'

const TIMEOUT = 1500

const { isImagesStripped: isRevealed } = defineProps({
  isImagesStripped: Boolean,
})

const assessmentStore = useAssessmentStore()
const { latestItem, goal, itemResult } = storeToRefs(assessmentStore)
const probableAnswerRef = useTemplateRef('probableAnswerRef')
const questionRef = useTemplateRef('questionRef')
const choices = ref([])
const expression = computed(() => `${latestItem.value} = ${goal.value}`)

function assess(answer) {
  assessmentStore.assess(answer)
}

function assessAnswer(answer) {
  assess(answer)
}

function assessChoice(choice) {
  const answer = (choice === 'right' ? choices.value.slice(-1) : choices.value)[0]

  assess(answer)
  highlightCorrectness(answer)
}

function highlightCorrectness(answer) {
  const isCorrect = goal.value === answer

  probableAnswerRef?.value?.highlightCorrectness(isCorrect)
  questionRef?.value?.highlightCorrectness(isCorrect)
  promiseTimeout(TIMEOUT).then(() => reset())
}

function reset() {
  probableAnswerRef?.value.reset()
  questionRef?.value?.reset()
}

function nextQuestion([latestItemNew, isCorrectNew], [latestItemOld]) {
  if (latestItemNew === latestItemOld && isCorrectNew) {
    promiseTimeout(TIMEOUT).then(() => assessmentStore.nextItem())
  }
}

watchEffect(() => {
  if (latestItem.value !== null) {
    assessmentStore.refreshCorrectAnswer()
  }

  if (goal.value !== null) {
    choices.value = generateChoices(goal.value)
  }
})
watch([latestItem, itemResult], nextQuestion)
</script>

<template>
  <div class="wrapper flex flex-col h-96">
    <probable-answer
      class="h-1/3 mb-3"
      :choices="choices"
      :correct="goal"
      @chosen="assessAnswer"
      ref="probableAnswerRef"
      :is-revealed="isRevealed"
    ></probable-answer>

    <question class="h-2/3" @chosen="assessChoice" ref="questionRef">
      <template #question>
        <expression-image :expression="latestItem" :is-revealed="isRevealed"></expression-image>
      </template>
      <template #answer>
        <expression-image :expression="expression" :is-revealed="isRevealed"></expression-image>
      </template>
    </question>
  </div>
</template>
