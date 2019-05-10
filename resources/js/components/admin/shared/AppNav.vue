<template>
  <v-navigation-drawer fixed app :permanent="$vuetify.breakpoint.mdAndUp" light :mini-variant.sync="$vuetify.breakpoint.mdAndUp && mini" :clipped="$vuetify.breakpoint.mdAndUp" :value="mini">
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar v-show="$vuetify.breakpoint.mdAndUp && mini">
            <v-btn icon @click.native.stop="navToggle" class="mx-0">
              <v-icon>chevron_right</v-icon>
            </v-btn>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ name }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon @click.native.stop="navToggle">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-list class="py-0" dense v-for="(group, index) in items" :key="index">
      <v-divider class="mb-2" :class="{ 'mt-0': !index, 'mt-2': !!index }" v-if="!!group.length"></v-divider>
      <div v-for="item in group" :key="item.title">
        <v-list-group
            v-if="!!item.items"
            :prepend-icon="item.icon"
            no-action
        >
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
              v-for="subItem in item.items"
              :key="subItem.title"
              @click="subItem.action ? subItem.action() : false"
              :to="subItem.to"
              ripple
              :exact="subItem.exact !== undefined ? subItem.exact : true"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>{{ subItem.icon }}</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
        <v-list-tile
            v-else
            @click.native="item.action ? item.action() : false"
            href="javascript:void(0)"
            :to="item.to"
            ripple
            :exact="item.exact !== undefined ? item.exact : true"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data: () => ({
        items: [],
        name: null
    }),

    props: ['mini'],

    computed: mapGetters({
      auth: 'auth/user'
    }),

    watch: {
      authName(val) {
        if (val) {
          this.name = val
        }
      }
    },

    mounted() {
      this.name = this.auth.name
      this.navigation()
    },

    methods: {
      navToggle() {
        this.$emit('nav-toggle')
      },

      async logout() {
        await this.$store.dispatch('auth/logout')

        this.$toast.info('You are logged out.')
        this.$router.push({ name: 'login' })
      },

      navigation() {
        this.items = [
          [
            { title: 'Profile', icon: 'person', to: {name: 'profile'}, exact: false }
          ],
          [
            { title: 'Logout', icon: 'power_settings_new', action: this.logout }
          ]
        ]
      }
    }
  }
</script>
