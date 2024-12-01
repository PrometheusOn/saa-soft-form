import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types/user'

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([])
  
  function createUser() {
    users.value.push({
      login: '',
      password: '',
      label: '',
      type: 'local',
    })
  }

  return { users, createUser }
})
