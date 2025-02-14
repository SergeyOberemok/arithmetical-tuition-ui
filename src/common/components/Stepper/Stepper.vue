<script setup>
import { makeIterator } from '@/common/utils/iterator'
import { computed, onMounted, ref, watch } from 'vue'
import StepperControls from './StepperControls.vue'
import StepsProgress from './StepsProgress.vue'

let iterator = null
const currentStep = ref()
const activeIndex = computed(() => steps.indexOf(currentStep.value))

const { steps } = defineProps({
  steps: {
    type: Array,
    default: [],
  },
})
const emit = defineEmits(['next', 'complete'])
defineExpose({
  currentStep,
  next: goNext,
})

onMounted(() => {
  initSteps(steps)
})

function initSteps(steps) {
  if (!steps.length) {
    return
  }

  iterator = makeIterator(steps)
  goNext()
}

function goNext() {
  const { value, done } = iterator.next()

  if (done) {
    emit('complete', done)
    reset()

    return
  }

  currentStep.value = value
  emit('next', currentStep.value)
}

function reset() {
  currentStep.value = null
}

watch(() => steps, initSteps)
</script>

<template>
  <div class="stepper-wrapper">
    <steps-progress class="mb-3" :active="activeIndex"></steps-progress>

    <div class="mb-3">
      <slot></slot>
    </div>

    <stepper-controls @prev="console.log('prev')" @next="goNext"></stepper-controls>
  </div>
</template>
