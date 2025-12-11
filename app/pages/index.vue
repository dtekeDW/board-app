<script setup lang="ts">
import { computed, ref } from 'vue'
import BoardColumn from '~/components/BoardColumn.vue'
import CardDetailDrawer from '~/components/CardDetailDrawer.vue'
import SprintHeader from '~/components/SprintHeader.vue'
import { useComponentBoard } from '~/composables/useComponentBoard'
import type { ComponentStatus } from '~/types/component'

const { sprint, sprintOptions, columns, moveCard, updateAreas, selectedCard, selectCard } = useComponentBoard()
const dragging = ref<{ id: string; status: ComponentStatus } | null>(null)

function handleSprintChange(value: string) {
  const next = sprintOptions.find(option => option.id === value)
  if (next)
    sprint.value = next
}

function handleDragStart(payload: { id: string; status: ComponentStatus }) {
  dragging.value = payload
}

function handleDragEnd() {
  dragging.value = null
}

const sprintName = computed(() => sprint.value?.name ?? 'Sprint')
const sprintId = computed(() => sprint.value?.id ?? '')
</script>

<template>
  <main class="space-y-6">
    <SprintHeader
      :sprint-name="sprintName"
      :sprint-options="sprintOptions"
      :model-value="sprintId"
      @update:model-value="handleSprintChange"
    />

    <section class="grid gap-3 pb-2 grid-cols-[repeat(auto-fit,minmax(220px,1fr))] items-start">
      <BoardColumn
        v-for="column in columns || []"
        :key="column.key"
        :title="column.title"
        :status="column.key"
        :cards="column.cards"
        :dragging-status="dragging?.status || null"
        @drop-card="moveCard($event.id, $event.status)"
        @drag-start="handleDragStart"
        @drag-end="handleDragEnd"
        @select-card="selectCard"
      />
    </section>

    <CardDetailDrawer
      :card="selectedCard"
      @close="selectCard(null)"
      @update-areas="payload => updateAreas(payload.id, payload.areas)"
    />
  </main>
</template>

<style scoped>
/* scrollbar styling inherited from layout colors */
.custom-scrollbar::-webkit-scrollbar { width: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(100, 116, 139, 0.35); border-radius: 9999px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
</style>
