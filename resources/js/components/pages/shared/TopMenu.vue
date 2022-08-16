<template>
	<v-app-bar dark :clipped-left="$vuetify.breakpoint.mdAndUp" fixed app color="primary">
    <v-app-bar-nav-icon @click.stop="navToggle"></v-app-bar-nav-icon>

    <v-toolbar-title class="white--text">{{ siteName }}</v-toolbar-title>
  </v-app-bar>
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
