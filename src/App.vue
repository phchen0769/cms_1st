<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <RouterView />
</template>

<style lang="scss" scoped>
* {
  margin: 0px;
  padding: 0px;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
