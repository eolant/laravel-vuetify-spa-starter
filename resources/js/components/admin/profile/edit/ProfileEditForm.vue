<template>
  <v-form ref="form" @submit.prevent="submit" lazy-validation v-model="valid">
    <v-card>
      <v-card-text>
        <v-text-field
            :label="labels.name"
            v-model="form.name"
            :error-messages="errors.name"
            :rules="[rules.required('name')]"
            :disabled="loading"
        ></v-text-field>

        <v-text-field
            :label="labels.email"
            v-model="form.email"
            type="email"
            :error-messages="errors.email"
            :rules="[rules.required('email')]"
            :disabled="loading"
        ></v-text-field>
      </v-card-text>
    </v-card>

    <h3 class="headline mb-3 mt-5">Password</h3>

    <v-card>
      <v-card-text>
        <v-text-field
            :label="labels.password"
            v-model="form.password"
            :append-icon="passwordHidden ? 'visibility_off' : 'visibility'"
            @click:append="() => (passwordHidden = !passwordHidden)"
            :type="passwordHidden ? 'password' : 'text'"
            :error-messages="errors.password"
            :disabled="loading"
            hint="At least 6 characters"
            autocomplete="new-password"
        ></v-text-field>

        <v-text-field
            :label="labels.password_confirmation"
            v-model="form.password_confirmation"
            :type="passwordHidden ? 'password' : 'text'"
            :error-messages="errors.password_confirmation"
            :disabled="loading"
            autocomplete="new-password"
        ></v-text-field>
      </v-card-text>
    </v-card>

    <v-layout row mt-5>
      <v-spacer></v-spacer>

      <v-btn
          flat
          :disabled="loading"
          :to="{ name: 'profile' }"
          color="grey darken-2"
      >
        Cancel
      </v-btn>

      <v-btn
          type="submit"
          :loading="loading"
          :disabled="loading"
          color="primary"
      >
        Save
      </v-btn>
    </v-layout>
  </v-form>
</template>

<script>
  import axios from 'axios'
  import { mapGetters } from 'vuex'
  import { api } from '~/config'
  import Form from '~/mixins/form'

  export default {
    mixins: [Form],

    data: () => ({
      passwordHidden: true,

      label: {
        password: 'New Password',
        password_confirmation: 'Confirm New Password',
      },

      form: {
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
      }
    }),

    computed: mapGetters({
      auth: 'auth/user'
    }),

    mounted() {
      this.form = Object.assign(this.form, this.auth)
    },

    methods: {
      submit() {
        if (this.$refs.form.validate()) {
          this.loading = true

          axios.put(api.path('profile'), this.form)
            .then(res => {
              this.$toast.success('Your profile successfully updated.')
              this.$emit('success', res.data)
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
