import Vue from 'vue'
import App from './App.vue'

import vuetify from './plugins/vuetify' // path to vuetify export

import './assets/main.css'

new Vue({
  vuetify,
  render: h => h(App),
}).$mount('#app')
