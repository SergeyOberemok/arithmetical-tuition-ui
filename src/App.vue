<script setup>
import { socket } from '@/socket'
import { useSocketConnectionStore } from '@/stores/socket-connection.store'
import { RouterLink, RouterView } from 'vue-router'
import { useAssessmentStore } from './stores/assessment.store'
import { computed } from 'vue'

socket.off()

const isDevelopment = computed(() => process.env.NODE_ENV === 'development')
const socketConnectionStore = useSocketConnectionStore()
const assessmentStore = useAssessmentStore()

socketConnectionStore.bindEvents()
assessmentStore.bindEvents()
</script>

<template>
  <header class="container mx-auto mb-3 px-3">
    <nav>
      <RouterLink to="/" class="me-3">Home</RouterLink>
      <RouterLink to="/about" class="me-3">About</RouterLink>
      <RouterLink to="/dev" class="me-3" v-if="isDevelopment">Dev</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>
