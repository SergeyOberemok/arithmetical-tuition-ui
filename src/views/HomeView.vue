<script setup>
import Assessment from '@/components/assessment/Assessment.vue'
import ConnectionManager from '@/components/sockets/ConnectionManager.vue'
import ConnectionState from '@/components/sockets/ConnectionState.vue'
</script>

<template>
  <main class="container mx-auto px-3">
    <h1 class="text-3xl font-bold underline mb-3">This is home view</h1>

    <div class="flex justify-between mb-3">
      <connection-state></connection-state>
      <connection-manager></connection-manager>
    </div>

    <assessment></assessment>
  </main>
</template>
