<template>
  <div class="w-full h-full flex flex-col gap-4 p-4">
    <CreateUserBlock />
    <div class="flex gap-2 items-center py-1 px-2 bg-[#d8dbdf] rounded-lg">
      <ElIcon size="24">
        <QuestionIcon />        
      </ElIcon>
      <p>Для указания нескольких меток одной пары логин/пароль используйте разделитель ;</p>
    </div>
    <div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import QuestionIcon from './icons/QuestionIcon.vue';


</script>

<style scoped>

</style>