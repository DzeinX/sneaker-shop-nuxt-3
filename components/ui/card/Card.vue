<script setup lang="ts">
import type {HTMLAttributes} from 'vue'
import {cn} from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
      :class="
      cn(
        'rounded-xl border border-black bg-card text-card-foreground shadow-sm ' +
         'bg-[#F3F1F4]',
        props.class,
      )
    "
  >
    <slot/>
  </div>
</template>

<style scoped>

</style>
