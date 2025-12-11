<script setup lang="ts">
import { ref } from 'vue'
import type { ComponentCard, ComponentStatus } from '~/types/component'
import ComponentCardItem from '~/components/ComponentCard.vue'

const props = defineProps<{
  title: string
  status: ComponentStatus
  cards: ComponentCard[]
}>()

const emit = defineEmits<{
  (e: 'dropCard', payload: { id: string; status: ComponentStatus }): void
  (e: 'selectCard', id: string): void
}>()

const isOver = ref(false)

const onDragOver = (event: DragEvent) => {
  event.preventDefault()
}

const onDragEnter = (event: DragEvent) => {
  event.preventDefault()
  isOver.value = true
}

const onDragLeave = () => {
  isOver.value = false
}

const onDrop = (event: DragEvent) => {
  event.preventDefault()
  isOver.value = false
  const id = event.dataTransfer?.getData('text/plain')
  if (id) emit('dropCard', { id, status: props.status })
}
</script>

<template>
  <section
    class="column-surface flex h-full min-h-[440px] min-w-[360px] flex-col gap-3 p-4 transition ring-offset-2"
    :class="isOver ? 'ring-2 ring-indigo-400 bg-white' : ''"
    @dragover="onDragOver"
    @dragenter="onDragEnter"
    @dragleave="onDragLeave"
    @drop="onDrop"
  >
    <header class="flex items-center justify-between gap-2">
      <div>
        <h2 class="text-sm font-semibold text-slate-900">
          {{ title }}
        </h2>
        <p class="text-xs text-slate-500">
          {{ cards.length }} items
        </p>
      </div>
    </header>

    <div class="custom-scrollbar grid max-h-[70vh] auto-rows-min gap-3 overflow-y-auto">
      <ComponentCardItem
        v-for="card in cards"
        :key="card.id"
        :card="card"
        @select="emit('selectCard', $event)"
      />
    </div>
  </section>
</template>

