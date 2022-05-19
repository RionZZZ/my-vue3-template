<template>
  <t-drawer
    v-model:visible="showDraw"
    confirm-btn="确认"
    size="25%"
    header="数据结构"
    destroy-on-close
    @confirm="onConfirm"
  >
    <t-loading :loading="loading" class="json-draw">
      <pre>{{ json }}</pre>
    </t-loading>
  </t-drawer>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { getDataJSON } from '@api/develop'

const showDraw = ref(false)
const code = ref('')
const json = ref('')
const loading = ref(false)

defineExpose({ showDraw, code })

watch(showDraw, val => {
  if (val) {
    loading.value = true
    getDataJSON({ code: code.value }).then(res => {
      if (res) {
        json.value = JSON.stringify(res, null, 4)
        loading.value = false
      }
    })
  } else {
    json.value = ''
  }
})

const onConfirm = () => {
  showDraw.value = false
}
</script>
<style lang="scss" scoped>
.json-draw {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
}
</style>
