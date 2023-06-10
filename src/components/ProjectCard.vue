<script setup lang="ts">
import { Project } from "@/project";
import { RegularCard } from "vue-cards/src/main";
import CardinalitiesList from "./CardinalitiesList.vue";
import { CardinalityInfo, newCardinality } from "@/cardinality";
import { computed } from "vue";

interface Props {
  project: Project;
}

const props = defineProps<Props>();

const cardinalities = computed((): Array<CardinalityInfo> => {
  return Object.entries(props.project.cardinalities).map(
    ([name, count]): CardinalityInfo => {
      return newCardinality(name, count);
    }
  );
});
</script>

<template>
  <regular-card class="project-card">
    <template #header>
      <h2>{{ project.name }}</h2>
    </template>
    <span v-if="project.description" class="description">
      {{ project.description }}
    </span>
    <span v-else class="description">
      No description available for this project yet. Let your imagination run
      wild and fill this space with the wonders of your creation!
    </span>
    <template #footer>
      <cardinalities-list :cardinalities="cardinalities"></cardinalities-list>
    </template>
  </regular-card>
</template>

<style lang="scss">
@import "fibonacci-styles";

.project-card {
  @extend .medium-fade;
  width: $fib-13 * 1px;
  height: $fib-12 * 1px;

  &:hover {
    @extend .shadow-box;
    transform: translateY(-5px);
  }

  &:not(:hover) {
    .description,
    .footer {
      color: var(--color-text-disabled);
    }
  }

  .header {
    height: $fib-9 * 1px;
    justify-content: center;
  }

  .description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--color-text-secondary);
    transition: color $medium-fade;
  }
}
</style>
