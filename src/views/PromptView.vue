<script setup>
import { promiseTimeout } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

import Prompt from '@/components/assessment/Prompt.vue'
import { useAssessmentStore } from '@/stores/assessment.store'

const TIMEOUT = 1500

const assessmentStore = useAssessmentStore()
const { latestItem, goal, itemResult } = storeToRefs(assessmentStore)
const isHighlighted = ref(false)
const isCorrect = ref(false)

const isImagesStripped = ref(false)

function assess(answer) {
  assessmentStore.assess(answer)

  promiseTimeout(TIMEOUT).then(() => (isHighlighted.value = false))
}

// function nextQuestion([latestItemNew, isCorrectNew], [latestItemOld]) {
//   if (latestItemNew === latestItemOld && isCorrectNew) {
//     promiseTimeout(TIMEOUT).then(() => assessmentStore.nextItem())
//   }
// }

// watchEffect(() => {
//   if (latestItem.value !== null) {
//     assessmentStore.refreshCorrectAnswer()
//   }
// })
// watch([latestItem, itemResult], nextQuestion)
</script>

<template>
  <div class="wrapper container mx-auto h-1/2">
    <prompt
      :question="latestItem"
      :goal="goal"
      :is-images-stripped="isImagesStripped"
      :is-highlighted="isHighlighted"
      :is-correct="isCorrect"
      @answered="assess"
    ></prompt>
  </div>
</template>
