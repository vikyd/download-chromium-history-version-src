import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import VueGtag from 'vue-gtag'

if (process.env.NODE_ENV === 'production') {
  Vue.use(VueGtag, { config: { id: 'G-4E79MB05YF' } }, router)
}

Vue.component('v-select', vSelect)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
