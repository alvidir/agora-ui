<script setup lang="ts">
import { computed, onBeforeMount, ref } from "vue";
import ProjectsGrid from "@/components/ProjectsGrid.vue";
import NewProject from "@/components/NewProject.vue";
import { useProjectStore } from "@/stores/project";
import { useWarningStore } from "@/stores/warning";
import { Warning } from "@/warning";
import * as rpc from "@/services/agora.rpc";
import { Project } from "@/project";

const projectStore = useProjectStore();
const warningStore = useWarningStore();

const fetching = ref(false);
const filter = ref("");

const fetchProjectList = () => {
  rpc
    .listProjects()
    .then((projects: Array<Project>) => {
      projects.forEach((project) => projectStore.addProject(project));
    })
    .catch((error: Warning) => {
      warningStore.push(error);
    })
    .finally(() => {
      fetching.value = false;
    });
};

const filteredProjects = computed((): Array<Project> => {
  if (filter.value.length) {
    return projectStore
      .listProjects()
      .filter((project) => project.name.includes(filter.value));
  }

  return projectStore.listProjects();
});

onBeforeMount(() => fetchProjectList());
</script>

<template>
  <div id="header">
    <i class="icon-greek-pillar-outline"></i>
    <span>
      <h1>Welcome to Agora</h1>
      <h3>The pillar of your next masterpiece</h3>
    </span>
  </div>
  <div class="actions">
    <search-field
      v-model="filter"
      placeholder="Filter projects"
      maxheight="0"
      large
    ></search-field>
    <new-project></new-project>
  </div>
  <projects-grid :projects="filteredProjects"></projects-grid>
</template>

<style scoped lang="scss">
@import "fibonacci-styles";

#header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: $fib-11 * 1px;
  margin-bottom: $fib-9 * 1px;
  min-width: fit-content;
  color: var(--color-text-primary);

  i {
    @extend .round-corners;
    font-size: xx-large;
    border: 1px solid var(--color-text-disabled);
    padding: $fib-7 * 1px;
  }

  span {
    display: flex;
    flex-direction: column;
  }

  h1,
  h3 {
    margin-left: $fib-6 * 1px;
    font-weight: 500;
  }

  h3 {
    color: var(--color-text-secondary);
  }
}

.actions {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: $fib-11 * 1px;

  .search-field {
    width: $fib-14 * 1px;
    margin-right: $fib-5 * 1px;
  }
}
</style>
