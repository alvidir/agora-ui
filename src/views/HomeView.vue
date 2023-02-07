<template>
  <div class="home">
    <div id="header">
      <h3>The &nbsp;</h3>
      <h1>Story Building</h1>
      <h2>Toolkit.</h2>
      <div>
        Shape your characters, create locations and keep track of everything in
        your stories.
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
});
</script>

<style lang="scss">
@import "@/styles.scss";

.colored {
  background: -webkit-linear-gradient(
    260deg,
    $color-champagne-pink,
    $color-melon,
    $color-salmon-pink,
    $color-dim-gray
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.theme-light {
  #header {
    h2,
    h3 {
      color: var(--color-text-secondary);
    }

    h1 {
      @extend .colored;
    }
  }
}

.theme-dark {
  #header {
    h1,
    h2,
    h3 {
      @extend .colored;
    }
  }
}

.home {
  min-height: fit-content;

  #header {
    // font-family: "Black Han Sans", Helvetica, Arial, sans-serif;
    font-size: $fib-4 * 0.3em;
    font-weight: 800;
    padding: $fib-10 * 1px;

    h1 {
      font-size: 5em;
    }

    h2 {
      font-size: 4em;
    }

    h3 {
      font-size: 3em;
    }

    div {
      color: var(--color-text-disabled);
      padding-top: $fib-8 * 1px;
      font-weight: 500;
    }
  }
}
</style>
