<template>
  <t-button :="$attrs" @click="onBtnClick">
    <slot />
  </t-button>
</template>

<script lang="ts" setup>
const debounce = (fun: () => void) => {
  let timer: number
  return function () {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fun()
    }, 500)
  }
}
const emit = defineEmits(['click'])
const onBtnClick = debounce(() => emit('click'))
</script>
