<script setup lang="ts">
import type { ComponentCard, ComponentArea } from '~/types/component'
import { componentAreas } from '~/types/component'
import BadgePill from '~/components/BadgePill.vue'

const props = defineProps<{
  card: ComponentCard | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'update-areas', payload: { id: string; areas: ComponentArea[] }): void
}>()

const toggleArea = (area: ComponentArea) => {
  if (!props.card) return
  const hasArea = props.card.areas.includes(area)
  const next = hasArea
    ? props.card.areas.filter(a => a !== area)
    : [...props.card.areas, area]
  emit('update-areas', { id: props.card.id, areas: next })
}
</script>

<template>
  <teleport to="body">
    <div
      v-if="card"
      class="fixed inset-0 z-40 flex items-start justify-end bg-slate-900/30 backdrop-blur-[1px]"
      @click.self="emit('close')"
    >
      <aside class="w-full max-w-md bg-white shadow-2xl">
        <header class="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <p class="text-xs uppercase tracking-wide text-slate-500">
              Component detail
            </p>
            <h3 class="text-lg font-semibold text-slate-900">
              {{ card.name }}
            </h3>
          </div>
          <button
            class="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            @click="emit('close')"
          >
            ✕
          </button>
        </header>

        <div class="space-y-4 px-5 py-4 text-sm text-slate-700">
          <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Meta
          </p>
          <div class="space-y-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-xs">
            <div class="flex gap-2">
              <span class="w-24 text-slate-500">Category</span>
              <span class="font-medium text-slate-800">{{ card.category }}</span>
            </div>
            <div class="flex gap-2">
              <span class="w-24 text-slate-500">Status</span>
              <span class="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-700">
                {{ card.status }}
              </span>
            </div>
            <div class="flex gap-2">
              <span class="w-24 text-slate-500">Storybook</span>
              <span class="font-mono text-[11px] text-slate-800">{{ card.storybookPath }}</span>
            </div>
            <div class="flex gap-2">
              <span class="w-24 text-slate-500">File</span>
              <span class="font-mono text-[11px] text-slate-800">{{ card.filePath }}</span>
            </div>
          </div>

          <div>
            <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Areas
            </p>
            <div class="mt-2 flex flex-wrap gap-2">
              <BadgePill v-for="area in card.areas" :key="area" :area="area" />
              <span v-if="!card.areas.length" class="text-xs text-slate-500">
                No areas tagged
              </span>
            </div>

            <div class="mt-4 space-y-2">
              <p class="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                Adjust badges
              </p>
              <div class="flex flex-wrap gap-3 text-xs text-slate-700">
                <label
                  v-for="area in componentAreas"
                  :key="area"
                  class="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-2 py-1 shadow-sm hover:border-indigo-300"
                >
                  <input
                    type="checkbox"
                    class="h-4 w-4 accent-indigo-500"
                    :checked="card.areas.includes(area)"
                    @change="toggleArea(area)"
                  />
                  <span>{{ area }}</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </teleport>
</template>

