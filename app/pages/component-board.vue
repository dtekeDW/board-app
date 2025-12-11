<script setup lang="ts">
import { computed } from 'vue'
import SprintHeader from '~/components/SprintHeader.vue'
import BoardColumn from '~/components/BoardColumn.vue'
import CardDetailDrawer from '~/components/CardDetailDrawer.vue'
import { useComponentBoard } from '~/composables/useComponentBoard'

const { sprint, sprintOptions, columns, moveCard, updateAreas, selectedCard, selectCard } = useComponentBoard()

const handleSprintChange = (value: string) => {
  const next = sprintOptions.find(option => option.id === value)
  if (next) sprint.value = next
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

    <section class="flex gap-4 overflow-x-auto pb-2">
      <BoardColumn
        v-for="column in columns || []"
        :key="column.key"
        :title="column.title"
        :status="column.key"
        :cards="column.cards"
        @drop-card="moveCard($event.id, $event.status)"
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
.custom-scrollbar::-webkit-scrollbar {
  width: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.5);
  border-radius: 9999px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
</style>

