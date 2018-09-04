<template>
  <v-form ref="form" @submit.prevent="submit" lazy-validation v-model="valid">
    <v-text-field
        :label="labels.email"
        v-model="form.email"
        type="email"
        :error-messages="errors.email"
        :rules="[rules.required('email')]"
        :disabled="loading"
    ></v-text-field>

    <v-layout row class="mt-2">
      <v-spacer></v-spacer>

      <v-btn
          flat
          :disabled="loading"
          :to="{ name: 'login', query: {email: form.email} }"
          color="grey darken-2"
      >
        Back to login
      </v-btn>

      <v-btn
          type="submit"
          :loading="loading"
          :disabled="loading || !valid"
          color="primary"
      >
        Get password
      </v-btn>
    </v-layout>
  </v-form>
</template>

<script>
  import axios from 'axios'
  import { api } from '~/config'
  import Form from '~/mixins/form'

  export default {
    mixins: [Form],

    data: () => ({
      form: {
        email: null
      }
    }),

    created() {
      this.form.email = this.$route.query.email || null
    },

    methods: {
      submit() {
        if (this.$refs.form.validate()) {
          this.loading = true
          axios.post(api.path('password.forgot'), this.form)
            .then((res) => {
              this.$toast.info('An email with password reset instructions has been sent to your email address.')
              this.$emit('success')
            })
            .catch(err => {
              this.handleErrors(err.response.data.errors)
            })
            .then(() => {
              this.loading = false
            })
        }
      }
    }
  }
</script>
