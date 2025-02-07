<script setup>
import { computed, reactive, watch } from 'vue'
import Tile from './Tile.vue'

const model = defineModel({
  default: 0,
  type: Number,
})

const resultsDictionary = reactive(Object.fromEntries(Array.from(Array(10), (_, i) => [i, false])))
const count = computed(() => Object.values(resultsDictionary).filter(Boolean).length)

watch(count, () => (model.value = count.value))
</script>

<template>
  <div class="wrapper flex flex-col items-center">
    <template v-for="(value, key, index) in resultsDictionary" :key="index">
      <tile v-model="resultsDictionary[key]"></tile>
    </template>
  </div>
</template>
