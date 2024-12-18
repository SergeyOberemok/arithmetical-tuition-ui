<script setup>
import ConnectionManager from '@/components/sockets/ConnectionManager.vue'
import ConnectionState from '@/components/sockets/ConnectionState.vue'
</script>

<template>
  <main class="container mx-auto">
    <h1 class="text-3xl font-bold underline">This is home view</h1>

    <div class="flex justify-between">
      <connection-state></connection-state>
      <connection-manager></connection-manager>
    </div>
  </main>
</template>
