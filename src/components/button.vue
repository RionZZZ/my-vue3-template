<template>
  <t-button :="$attrs" @click="onBtnClick">
    <slot />
  </t-button>
</template>

<script lang="ts" setup>
const debounce = (fun: () => void, timeout: number = 500) => {
  let timer: number
  return () => {
    clearTimeout(timer)
    timer = setTimeout(fun, timeout)
  }
}
const emit = defineEmits(['click'])
const onBtnClick = debounce(() => emit('click'))
</script>
