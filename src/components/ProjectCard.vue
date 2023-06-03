<script setup lang="ts">
import { RegularCard } from "vue-cards/src/main";
</script>

<template>
  <regular-card class="project-card">
    <template #header>
      <h2>Project name</h2>
    </template>
    <span class="description">
      This should be a brief description about the project. It could explain a
      main aspect of it plot in order to be indentified rapidly.
    </span>
    <template #footer>
      <span>
        <i class="bx bxs-face"></i>
        12
      </span>
      <span class="separator">|</span>
      <span>
        <i class="bx bxs-cuboid"></i>
        4
      </span>
      <span class="separator">|</span>
      <span>
        <i class="bx bxs-landscape"></i>
        39
      </span>
      <span class="separator">|</span>
      <span>
        <i class="bx bxs-calendar-event"></i>
        171
      </span>
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

  .footer {
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
}
</style>
