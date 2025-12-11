<script setup lang="ts">
import type { ComponentCard, ComponentStatus } from '~/types/component'
import { ref } from 'vue'
import BadgePill from '~/components/BadgePill.vue'

const props = defineProps<{
  card: ComponentCard
}>()

const emit = defineEmits<{
  (e: 'select', id: string): void
  (e: 'dragStart', payload: { id: string; status: ComponentStatus }): void
  (e: 'dragEnd', payload: { id: string; status: ComponentStatus }): void
}>()

const isDragging = ref(false)

function onDragStart(event: DragEvent) {
  event.dataTransfer?.setData('text/plain', props.card.id)
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    const target = event.currentTarget as HTMLElement | null
    if (target) {
      const offsetY = Math.min(24, target.clientHeight / 2)
      event.dataTransfer.setDragImage(target, target.clientWidth / 2, offsetY)
    }
  }
  isDragging.value = true
  emit('dragStart', { id: props.card.id, status: props.card.status })
}

function onDragEnd() {
  isDragging.value = false
  emit('dragEnd', { id: props.card.id, status: props.card.status })
}
</script>

<template>
  <article
    class="card-base w-full bg-pureWhite/15 cursor-grab select-none hover:bg-crimson-11 border border-solid border-pureWhite p-3 transition-colors"
    :class="isDragging ? 'bg-crimson-10 text-base-1' : 'bg-base-2'"
    draggable="true"
    @dragstart="onDragStart"
    @dragend="onDragEnd"
    @click="emit('select', card.id)"
  >
    <div class="flex items-start justify-between gap-3">
      <div>
        <p class="text-sm font-semibold text-base-12">
          {{ card.name }}
        </p>
        <p class="text-xs text-base-10">
          {{ card.category }}
        </p>
      </div>
      <span class="rounded-full bg-base-3 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-base-11">
        {{ card.status }}
      </span>
    </div>

    <div class="mt-3 space-y-1 text-xs text-base-10">
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
