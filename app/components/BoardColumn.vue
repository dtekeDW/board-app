<script setup lang="ts">
import type { ComponentCard, ComponentStatus } from '~/types/component'
import { ref } from 'vue'
import ComponentCardItem from '~/components/ComponentCard.vue'

const props = defineProps<{
  title: string
  status: ComponentStatus
  cards: ComponentCard[]
}>()

const emit = defineEmits<{
  (e: 'dropCard', payload: { id: string, status: ComponentStatus }): void
  (e: 'selectCard', id: string): void
}>()

const isOver = ref(false)

function onDragOver(event: DragEvent) {
  event.preventDefault()
}

function onDragEnter(event: DragEvent) {
  event.preventDefault()
  isOver.value = true
}

function onDragLeave() {
  isOver.value = false
}

function onDrop(event: DragEvent) {
  event.preventDefault()
  isOver.value = false
  const id = event.dataTransfer?.getData('text/plain')
  if (id)
    emit('dropCard', { id, status: props.status })
}
</script>

<template>
  <section
    class="h-full min-h-[440px] min-w-[360px] flex flex-col gap-3 column-surface p-4 ring-offset-2 transition"
    :class="isOver ? 'ring-2 ring-primary-9 bg-base-1 shadow-md' : ''"
    @dragover="onDragOver"
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
    @drop="onDrop"
  >
    <header class="flex items-center justify-between gap-2">
      <div>
        <h2 class="text-base-12 text-sm font-semibold">
          {{ title }}
        </h2>
        <p class="text-base-10 text-xs">
          {{ cards.length }} items
        </p>
      </div>
    </header>

    <div class="custom-scrollbar grid auto-rows-min max-h-[70vh] gap-3 overflow-y-auto">
      <ComponentCardItem
        v-for="card in cards"
        :key="card.id"
        :card="card"
        @select="emit('selectCard', $event)"
      />
    </div>
  </section>
</template>
