<template>
  <t-tabs theme="card">
    <t-tab-panel
      v-for="index in 6"
      :key="index"
      :value="index + ''"
      :label="`选项卡${index + 1}`"
      :removable="true"
    >
    </t-tab-panel>
  </t-tabs>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
