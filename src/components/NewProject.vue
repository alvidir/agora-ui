<script setup lang="ts">
import { ref, nextTick } from "vue";
import ColorPicker from "@/components/ColorPicker.vue";

const active = ref(false);
const valid = ref(false);
const error = ref<string | undefined>();
const fetching = ref(false);

interface Field {
  focus: () => void;
  blur: () => void;
}

const field = ref<Field | undefined>();
const projectname = ref("");

const activate = () => {
  active.value = true;
  nextTick(() => field.value?.focus());
};

const onInput = () => {
  valid.value = false;

  const name = projectname.value.trim() ?? "";
  //   error.value = fileStore.check(props.pathname, name);

  valid.value = !error.value;
};

const cancel = () => {
  projectname.value = "";
  field.value?.blur();

  active.value = false;
  valid.value = false;
  error.value = undefined;
};

const submit = () => {
  if (!valid.value) return;
  active.value = false;

  const name = projectname.value.trim() ?? "";
  cancel();
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
        <span class="title">
          <i class="bx bxs-bulb"></i>&nbsp;Create a new project
        </span>
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
      <template #footer>
        <submit-button :disabled="!valid" :loading="fetching" @submit="submit">
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
</style>
