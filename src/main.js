import { createApp, h } from 'vue'
import App from '@/App.vue'
import { router } from '@/router'
import store from '@/store'
import { sync } from 'vuex-router-sync'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowsAlt,
  faHourglass,
  faLink,
  faUser,
  faSignInAlt,
  faSignOutAlt,
  faHeart,
  faPrint,
  faListAlt,
  faTrophy,
  faSitemap
} from '@fortawesome/free-solid-svg-icons'

sync(store, router)

library.add(
  faArrowsAlt,
  faHourglass,
  faLink,
  faUser,
  faSignInAlt,
  faSignOutAlt,
  faHeart,
  faPrint,
  faListAlt,
  faTrophy,
  faSitemap
)

const app = createApp({
  render () {
    return h(App)
  }
})

app.component('font-awesome-icon', FontAwesomeIcon)
app.config.productionTip = false
app.use(router)
app.use(store)
app.mount('#app')
