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
    deleteUserFromLS(id)
  }

  function deleteUserFromLS(id: number) {
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]')
    const usersWithout = savedUsers.filter((el: User) => el.id !== id)
    localStorage.setItem('users', JSON.stringify(usersWithout))
  }

  function loadUsers() {
    const localStorageUsers = localStorage.getItem('users')
    if (!localStorageUsers) {
      localStorage.setItem('users', JSON.stringify([]))
      users.value = []
    } else {
      users.value = JSON.parse(localStorageUsers)
    }
  }

  function uploadUser(user: User) {
    const savedUsers = JSON.parse(localStorage.getItem('users') || '[]')
    const existedUserId = savedUsers.findIndex((el: User) => el.id === user.id)
    if (existedUserId !== -1) {
      savedUsers[existedUserId] = user
    } else {
      savedUsers.push(user)
    }
    localStorage.setItem('users', JSON.stringify(savedUsers))
  }
  // TODO: поправить работу с localStorage

  return { users, createUser, deleteUser, deleteUserFromLS, loadUsers, uploadUser }
})
