import { socket } from '@/socket'
import { defineStore } from 'pinia'
import { computed, ref, shallowRef } from 'vue'

export const useAssessmentStore = defineStore('assessment', () => {
  const isStarted = ref(false)
  const items = ref([])
  const goal = ref(null)
  const itemResult = ref(false)
  const results = shallowRef([])
  const result = ref(false)
  const isStripped = ref(false)

  const latestItem = computed(() =>
    items.value.length ? items.value[items.value.length - 1] : null,
  )

  const isEnded = computed(() => !isStarted.value && results.value.length)

  function bindEvents() {
    socket.on(
      'end',
      (message) => (
        (isStarted.value = false),
        (result.value = message.result),
        (results.value = message.results)
      ),
    )
  }

  function start(quantity) {
    socket.emit('start', quantity, () => (isStarted.value = true))
    nextItem()
  }

  function nextItem() {
    socket.emit('question', {}, (message) => {
      itemResult.value = false

      !!message && items.value.push(message)
    })
  }

  function refreshCorrectAnswer() {
    socket.emit('objective', {}, (value) => (goal.value = value))
  }

  function assess(answer) {
    socket.emit('assess', answer, (target, answer, isCorrect) => (itemResult.value = isCorrect))
  }

  return {
    isStarted,
    isEnded,
    result,
    items,
    results,
    goal,
    latestItem,
    itemResult,
    isStripped,
    bindEvents,
    start,
    nextItem,
    refreshCorrectAnswer,
    assess,
  }
})
