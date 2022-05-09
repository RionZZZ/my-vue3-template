<template>
  <t-button>{{ id }}</t-button>
  <t-input placeholder="test detail cache" />
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
</script>
