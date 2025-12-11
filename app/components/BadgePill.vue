<script setup lang="ts">
import type { ComponentArea } from '~/types/component'

const props = defineProps<{
  area: ComponentArea
}>()

const badgeTone: Record<ComponentArea, string> = {
  MOT: 'bg-amber-4 text-amber-12 border-amber-8',
  TCO: 'bg-green-4 text-green-12 border-green-8',
  beOne: 'bg-crimson-4 text-crimson-12 border-crimson-8',
  Jobs: 'bg-blue-4 text-blue-12 border-blue-8',
  Corporate: 'bg-base-3 text-base-12 border-base-7',
}
</script>

<template>
  <span class="border-base-6 pill border" :class="badgeTone[props.area]">
    {{ props.area }}
  </span>
</template>
