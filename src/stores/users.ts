import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types/user'

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([])

  function createUser() {
    const maxId = users.value.length > 0 ? Math.max(...users.value.map((user) => user.id)) : 0
    users.value.push({
      id: maxId + 1,
      login: '',
      password: '',
      label: [],
      type: 'local',
    })
  }

  function deleteUser(id: number) {
    users.value = users.value.filter((el) => el.id !== id)
  }

  function loadUsers() {
    const localStorageUsers = localStorage.getItem('users')
    users.value = localStorageUsers ? JSON.parse(localStorageUsers) : []
  }

  function uploadUsers() {
    localStorage.setItem('users', JSON.stringify(users.value))
  }

  return { users, createUser, deleteUser, loadUsers, uploadUsers }
})
