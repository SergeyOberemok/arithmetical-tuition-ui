<script setup>
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'

import { useAssessmentStore } from '@/stores/assessment.store'
import Controls from './Controls.vue'

const ASSESSMENT_QUANTITY = +import.meta.env.VITE_ASSESSMENT_QUANTITY || 5

const assessmentQuantity = ref(ASSESSMENT_QUANTITY)
const assessmentStore = useAssessmentStore()
const { isStripped } = storeToRefs(assessmentStore)

const routes = ['prompt', 'select', 'summary']

const router = useRouter()

function navigateToNextStep() {
  const name = routes[0]
  router.push({ name })
}
</script>

<template>
  <div class="wrapper flex flex-col">
    <h1 class="text-2xl font-bold mb-3">Assessment</h1>

    <controls
      class="mb-3"
      v-model="assessmentQuantity"
      @started="(assessmentStore.start(assessmentQuantity), navigateToNextStep())"
      @stripped="isStripped = $event"
    ></controls>

    <RouterView />
  </div>
</template>
