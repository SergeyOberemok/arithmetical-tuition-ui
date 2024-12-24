<script setup>
import { storeToRefs } from 'pinia'

import { useAssessmentStore } from '@/stores/assessment.store'
import Prompt from './Prompt.vue'
import Results from './Results.vue'

const assessmentStore = useAssessmentStore()
const { isStarted, isEnded } = storeToRefs(assessmentStore)

function startAssessment() {
  assessmentStore.start()
  assessmentStore.nextItem()
}

function nextQuestion() {
  assessmentStore.nextItem()
}
</script>

<template>
  <div class="wrapper flex flex-col">
    <div class="flex mb-3">
      <button
        v-if="!isStarted"
        type="button"
        @click="startAssessment()"
        class="w-full border border-gray-300 rounded-md shadow-sm py-1"
      >
        Start
      </button>
      <button
        v-else
        type="button"
        @click="nextQuestion()"
        class="w-full border border-gray-300 rounded-md shadow-sm py-1"
      >
        Next
      </button>
    </div>

    <prompt v-if="isStarted" class="mb-3"></prompt>

    <results v-if="isEnded" class="mb-3"></results>
  </div>
</template>
