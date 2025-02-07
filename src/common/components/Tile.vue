<script setup>
import { useMousePressed } from '@vueuse/core'

const isActive = defineModel({
  default: false,
  type: Boolean,
})
const { pressed } = useMousePressed({ target: window })

function toggleActive() {
  isActive.value = !isActive.value
}
</script>

<template>
  <div
    class="wrapper inline-block shadow-gray-400/75"
    :class="{ 'shadow-sm': isActive, 'shadow-xs': !isActive }"
    @click="toggleActive"
    @mouseenter="pressed && toggleActive()"
  >
    <div
      class="tile w-12 h-12 border-2 border-double border-zinc-200 inset-shadow-sm"
      :class="{
        'bg-slate-50 inset-shadow-gray-500': !isActive,
        'bg-teal-100/25 inset-shadow-green-950/65': isActive,
      }"
    ></div>
  </div>
</template>
