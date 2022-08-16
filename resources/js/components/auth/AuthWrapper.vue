<template>
  <v-main>
    <v-container fluid fill-height justify-center align-center>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-container>
  </v-main>
</template>

<script>
export default {}
</script>
