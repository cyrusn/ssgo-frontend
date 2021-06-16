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
  faExclamationTriangle,
  faHeart,
  faHourglass,
  faLink,
  faListAlt,
  faPrint,
  faSignInAlt,
  faSignOutAlt,
  faSitemap,
  faTrophy,
  faUser
} from '@fortawesome/free-solid-svg-icons'

sync(store, router)

library.add(
  faArrowsAlt,
  faExclamationTriangle,
  faHeart,
  faHourglass,
  faLink,
  faListAlt,
  faPrint,
  faSignInAlt,
  faSignOutAlt,
  faSitemap,
  faTrophy,
  faUser
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
