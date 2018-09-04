<template>
  <v-card raised>
    <v-toolbar dark color="primary" flat>
      <v-toolbar-title>Password reset</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <div class="fullwidth">
        <p>Choose a new password below</p>

        <password-reset-form @success="success"></password-reset-form>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
	export default {
		components: {
			'password-reset-form': require('./PasswordResetForm')
		},

		methods: {
			success(form) {
				this.$router.push({ name: 'login', query: {email: form.email} })
			}
		}
	}
</script>
