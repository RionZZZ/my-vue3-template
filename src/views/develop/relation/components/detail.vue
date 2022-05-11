<template>
  <t-select
    v-model="dataType"
    :options="DataType"
    placeholder="请选择数据类型"
  ></t-select>
  {{ dataType }}
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { DataType } from '../../const'

const dataType = ref('')
</script>
