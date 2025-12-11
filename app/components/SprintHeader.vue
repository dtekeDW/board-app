<script setup lang="ts">
const props = defineProps<{
  sprintName: string
  sprintOptions: { id: string; name: string }[]
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <header class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <p class="text-xs uppercase tracking-wide text-slate-500">
        Component Sprint Board
      </p>
      <h1 class="text-2xl font-semibold text-slate-900">
        {{ sprintName }}
      </h1>
    </div>

    <div class="flex flex-wrap items-center gap-2">
      <label class="text-sm text-slate-600">
        Sprint
      </label>
      <select
        class="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-indigo-400 focus:outline-none"
        :value="modelValue"
        @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      >
        <option v-for="option in sprintOptions" :key="option.id" :value="option.id">
          {{ option.name }}
        </option>
      </select>
    </div>
  </header>
</template>

