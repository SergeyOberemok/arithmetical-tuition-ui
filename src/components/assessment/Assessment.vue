<script setup>
import { storeToRefs } from 'pinia'

import QuantitySelect from '@/common/components/QuantitySelect.vue'
import { useAssessmentStore } from '@/stores/assessment.store'
import { ref } from 'vue'
import Prompt from './Prompt.vue'
import Summaries from './Summaries.vue'

const ASSESSMENT_QUANTITY = +import.meta.env.VITE_ASSESSMENT_QUANTITY || 5

const assessmentQuantity = ref(ASSESSMENT_QUANTITY)
const assessmentStore = useAssessmentStore()
const { isStarted, isEnded, results } = storeToRefs(assessmentStore)
const isImagesStripped = ref(false)

function startAssessment() {
  assessmentStore.start(assessmentQuantity.value)
  assessmentStore.nextItem()
}
</script>

<template>
  <div class="wrapper flex flex-col">
    <div class="flex mb-3 justify-between">
      <template v-if="!isStarted">
        <button
          type="button"
          @click="startAssessment()"
          class="border border-gray-300 rounded-md shadow-sm px-2 py-1 me-3"
        >
          Start
        </button>

        <quantity-select v-model="assessmentQuantity"></quantity-select>
      </template>

      <template v-if="isStarted || isEnded">
        <button
          type="button"
          @click="isImagesStripped = !isImagesStripped"
          class="border border-gray-300 rounded-md shadow-sm px-2 py-1"
        >
          {{ isImagesStripped ? 'Show' : 'Strip' }}
        </button>
      </template>
    </div>

    <prompt v-if="isStarted" class="mb-3" :is-images-stripped="isImagesStripped"></prompt>

    <summaries
      v-if="isEnded"
      :results="results"
      :is-images-stripped="isImagesStripped"
      class="mb-3"
    ></summaries>
  </div>
</template>
