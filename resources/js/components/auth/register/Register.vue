<template>
  <v-flex sm8 md6 lg4>
    <v-card>
      <v-toolbar dark color="primary" flat>
        <v-toolbar-title>Register</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <register-form @success="success"></register-form>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
import RegisterForm from './RegisterForm'

export default {
  components: {
    RegisterForm
  },

  methods: {
    success(data) {
      this.$store.dispatch('auth/saveToken', data)
      this.$store.dispatch('auth/setUser', data)
      this.$router.push({ name: 'index' })
    }
  }
}
</script>
