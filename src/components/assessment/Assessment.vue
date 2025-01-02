<script setup>
import { storeToRefs } from 'pinia'

import { useAssessmentStore } from '@/stores/assessment.store'
import { ref } from 'vue'
import Prompt from './Prompt.vue'
import Results from './Results.vue'

const assessmentStore = useAssessmentStore()
const { isStarted, isEnded } = storeToRefs(assessmentStore)
const isImagesStripped = ref(false)

function startAssessment() {
  assessmentStore.start()
  assessmentStore.nextItem()
}
</script>

<template>
  <div class="wrapper flex flex-col">
    <div class="flex mb-3">
      <template v-if="!isStarted">
        <button
          type="button"
          @click="startAssessment()"
          class="w-full border border-gray-300 rounded-md shadow-sm py-2"
        >
          Start
        </button>
      </template>

      <template v-else>
        <button
          type="button"
          @click="isImagesStripped = !isImagesStripped"
          class="w-full border border-gray-300 rounded-md shadow-sm py-2"
        >
          {{ isImagesStripped ? 'Show' : 'Strip' }}
        </button>
      </template>
    </div>

    <prompt v-if="isStarted" class="mb-3" :is-images-stripped="isImagesStripped"></prompt>

    <results v-if="isEnded" class="mb-3"></results>
  </div>
</template>
