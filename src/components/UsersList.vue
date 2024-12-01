<template>
  <div class="w-full h-full flex flex-col gap-4 p-4">
    <CreateUserBlock />
    <div class="flex gap-2 items-center py-1 px-2 bg-[#d8dbdf] rounded-lg">
      <ElIcon size="24">
        <QuestionIcon />
      </ElIcon>
      <p>Для указания нескольких меток одной пары логин/пароль используйте разделитель ;</p>
    </div>
    <div v-if="users.length" class="flex flex-col gap-2">
      <template v-for="(user, index) in users" :key="user.id">
        <UserForm :user :index />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import QuestionIcon from './icons/QuestionIcon.vue'
import { useUsersStore } from '@/stores/users'

const usersStore = useUsersStore()
const { users } = storeToRefs(usersStore)

onMounted(() => {
  usersStore.loadUsers()
})
</script>

<style scoped></style>
