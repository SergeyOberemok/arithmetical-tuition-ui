<script setup>
import { ref } from 'vue'

import QuantitySelect from '@/common/components/QuantitySelect.vue'

const quantity = defineModel({
  type: Number,
})
const emit = defineEmits(['started', 'stripped'])

const isImagesStripped = ref(false)
</script>

<template>
  <div class="controls-wrapper flex justify-between">
    <button
      type="button"
      @click="emit('started')"
      class="w-18 border border-gray-300 rounded-md shadow-sm px-2 py-1 me-3"
    >
      Start
    </button>

    <button
      type="button"
      @click="((isImagesStripped = !isImagesStripped), emit('stripped', isImagesStripped))"
      class="w-18 border border-gray-300 rounded-md shadow-sm px-2 py-1"
    >
      {{ isImagesStripped ? 'Hinder' : 'Strip' }}
    </button>

    <quantity-select v-model="quantity" class="w-18"></quantity-select>
  </div>
</template>
