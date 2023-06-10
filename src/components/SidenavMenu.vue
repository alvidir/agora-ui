<script setup lang="ts">
import urlJoin from "url-join";
import { Profile } from "vue-profile/src/profile";
import config from "@/config.json";
import { computed } from "vue";
import router from "@/router";

interface Props {
  profile: Profile;
}

defineProps<Props>();

const logo = config.ALVIDIR_LOGO_URI;
const signoutUrl = urlJoin(config.AUTH_BASE_URI, "logout");
const filebrowserUrl = config.FILEBROWSER_BASE_URI;

const projectId = computed((): string | undefined => {
  return router.currentRoute.value.path.split("/").at(1);
});
</script>

<template>
  <dock-menu flex>
    <button class="no-hover no-tooltip">
      <img class="logo" :src="logo" />
    </button>
    <router-link v-if="projectId" class="item" :to="`/${projectId}/characters`">
      <i class="bx bx-face"></i>
      <label>Characters</label>
    </router-link>
    <router-link v-if="projectId" class="item" :to="`/${projectId}/objects`">
      <i class="bx bx-cuboid"></i>
      <label>Objects and artifacs</label>
    </router-link>
    <router-link v-if="projectId" class="item" :to="`/${projectId}/locations`">
      <i class="bx bx-landscape"></i>
      <label>Locations</label>
    </router-link>
    <router-link v-if="projectId" class="item" :to="`/${projectId}/events`">
      <i class="bx bx-calendar-event"></i>
      <label>Events</label>
    </router-link>
    <span></span>
    <div class="item">
      <img
        v-if="profile.picture"
        class="fitted larger"
        :src="profile.picture"
        :alt="profile.name"
      />
      <i v-else class="fallback-avatar bx bx-user"></i>
      <profile-menu
        class="tooltip delayed"
        :class="projectId ? 'bottom' : 'top'"
        :profile="profile"
        :signoutUrl="signoutUrl"
        :archiveUrl="filebrowserUrl"
      />
    </div>
  </dock-menu>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "fibonacci-styles";

.regular-menu.tooltip {
  padding: 0px !important;
}

.fallback-avatar {
  font-size: x-large !important;
}
</style>
