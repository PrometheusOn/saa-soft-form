<template>
  <ElForm
    :model="formData"
    ref="ruleFormRef"
    :rules
    class="grid gap-2 w-full items-end"
    :class="defineClass"
    label-position="top"
  >
    <ElFormItem :label="!index ? 'Метки' : ''">
      <ElInput
        v-model="labelInput"
        maxlength="50"
        :formatter="labelFormatter"
        :parser="labelParser"
      />
    </ElFormItem>
    <ElFormItem :label="!index ? 'Тип записи' : ''">
      <ElSelect v-model="formData.type" @change="changeType">
        <ElOption
          v-for="option in options"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        />
      </ElSelect>
    </ElFormItem>
    <ElFormItem :label="!index ? 'Логин' : ''" prop="login">
      <ElInput v-model="formData.login" placeholder="Значение" maxlength="100" />
    </ElFormItem>
    <ElFormItem v-if="formData.type !== 'ldap'" :label="!index ? 'Пароль' : ''" prop="password">
      <ElInput
        v-model="formData.password"
        type="password"
        placeholder="Введите пароль"
        maxlength="100"
        show-password
      />
    </ElFormItem>
    <ElButton class="!border-0 hover:!bg-white" @click="() => usersStore.deleteUser(user.id)">
      <ElIcon>
        <TrashIcon />
      </ElIcon>
    </ElButton>
  </ElForm>
</template>

<script setup lang="ts">
import type { User } from '@/types/user'
import { useUsersStore } from '@/stores/users'
import type { FormInstance, FormRules } from 'element-plus'

const props = defineProps<{
  user: User
  index: number
}>()

const options = [
  { value: 'local', label: 'Локальная' },
  { value: 'ldap', label: 'LDAP' },
]

const usersStore = useUsersStore()

const ruleFormRef = ref<FormInstance>()
const formData = ref<User>({
  ...props.user,
})
const labelInput = ref('')

const rules = ref<FormRules<User>>({
  login: [{ required: true, message: 'Заполните логин пользователя', trigger: 'change' }],
  password: [{ required: true, validator: validatePass }],
})

const defineClass = computed(() =>
  formData.value.type === 'local'
    ? 'grid-cols-[200px_200px_1fr_1fr_24px]'
    : 'grid-cols-[200px_200px_1fr_24px]',
)

function changeType(value: string) {
  formData.value.password = value === 'ldap' ? null : ''
}

function validatePass(rule: any, value: any, callback: any) {
  if (formData.value.type === 'local' && value === '') {
    callback(new Error('Введите пароль'))
  } else {
    callback()
  }
}

function labelParser(value: string) {
  if (value === '') {
    formData.value.label = []
    return value
  }

  const splittedLabels = value.split(';')
  formData.value.label = splittedLabels.map((label) => ({
    text: label.trim(),
  }))
  return value.trim()
}

function labelFormatter() {
  const stringArr = formData.value.label.map((label) => label.text)
  return stringArr.join('; ').trim()
}

watch(
  formData,
  async () => {
    let isValid = true

    if (ruleFormRef.value) {
      await ruleFormRef.value?.validate((valid) => {
        if (!valid) isValid = false
      })
    }

    if (isValid) {
      usersStore.uploadUser(formData.value)
    } else {
      usersStore.deleteUserFromLS(formData.value.id)
    }
  },
  { deep: true },
)
</script>

<style scoped>
:deep(.el-form-item) {
  margin: 0;
}
</style>
