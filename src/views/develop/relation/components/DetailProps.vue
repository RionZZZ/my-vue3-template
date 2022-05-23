<template>
  <t-drawer
    v-model:visible="showDraw"
    :close-btn="true"
    confirm-btn="确认"
    size="60%"
    header="字段规则"
    destroy-on-close
    @confirm="onConfirm"
  >
    <t-form label-width="160px">
      <t-form-item
        v-for="item in propsItems"
        :key="item.props"
        :label="item.props"
      >
        <t-input
          v-if="item.type === 'text'"
          v-model="config[item.props]"
          :placeholder="item.props"
        />
        <t-switch v-if="item.type === 'boolean'" v-model="config[item.props]" />
        <t-input
          v-if="item.type === 'number'"
          v-model.number="config[item.props]"
          :placeholder="item.props"
        />
      </t-form-item>
    </t-form>
  </t-drawer>
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue'
import { DataPropType } from '../../type'

const showDraw = ref(false)
const propsItems: Ref<DataPropType[]> = ref([])
const config: Ref<{ [key: string]: any }> = ref({})

const emit = defineEmits(['onConfirm'])
defineExpose({ showDraw, propsItems, config })

const onConfirm = () => {
  emit('onConfirm', config.value)
  showDraw.value = false
}
</script>
