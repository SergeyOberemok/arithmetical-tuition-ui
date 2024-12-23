<script setup>
import { useSocketConnectionStore } from '@/stores/socket-connection.store'
import { storeToRefs } from 'pinia'

const socketConnectionStore = useSocketConnectionStore()
const { isConnected } = storeToRefs(socketConnectionStore)
</script>

<template>
  <div class="wrapper">
    <p>State: {{ isConnected }}</p>
  </div>
</template>
