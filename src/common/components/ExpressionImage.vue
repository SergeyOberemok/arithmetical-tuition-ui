<script setup>
import { computed } from 'vue'
import NumberImage from './NumberImage.vue'
import { splitByNumbers } from '../utils/numbers'
import { isNumber } from 'lodash-es'

const { expression } = defineProps({
  expression: String,
})

const expressionParts = computed(() => splitByNumbers(expression))
</script>

<template>
  <div class="wrapper flex items-center">
    <template v-for="(part, index) in expressionParts" :key="`${part}_${index}`">
      <template v-if="isNumber(part)">
        <number-image :number="part"></number-image>
      </template>
      <div v-else>{{ part }}</div>
    </template>
  </div>
</template>
