<script setup lang="ts">
import type { ComponentCard, ComponentStatus } from '~/types/component'
import BadgePill from '~/components/BadgePill.vue'

const props = defineProps<{
  card: ComponentCard
}>()

const emit = defineEmits<{
  (e: 'select', id: string): void
  (e: 'dragStart', payload: { id: string; status: ComponentStatus }): void
}>()

const onDragStart = (event: DragEvent) => {
  event.dataTransfer?.setData('text/plain', props.card.id)
  emit('dragStart', { id: props.card.id, status: props.card.status })
}
</script>

<template>
  <article
    class="card-base cursor-grab select-none bg-white p-4"
    draggable="true"
    @dragstart="onDragStart"
    @click="emit('select', card.id)"
  >
    <div class="flex items-start justify-between gap-3">
      <div>
        <p class="text-sm font-semibold text-slate-900">
          {{ card.name }}
        </p>
        <p class="text-xs text-slate-500">
          {{ card.category }}
        </p>
      </div>
      <span class="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
        {{ card.status }}
      </span>
    </div>

    <div class="mt-3 space-y-1 text-xs text-slate-600">
      <p class="line-clamp-1">
        Storybook: {{ card.storybookPath }}
      </p>
      <p class="line-clamp-1">
        File: {{ card.filePath }}
      </p>
    </div>

    <div v-if="card.areas.length" class="mt-4 flex flex-wrap gap-2">
      <BadgePill v-for="area in card.areas" :key="area" :area="area" />
    </div>
  </article>
</template>

