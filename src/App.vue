<script setup lang="ts">
import { ref } from "vue";
import { getProfile } from "@/services/filebrowser.rest";
import { useWarningStore } from "@/stores/warning";
import { Code, getWarning } from "./warning";
import { Profile, loadAndApply } from "vue-profile/src/profile";
import SidenavMenu from "@/components/SidenavMenu.vue";
import WarningList from "@/components/WarningList.vue";

const warningStore = useWarningStore();

const profile = ref<Profile>(loadAndApply());

getProfile()
  .then((data) => {
    Object.assign(profile.value, data);
  })
  .catch(() => {
    warningStore.push(getWarning(Code.ErrFetchingProfile));
  });
</script>

<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <sidenav-menu :profile="profile"></sidenav-menu>
  <warning-list></warning-list>
  <div id="main">
    <router-view />
  </div>
</template>

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
  display: flex;
  flex-direction: row;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: fit-content;
  width: 100%;
  min-width: $fib-11 * $fib-5 * 1px;
}

#main {
  box-sizing: border-box;
  padding: 0 $fib-10 * 1px;
  margin-bottom: $fib-9 * 1px;
  margin-top: $fib-7 * 1px;
}
</style>
