<script setup lang="ts">
const router = useRouter()
onMounted(() => router.replace('/component-board'))
</script>

<template>
  <div class="flex min-h-screen items-center justify-center text-sm text-slate-600">
    Redirecting to board...
  </div>
</template>

