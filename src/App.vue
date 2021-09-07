<template>
  <div id="app">
    <component :is="layout">
    </component>
  </div>
</template>

<script>
import EmptyLayout from "@/layouts/EmptyLayout";
import MainLayout from "@/layouts/MainLayout";

export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || "empty") + "Layout";
    },
  },
  components: {
    EmptyLayout,
    MainLayout,
  },
};
</script>
MainLayout

<style lang="scss">
@import "~materialize-css/dist/css/materialize.min.css";
@import "assets/index.css";
</style>
