<script setup lang="ts">
import type { ComponentCard, ComponentStatus } from '~/types/component'
import BadgePill from '~/components/BadgePill.vue'

const props = defineProps<{
  card: ComponentCard
}>()

const emit = defineEmits<{
  (e: 'select', id: string): void
  (e: 'dragStart', payload: { id: string, status: ComponentStatus }): void
}>()

function onDragStart(event: DragEvent) {
  event.dataTransfer?.setData('text/plain', props.card.id)
  emit('dragStart', { id: props.card.id, status: props.card.status })
}
</script>

<template>
  <article
    class="bg-base-1 border-base-6 cursor-grab select-none border card-base p-4"
    draggable="true"
    @dragstart="onDragStart"
    @click="emit('select', card.id)"
  >
    <div class="flex items-start justify-between gap-3">
      <div>
        <p class="text-base-12 text-sm font-semibold">
          {{ card.name }}
        </p>
        <p class="text-base-9 text-xs">
          {{ card.category }}
        </p>
      </div>
      <span class="bg-base-3 text-base-11 rounded-full px-2 py-1 text-[11px] font-semibold tracking-wide uppercase">
        {{ card.status }}
      </span>
    </div>

    <div class="text-base-10 mt-3 text-xs space-y-1">
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
