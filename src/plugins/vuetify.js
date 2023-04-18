import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

Vue.use(Vuetify)

const opts = {
  iconfont: 'mdi',
  theme: {
    dark: true,
  },
}

export default new Vuetify(opts)
