<script setup>
import { generateChoices } from '@/common/utils/numbers'
import { useAssessmentStore } from '@/stores/assessment.store'
import { promiseTimeout } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { ref, useTemplateRef, watch, watchEffect } from 'vue'
import ProbableAnswer from './ProbableAnswer.vue'
import Question from './Question.vue'

const assessmentStore = useAssessmentStore()
const { latestItem, goal, itemResult } = storeToRefs(assessmentStore)
const probableAnswerRef = useTemplateRef('probableAnswerRef')
const questionRef = useTemplateRef('questionRef')
const choices = ref([])

function assess(answer) {
  assessmentStore.assess(answer)
}

function assessAnswer(answer) {
  assess(answer)
}

function assessChoice(choice) {
  const answer = (choice === 'right' ? choices.value.slice(-1) : choices.value)[0]

  highlightCorrectness(answer)
  assess(answer)
}

function highlightCorrectness(answer) {
  const isCorrect = goal.value === answer

  probableAnswerRef?.value?.highlightCorrectness(isCorrect)
  questionRef?.value?.highlightCorrectness(isCorrect)
}

function nextQuestion([latestItemNew, isCorrectNew], [latestItemOld]) {
  if (latestItemNew === latestItemOld && isCorrectNew) {
    promiseTimeout(1000).then(() => assessmentStore.nextItem())
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
    ></probable-answer>

    <question class="h-2/3" :question="latestItem" @chosen="assessChoice" ref="questionRef">
      <span>{{ `${latestItem} = ${goal}` }}</span>
    </question>
  </div>
</template>
