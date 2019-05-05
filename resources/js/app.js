import 'babel-polyfill'

import Vue from 'vue'
import Vuetify from 'vuetify'
import VuetifyToast from 'vuetify-toast-snackbar'

import router from '~/router/index'
import store from '~/store/index'
import App from '$comp/App'
import '~/plugins/index'

Vue.use(Vuetify)

Vue.use(VuetifyToast)

export const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
