<script setup lang="ts">
import ProjectCard from "@/components/ProjectCard.vue";
</script>

<template>
  <div class="projects-grid">
    <a href="/" v-for="i in [0, 1, 2, 3, 4]" :key="i">
      <project-card></project-card>
    </a>
  </div>
</template>

<style scoped lang="scss">
@import "fibonacci-styles";

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, $fib-13 * 1px);
  column-gap: $fib-6 * 1px;
  row-gap: $fib-6 * 1px;
}

a {
  text-decoration: none;
}
</style>
