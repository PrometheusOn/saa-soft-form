export interface User {
  login: string
  password: string | null
  label: string
  type: 'local' | 'ldap'
}