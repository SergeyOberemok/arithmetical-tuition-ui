<script setup>
import ConnectionManager from '@/components/sockets/ConnectionManager.vue'
import ConnectionState from '@/components/sockets/ConnectionState.vue'
</script>

<template>
  <div class="wrapper">
    <h3 class="font-bold mb-1">Connection</h3>

    <div class="flex justify-between">
      <connection-state></connection-state>
      <connection-manager></connection-manager>
    </div>
  </div>
</template>
