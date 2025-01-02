<script setup>
import { computed } from 'vue'
import DigitImage from './DigitImage.vue'
import { toDigits } from '../utils/numbers'

const { number } = defineProps({
  number: Number,
})
const digits = computed(() => toDigits(number))
</script>

<template>
  <div class="wrapper flex">
    <template v-for="(digit, index) in digits" :key="`${digit}_${index}`">
      <digit-image :digit="digit"></digit-image>
    </template>
  </div>
</template>
