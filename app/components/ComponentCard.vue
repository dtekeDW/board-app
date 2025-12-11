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
    class="card-base w-full max-w-full overflow-hidden cursor-grab select-none border border-base-6 bg-base-2 p-1.5 transition-colors hover:bg-crimson-11 break-words"
    :class="isDragging ? 'bg-crimson-10 text-base-1' : 'bg-base-2'"
    draggable="true"
    @dragstart="onDragStart"
    @dragend="onDragEnd"
    @click="emit('select', card.id)"
  >
    <div class="flex items-start justify-between gap-1.5">
      <div class="min-w-0">
        <p class="text-[13px] font-semibold leading-tight text-base-12 break-words">
          {{ card.name }}
        </p>
        <p class="text-[10px] leading-snug text-base-10 truncate">
          {{ card.category }}
        </p>
      </div>
      <span class="shrink-0 rounded-full bg-base-3 px-1.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-wide text-base-11">
        {{ card.status }}
      </span>
    </div>

    <div class="mt-1 text-[10.5px] leading-snug text-base-10 whitespace-normal">
      <p class="break-words">
        Storybook: {{ card.storybookPath }}
      </p>
    </div>

    <div v-if="card.areas.length" class="mt-2 flex flex-wrap gap-1">
      <BadgePill v-for="area in card.areas" :key="area" :area="area" />
    </div>
  </article>
</template>
