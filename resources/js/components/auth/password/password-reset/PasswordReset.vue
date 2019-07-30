<template>
  <v-card>
    <v-toolbar dark color="primary" flat>
      <v-toolbar-title>Password reset</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <p>Choose a new password below</p>

      <password-reset-form @success="success"></password-reset-form>
    </v-card-text>
  </v-card>
</template>

<script>
import PasswordResetForm from './PasswordResetForm'

export default {
	components: {
		PasswordResetForm
	},

	methods: {
		success(form) {
			this.$router.push({ name: 'login', query: {email: form.email} })
		}
	}
}
</script>
