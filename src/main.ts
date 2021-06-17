import 'reflect-metadata';
import { createApp } from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

createApp(App)
  .use(router)
  .use(vuetify)
  .use(VueAxios, axios)
  .mount('#app')
