<script setup lang="ts">
const props = defineProps<{
  sprintName: string
  sprintOptions: { id: string, name: string }[]
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <header class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <p class="text-base-10 text-xs tracking-wide uppercase">
        Component Sprint Board
      </p>
      <h1 class="text-base-12 text-2xl font-semibold">
        {{ sprintName }}
      </h1>
    </div>

    <div class="flex flex-wrap items-center gap-2">
      <label class="text-base-11 text-sm">
        Sprint
      </label>
      <select
        class="border-base-6 bg-base-1 text-base-12 focus:border-primary-9 border rounded-lg px-3 py-2 text-sm shadow-sm focus:outline-none"
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
