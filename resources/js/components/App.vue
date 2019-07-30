<template>
  <v-app id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </v-app>
</template>

<script>
export default {}
</script>
