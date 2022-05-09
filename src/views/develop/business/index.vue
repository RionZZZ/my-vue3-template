<template>
  <t-button @click="onDetailClick(1)">develop///business11</t-button>
  <t-button @click="onDetailClick(2)">develop///business22</t-button>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const onDetailClick = (id: number) => {
  console.log(id)
  router.push('/develop/business/detail/' + id)
}
</script>
