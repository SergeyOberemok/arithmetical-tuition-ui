<script setup>
import Stepper from '@/common/components/Stepper/Stepper.vue'
import Steps from '@/common/components/Stepper/Steps.vue'
</script>

<template>
  <div class="wrapper container mx-auto h-1/2">
    <stepper :steps="['first', 'second', 'third']">
      <steps>
        <template #first>1</template>

        <template v-slot:second>2</template>

        <template #third>3</template>
      </steps>
    </stepper>
  </div>
</template>
