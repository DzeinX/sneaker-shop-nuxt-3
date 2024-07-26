<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import { useCarousel } from './useCarousel'
import type { WithClassAsProps } from './interface'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const props = defineProps<WithClassAsProps>()

const { orientation, canScrollPrev, scrollPrev } = useCarousel()
</script>

<template>
  <Button
    :disabled="!canScrollPrev"
    :class="cn(
      'touch-manipulation !pointer-events-auto absolute h-8 w-8 rounded-full p-0 bg-[#F3F1F4] disabled:cursor-not-allowed disabled:-translate-x-0 opacity-50 hover:-translate-x-0.5 transition-transform border-black',
      orientation === 'horizontal'
        ? 'left-1 top-1/2 -translate-y-1/2'
        : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
      props.class,
    )"
    variant="outline"
    @click="scrollPrev"
  >
    <slot>
      <ArrowLeft class="h-6 w-6 text-black" />
      <span class="sr-only">Previous Slide</span>
    </slot>
  </Button>
</template>
