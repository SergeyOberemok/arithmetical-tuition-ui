<script setup>
import { storeToRefs } from 'pinia'

import Summaries from '@/components/assessment/Summaries.vue'
import { useAssessmentStore } from '@/stores/assessment.store'

const assessmentStore = useAssessmentStore()
const { results } = storeToRefs(assessmentStore)
</script>

<template>
  <div class="wrapper">
    <summaries :results="results" :is-images-stripped="isImagesStripped"></summaries>
  </div>
</template>
