<script setup>
import { storeToRefs } from 'pinia'

import Summary from '@/components/assessment/Summary.vue'
import { useAssessmentStore } from '@/stores/assessment.store'

const assessmentStore = useAssessmentStore()
const { results } = storeToRefs(assessmentStore)
</script>

<template>
  <div class="wrapper">
    <Summary :results="results" :is-images-stripped="isImagesStripped"></Summary>
  </div>
</template>
