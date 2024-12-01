<template>
  <div class="flex gap-2 items-center">
    <p class="text-xl font-bold">Учетные записи</p>
    <ElButton class="w-8 h-8" @click="userStore.createUser">+</ElButton>
  </div>
</template>

<script setup lang="ts">
import { useUsersStore } from '@/stores/users'

const userStore = useUsersStore()
</script>
