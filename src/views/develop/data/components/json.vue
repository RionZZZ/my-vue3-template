<template>
  <t-drawer
    v-model:visible="showDraw"
    confirm-btn="确认"
    size="25%"
    header="数据结构"
    destroy-on-close
    @confirm="onConfirm"
  >
    {{ JSON.stringify(json) }}
  </t-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showDraw = ref(false)
const json = ref('')

defineExpose({ showDraw, json })

const onConfirm = () => {
  showDraw.value = false
}
</script>
