<script setup>
import { socket } from '@/socket'
import { useSocketConnectionStore } from '@/stores/socket-connection.store'
import { RouterLink, RouterView } from 'vue-router'
import { useAssessmentStore } from './stores/assessment.store'

socket.off()

const socketConnectionStore = useSocketConnectionStore()
const assessmentStore = useAssessmentStore()

socketConnectionStore.bindEvents()
assessmentStore.bindEvents()
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
