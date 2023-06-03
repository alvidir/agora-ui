<script setup lang="ts">
import urlJoin from "url-join";
import { Profile } from "vue-profile/src/profile";
import config from "@/config.json";

interface Props {
  logo: string;
  profile: Profile;
}

defineProps<Props>();

const onSignoutClick = () => {
  window.location.assign(urlJoin(config.AUTH_BASE_URI, "logout"));
};

const onSignupClick = () => {
  window.location.assign(urlJoin(config.AUTH_BASE_URI, "signup"));
};
</script>

<template>
  <dock-menu flex>
    <button class="no-hover no-tooltip">
      <img class="logo" :src="logo" />
    </button>
    <button>
      <i class="bx bx-face"></i>
      <label>Characters</label>
    </button>
    <button>
      <i class="bx bx-cuboid"></i>
      <label>Objects and artifacs</label>
    </button>
    <button>
      <i class="bx bx-landscape"></i>
      <label>Locations</label>
    </button>
    <button>
      <i class="bx bx-calendar-event"></i>
      <label>Events</label>
    </button>
    <span></span>
    <button>
      <i class="bx bx-cabinet"></i>
      <label>Files</label>
    </button>
    <div class="item">
      <img
        v-if="profile.picture"
        class="fitted larger"
        :src="profile.picture"
        :alt="profile.name"
      />
      <i v-else class="fallback-avatar bx bx-user"></i>
      <profile-menu
        class="tooltip bottom delayed"
        :profile="profile"
        @signout="onSignoutClick"
        @signup="onSignupClick"
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
