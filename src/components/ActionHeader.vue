<script setup lang="ts">
import { computed } from "vue";

interface Props {
  title: string;
  color?: string;
  subtitle: string;
  icon: string;
}

defineProps<Props>();
</script>

<template>
  <span class="title">
    <i :class="icon"></i>&nbsp;
    {{ title }}
  </span>
  <small v-if="subtitle" class="subtitle">
    {{ subtitle }}
  </small>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "fibonacci-styles";

i {
  color: var(--color-text-secondary);
}

.title {
  color: v-bind(color);
}
</style>
