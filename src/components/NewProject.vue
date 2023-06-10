<script setup lang="ts">
import { checkProjectName } from "@/project";
import { ref, nextTick } from "vue";
import * as rpc from "@/services/agora.rpc";
import { Project } from "@/project";
import { Warning } from "@/warning";
import { useWarningStore } from "@/stores/warning";
import { useProjectStore } from "@/stores/project";

const projectStore = useProjectStore();
const warningStore = useWarningStore();

const active = ref(false);
const error = ref("");
const fetching = ref(false);

interface Field {
  focus: () => void;
  blur: () => void;
}

const field = ref<Field | undefined>();
const projectname = ref("");
const highlight = ref(false);

const activate = () => {
  active.value = true;
  nextTick(() => field.value?.focus());
};

const onInput = () => {
  const name = projectname.value.trim();
  if (name) {
    error.value = checkProjectName(name) ?? "";
  } else {
    error.value = "";
  }
};

const cancel = () => {
  projectname.value = "";
  highlight.value = false;
  field.value?.blur();

  active.value = false;
  error.value = "";
};

const submit = () => {
  const name = projectname.value.trim() ?? "";
  if (!name || error.value) return;
  active.value = false;

  const project = {
    id: "",
    name: name,
    description: "",
    highlight: highlight.value,
    cardinalities: {},
  };

  cancel();

  rpc
    .createProject(project)
    .then((project: Project) => {
      projectStore.addProject(project);
    })
    .catch((error: Warning) => {
      warningStore.push(error);
    })
    .finally(() => {
      fetching.value = false;
    });
};
</script>

<template>
  <div
    class="new-project-dialog"
    v-click-outside="cancel"
    @keydown.enter="submit"
  >
    <submit-button
      color="var(--color-accent)"
      :active="active"
      @click="activate"
      large
    >
      <i class="bx bxs-bulb"></i>
      New Project
    </submit-button>
    <regular-card :class="{ active: active }" @close="cancel" closable>
      <template #header>
        <span> <i class="bx bxs-bulb"></i>&nbsp;Create a new project </span>
        <small>Unleash your project's awesomeness - Name it!</small>
      </template>
      <regular-field
        v-model="projectname"
        ref="field"
        placeholder="Project name"
        :error="error"
        :readonly="fetching"
        @input="onInput"
        large
      ></regular-field>
      <check-button :class="{ active: highlight }" v-model="highlight">
        Highlight this project
      </check-button>
      <template #footer>
        <submit-button
          :disabled="!projectname.trim() || !!error"
          :loading="fetching"
          @submit="submit"
        >
          Create
        </submit-button>
      </template>
    </regular-card>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "fibonacci-styles";

.new-project-dialog {
  position: relative;

  .regular-card {
    @extend .shadow-box;

    position: absolute;
    right: 0;
    margin-top: $fib-5 * 1px;
    min-width: $fib-13 * 1px;
    visibility: hidden;
    z-index: 1;

    &.active {
      visibility: visible;
    }

    i {
      color: var(--color-text-secondary);
    }

    button.submit {
      width: fit-content;
    }
  }
}

.check-button {
  margin-top: $fib-6 * 1px;

  &:not(.active) {
    color: var(--color-text-disabled);
  }
}

input {
  margin: 0.4rem;
}
</style>
