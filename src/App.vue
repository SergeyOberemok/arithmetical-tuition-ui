<script setup>
import { socket } from '@/socket'
import { useSocketConnectionStore } from '@/stores/socket-connection'
import { RouterLink, RouterView } from 'vue-router'

socket.off()

const socketConnectionStore = useSocketConnectionStore()

socketConnectionStore.bindEvents()
</script>

<template>
  <header class="container mx-auto">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>
