<template>
  <div>
    <h2 class="mb-3 primary--text headline">Your Profile</h2>

    <v-card>
      <v-card-text>
        <v-text-field
            label="Name"
            v-model="user.name"
            box
            readonly
        ></v-text-field>

        <v-text-field
            label="Email"
            v-model="user.email"
            box
            readonly
        ></v-text-field>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data: () => ({
      user: {
        name: null,
        email: null,
      }
    }),

    computed: mapGetters({
      auth: 'auth/user'
    }),

    mounted() {
      this.user = Object.assign(this.user, this.auth)
    }
  }
</script>
