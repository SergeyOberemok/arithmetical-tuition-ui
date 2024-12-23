<script setup>
import { useAssessmentStore } from '@/stores/assessment.store'
import { promiseTimeout } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import ProbableAnswer from './ProbableAnswer.vue'
import Question from './Question.vue'

const assessmentStore = useAssessmentStore()
const { latestItem, goal, result } = storeToRefs(assessmentStore)

function fetchCorrectAnswer() {
  assessmentStore.refreshCorrectAnswer()
}

function assess(answer) {
  assessmentStore.assess(answer)
}

function nextQuestion([latestItemNew, isCorrectNew], [latestItemOld]) {
  if (latestItemNew === latestItemOld && isCorrectNew) {
    promiseTimeout(1000).then(() => assessmentStore.nextItem())
  }
}

watch(latestItem, fetchCorrectAnswer)
watch([latestItem, result], nextQuestion)
</script>

<template>
  <div class="wrapper flex flex-col h-96">
    <probable-answer class="h-1/3 mb-3" :correct="goal" @chosen="assess"></probable-answer>
    <question class="h-2/3"></question>
  </div>
</template>
