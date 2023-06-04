<script setup lang="ts">
import { ref } from "vue";
import ProjectsGrid from "@/components/ProjectsGrid.vue";
import NewProject from "@/components/NewProject.vue";

const filter = ref("");
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
  <projects-grid></projects-grid>
</template>

<style scoped lang="scss">
@import "fibonacci-styles";

#header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $fib-11 * 1px 0;
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
  margin-bottom: $fib-10 * 1px;

  .search-field {
    width: $fib-14 * 1px;
    margin-right: $fib-5 * 1px;
  }
}
</style>
