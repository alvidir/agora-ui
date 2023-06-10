<script setup lang="ts">
import ProjectCard from "@/components/ProjectCard.vue";
import { useProjectStore } from "@/stores/project";
import { Project, getId } from "@/project";

interface Props {
  projects: Array<Project>;
}

defineProps<Props>();
</script>

<template>
  <div v-if="!projects.length" class="empty">
    <i class="bx bx-folder-open"></i>
    <strong>No projects yet</strong>
  </div>
  <div v-else class="projects-grid">
    <router-link
      v-for="project in projects"
      :key="project.id"
      :to="`/${getId(project)}`"
    >
      <project-card :project="project"></project-card>
    </router-link>
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

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: $fib-12 * 1px;
  color: var(--color-text-secondary);
  width: 3 * $fib-13 * 1px + 2 * $fib-6 * 1px;

  i {
    font-size: xx-large;
    margin-bottom: $fib-5 * 1px;
  }
}
</style>
