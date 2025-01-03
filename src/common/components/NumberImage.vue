<script setup>
import { computed } from 'vue'
import DigitImage from './DigitImage.vue'
import { toDigits } from '../utils/numbers'

const { number, isRevealed } = defineProps({
  number: Number,
  isRevealed: Boolean,
})
const digits = computed(() => toDigits(number))
</script>

<template>
  <div class="wrapper flex">
    <template v-for="(digit, index) in digits" :key="`${digit}_${index}`">
      <template v-if="!isRevealed">
        <digit-image :digit="digit"></digit-image>
      </template>
      <div v-else>{{ digit }}</div>
    </template>
  </div>
</template>
