<script setup>
import { usePointerSwipe } from '@vueuse/core'
import { computed, ref } from 'vue'

const emit = defineEmits(['chosen'])
defineExpose({ highlightCorrectness, reset })

const isHighlighted = ref(false)
const isCorrectHighlighted = ref(false)
const container = ref(null)
const containerWidth = computed(() => container.value?.offsetWidth)
const target = ref(null)
const left = ref('0')
const opacity = ref(1)
const {
  direction,
  isSwiping,
  distanceX: lengthX,
} = usePointerSwipe(target, {
  onSwipe() {
    if (!containerWidth.value) {
      return
    }

    const length = lengthX.value * -1
    left.value = `${length}px`
    opacity.value = 1.1 - Math.abs(length) / containerWidth.value
  },
  onSwipeEnd() {
    if (containerWidth.value && Math.abs(lengthX.value) / containerWidth.value >= 0.4) {
      left.value = `${(lengthX.value / lengthX.value) * 100}%`
      opacity.value = 0

      emit('chosen', direction.value)
    } else {
      reset()
    }
  },
})

function highlightCorrectness(isCorrect) {
  isHighlighted.value = true
  isCorrectHighlighted.value = isCorrect
}

function reset() {
  left.value = '0'
  opacity.value = 1
  isHighlighted.value = false
}
</script>

<template>
  <div class="wrapper">
    <div
      class="w-full h-full relative overflow-hidden select-none border border-gray-300 rounded-md shadow-sm cursor-pointer flex justify-center items-center"
      ref="container"
      :class="{
        'bg-green-50 border-green-300': isHighlighted && isCorrectHighlighted,
        'bg-red-50 border-red-300': isHighlighted && !isCorrectHighlighted,
      }"
    >
      <div v-if="isHighlighted">
        <slot name="answer"></slot>
      </div>
      <div
        class="w-full h-full flex justify-center items-center absolute top-0 left-0 bg-gray-50"
        ref="target"
        :class="{ 'transition-all duration-200 ease-linear': isSwiping }"
        :style="{ left, opacity }"
      >
        <slot name="question"></slot>
      </div>
    </div>
  </div>
</template>
