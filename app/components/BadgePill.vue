<script setup lang="ts">
import type { ComponentArea } from '~/types/component'

const props = defineProps<{
  area: ComponentArea
}>()

const badgeTone: Record<ComponentArea, string> = {
  MOT: 'bg-blue-100 text-blue-700 border-blue-200',
  TCO: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  beOne: 'bg-amber-100 text-amber-800 border-amber-200',
  Jobs: 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200',
  Corporate: 'bg-slate-100 text-slate-700 border-slate-200'
}
</script>

<template>
  <span class="pill border" :class="badgeTone[props.area]">
    {{ props.area }}
  </span>
</template>

