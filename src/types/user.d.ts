export interface User {
  id: number
  login: string
  password: string | null
  label: Label[]
  type: Types
}

export interface Label {
  text: string
}

export type Types = 'local' | 'ldap'
