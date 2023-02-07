<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <router-view />
  <button @click="onClick">clik me</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { GetTheme, SwitchTheme } from "fibonacci-styles/util";
import Config from "@/config.json";

export default defineComponent({
  name: "App",

  methods: {
    onClick() {
      SwitchTheme();
    },
  },

  mounted() {
    GetTheme(Config.THEME_STORAGE_KEY);
  },
});
</script>

<style lang="scss">
@import "fibonacci-styles";

* {
  margin: 0;
  padding: 0;
  font-family: "Raleway", Helvetica, Arial, sans-serif;
}

body {
  background: var(--color-bg-secondary);
}

#app {
  width: 100%;
  text-align: center;
}
</style>
