<script setup>
import { useAssessmentStore } from '@/stores/assessment.store'
import { storeToRefs } from 'pinia'

const assessmentStore = useAssessmentStore()
const { latestItem } = storeToRefs(assessmentStore)
</script>

<template>
  <div class="wrapper">
    <div
      class="w-full h-full border border-gray-300 rounded-md shadow-sm cursor-pointer flex justify-center items-center"
    >
      {{ latestItem }}
    </div>
  </div>
</template>
