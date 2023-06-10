<script setup lang="ts">
import { CardinalityInfo } from "@/cardinality";
import { computed } from "vue";

interface Props {
  cardinalities: Array<CardinalityInfo>;
}

const props = defineProps<Props>();

const cardinalitiesToDisplay = computed((): Array<CardinalityInfo> => {
  return props.cardinalities.filter((cardinality) => cardinality.count);
});
</script>

<template>
  <div class="cardinalities">
    <div
      v-for="(cardinality, index) in cardinalitiesToDisplay"
      :key="cardinality.name"
      class="cardinality"
    >
      <span v-if="index" class="separator">|</span>
      <span>
        <i :class="cardinality.icon"></i>
        {{ cardinality.count }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "fibonacci-styles";

.cardinalities {
  justify-content: space-around;
  color: var(--color-text-secondary);
  transition: color $medium-fade;

  span.separator {
    color: var(--color-text-disabled);
  }

  span:not(.separator) {
    display: flex;
    align-items: center;

    i {
      margin-right: $fib-4 * 1px;
    }
  }
}
</style>
