import { socket } from '@/socket'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAssessmentStore = defineStore('assessment', () => {
  const isStarted = ref(false)
  const items = ref([])
  const goal = ref(null)
  const result = ref(false)

  const latestItem = computed(() =>
    items.value.length ? items.value[items.value.length - 1] : null,
  )

  function bindEvents() {
    socket.on('end', (message) => ((isStarted.value = false), console.log(message)))
  }

  function start() {
    socket.emit('start', {}, () => (isStarted.value = true))
  }

  function nextItem() {
    socket.emit('question', {}, (message) => {
      result.value = false

      !!message && items.value.push(message)
    })
  }

  function refreshCorrectAnswer() {
    socket.emit('objective', {}, (value) => (goal.value = value))
  }

  function assess(answer) {
    socket.emit('assess', answer, (target, answer, isCorrect) => (result.value = isCorrect))
  }

  return {
    isStarted,
    items,
    goal,
    result,
    latestItem,
    bindEvents,
    start,
    nextItem,
    refreshCorrectAnswer,
    assess,
  }
})
