<template>
  <div class="fill-height">
    <app-nav :mini="mini" @navToggle="navToggle"></app-nav>
    <top-menu @navToggle="navToggle"></top-menu>

    <v-content>
      <v-container fluid>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </v-container>
    </v-content>

    <app-footer></app-footer>
  </div>
</template>

<script>
  import { settings } from '~/config.js'
  import AppNav from './shared/AppNav'
  import TopMenu from './shared/TopMenu'
  import AppFooter from './shared/AppFooter'

  export default {
    data: () => ({
      mini: false
    }),

    components: {
      'app-nav': AppNav,
      'top-menu': TopMenu,
      'app-footer': AppFooter
    },

    methods: {
      navToggle() {
        this.mini = !this.mini
      }
    }
  }
</script>
