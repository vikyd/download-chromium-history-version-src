import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueGtag from 'vue-gtag'

const app = createApp(App)

if (process.env.NODE_ENV === 'production') {
  app.use(VueGtag, { config: { id: 'G-4E79MB05YF' } }, router)
}

app.use(router)
app.mount('#app')
