<template>
	<v-toolbar dark :clipped-left="$vuetify.breakpoint.mdAndUp" fixed app color="primary">
    <v-toolbar-side-icon @click.stop="navToggle"></v-toolbar-side-icon>

    <router-link class="navbar-brand" :to="{ name: 'index' }" v-once>
    	<v-toolbar-title class="white--text">{{ siteName }}</v-toolbar-title>
    </router-link>
  </v-toolbar>
</template>

<script>
	import { settings } from '~/config'

	export default {
		data: () => ({
			siteName: settings.siteName
		}),

		methods: {
      navToggle() {
        this.$emit('nav-toggle')
      }
		}
	}
</script>
