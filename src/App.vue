<script setup>
import { socket } from '@/socket'
import { useSocketConnectionStore } from '@/stores/socket-connection.store'
import { computed } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

socket.off()

const isDevelopment = computed(() => process.env.NODE_ENV === 'development')
const socketConnectionStore = useSocketConnectionStore()

socketConnectionStore.bindEvents()
</script>

<template>
  <header class="container mx-auto px-3 mb-3">
    <nav>
      <RouterLink to="/" class="me-3">Home</RouterLink>
      <RouterLink to="/about" class="me-3">About</RouterLink>
      <RouterLink to="/dev" class="me-3" v-if="isDevelopment">Dev</RouterLink>
    </nav>
  </header>

  <main class="container mx-auto px-3">
    <RouterView />
  </main>
</template>
