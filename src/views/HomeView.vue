<script setup lang="ts">
import ProjectCard from "@/components/ProjectCard.vue";
</script>

<template>
  <div class="home">
    <project-card
      v-for="i in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
      :key="i"
    ></project-card>
  </div>
</template>

<style scoped lang="scss">
@import "fibonacci-styles";

.home {
  display: grid;
  grid-template-columns: repeat(3, $fib-13 * 1px);
  column-gap: $fib-6 * 1px;
  row-gap: $fib-6 * 1px;
}
</style>
