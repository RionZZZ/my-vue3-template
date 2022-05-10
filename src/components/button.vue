<template>
  <t-button :="$attrs" @click="onBtnClick">
    <slot />
  </t-button>
</template>

<script lang="ts" setup>
import { debounce } from '@utils/util'
const emit = defineEmits(['click'])
const onBtnClick = debounce(() => emit('click'))
</script>
