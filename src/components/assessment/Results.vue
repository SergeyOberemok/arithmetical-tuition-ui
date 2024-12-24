<script setup>
import { useAssessmentStore } from '@/stores/assessment.store'
import { storeToRefs } from 'pinia'

const assessmentStore = useAssessmentStore()
const { results } = storeToRefs(assessmentStore)
</script>

<template>
  <div class="wrapper">
    <table class="table-auto w-full">
      <thead>
        <tr class="text-left">
          <th>Question</th>
          <th>Goal</th>
          <th>Answer</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="([question, goal, answer, result], i) in results" :key="`${question}${i}`">
          <td>{{ question }}</td>
          <td>{{ goal }}</td>
          <td>{{ answer }}</td>
          <td>{{ result }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
