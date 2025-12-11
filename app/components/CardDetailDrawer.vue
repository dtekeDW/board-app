<script setup lang="ts">
import type { ComponentArea, ComponentCard } from '~/types/component'
import BadgePill from '~/components/BadgePill.vue'
import { componentAreas } from '~/types/component'

const props = defineProps<{
  card: ComponentCard | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'update-areas', payload: { id: string, areas: ComponentArea[] }): void
}>()

function toggleArea(area: ComponentArea) {
  if (!props.card)
    return
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
      class="fixed inset-0 z-40 flex items-start justify-end bg-pureBlack/70 backdrop-blur-[2px]"
      @click.self="emit('close')"
    >
      <aside class="bg-base-1 border-base-6 max-w-md w-full border shadow-2xl">
        <header class="border-base-6 flex items-center justify-between border-b px-5 py-4">
          <div>
            <p class="text-base-10 text-xs tracking-wide uppercase">
              Component detail
            </p>
            <h3 class="text-base-12 text-lg font-semibold">
              {{ card.name }}
            </h3>
          </div>
          <button
            class="text-base-11 hover:bg-base-3 hover:text-base-12 rounded-full p-2 transition"
            @click="emit('close')"
          >
            ✕
          </button>
        </header>

        <div class="text-base-11 px-5 py-4 text-sm space-y-4">
          <p class="text-base-10 text-xs font-semibold tracking-wide uppercase">
            Meta
          </p>
          <div class="border-base-6 bg-base-2 border rounded-lg px-3 py-3 text-xs space-y-2">
            <div class="flex gap-2">
              <span class="text-base-10 w-24">Category</span>
              <span class="text-base-12 font-medium">{{ card.category }}</span>
            </div>
            <div class="flex gap-2">
              <span class="text-base-10 w-24">Status</span>
              <span class="bg-base-3 text-base-11 rounded-full px-2 py-1 text-[11px] font-semibold tracking-wide uppercase">
                {{ card.status }}
              </span>
            </div>
            <div class="flex gap-2">
              <span class="text-base-10 w-24">Storybook</span>
              <span class="text-base-12 text-[11px] font-mono">{{ card.storybookPath }}</span>
            </div>
            <div class="flex gap-2">
              <span class="text-base-10 w-24">File</span>
              <span class="text-base-12 text-[11px] font-mono">{{ card.filePath }}</span>
            </div>
          </div>

          <div>
            <p class="text-base-10 text-xs font-semibold tracking-wide uppercase">
              Areas
            </p>
            <div class="mt-2 flex flex-wrap gap-2">
              <BadgePill v-for="area in card.areas" :key="area" :area="area" />
              <span v-if="!card.areas.length" class="text-base-10 text-xs">
                No areas tagged
              </span>
            </div>

            <div class="mt-4 space-y-2">
              <p class="text-base-10 text-[11px] font-semibold tracking-wide uppercase">
                Adjust badges
              </p>
              <div class="text-base-11 flex flex-wrap gap-3 text-xs">
                <label
                  v-for="area in componentAreas"
                  :key="area"
                  class="border-base-6 bg-base-1 hover:border-primary-9 flex items-center gap-2 border rounded-md px-2 py-1 shadow-sm"
                >
                  <input
                    type="checkbox"
                    class="accent-primary-9 h-4 w-4"
                    :checked="card.areas.includes(area)"
                    @change="toggleArea(area)"
                  >
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
