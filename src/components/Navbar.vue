<template>
  <nav :class="navbarClass">
    <div class="container-fluid">
      <a :class="navbarBrandClass" href="https://liping.edu.hk"
        >聖公會李炳中學</a
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbar" v-if="userAlias">
        <ul class="navbar-nav me-auto">
          <router-list-link v-for="n in Navs" :name="n.name" :key="n.id">
            <font-awesome-icon :icon="n.icon" /> {{ n.content }}
          </router-list-link>
          <li class="nav-item nav-link" @click="onLogout">
            <font-awesome-icon icon="sign-out-alt" /> 登出
          </li>
        </ul>
        <span class="navbar-text me-2">
          <font-awesome-icon icon="user" />
          {{ cname }}
        </span>
        <button
          id="logoutCounter"
          class="btn btn-outline-danger"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title="更新登出時間"
          @click="refreshJWT"
          @mouseover="toggle"
        >
          <font-awesome-icon icon="hourglass" />{{ ' ' }} 尚餘{{
            logoutFromNow
          }}
        </button>
      </div>
      <logout-alert />
    </div>
  </nav>
</template>

<script>
import _ from 'lodash'

import teachers from '@/data/teacher'
import students from '@/data/student'

import RouterListLink from '@/components/RouterListLink.vue'
import LogoutAlert from '@/components/LogoutAlert'
import moment from 'moment'

import { mapGetters, mapActions } from 'vuex'
import { Tooltip } from 'bootstrap'

const navbarClass = [
  'navbar',
  'navbar-expand-lg',
  'navbar-light',
  'bg-light',
  'px-lg-5',
  'text-secondary',
  'd-print-none'
]
const navbarBrandClass = ['navbar-brand', 'text-secondary']

export default {
  mounted () {
    const { updateLogoutFromNow } = this
    setInterval(() => {
      updateLogoutFromNow()
    }, 500)
  },
  data () {
    return {
      navbarClass,
      navbarBrandClass,
      logoutFromNow: 0
    }
  },
  components: {
    RouterListLink,
    LogoutAlert
  },
  computed: {
    ...mapGetters(['role', 'userAlias', 'expireAt']),
    logoutCounter () {
      return new Tooltip(document.getElementById('logoutCounter'))
    },
    cname () {
      const { userAlias, role } = this
      if (role === 'STUDENT') {
        return _.find(students, { userAlias }).cname + '同學'
      }
      return _.find(teachers, { userAlias }).cname + '老師'
    },
    Navs () {
      const { role } = this
      const navs = [
        {
          roles: ['STUDENT'],
          name: 'selection',
          icon: 'heart',
          content: '選科'
        },
        {
          roles: ['STUDENT'],
          name: 'notice',
          icon: 'print',
          content: '列印'
        },
        {
          roles: ['TEACHER', 'ADMIN'],
          name: 'list',
          icon: 'list-alt',
          content: '列表'
        },
        {
          roles: ['ADMIN'],
          name: 'rank',
          icon: 'trophy',
          content: '名次'
        },
        {
          roles: ['ADMIN'],
          name: 'allocation',
          icon: 'sitemap',
          content: '分科'
        }
      ]
      return navs.filter(n => _.includes(n.roles, role))
    }
  },
  methods: {
    ...mapActions(['refreshJWT']),
    onLogout () {
      // when a page reloaded, it will load component 'Forbidden.vue'
      // where the page will be redirected to '/'
      window.location.reload(true)
    },
    toggle () {
      this.logoutCounter.show()
    },
    updateLogoutFromNow () {
      moment.updateLocale('zh-hk', {
        relativeTime: {
          mm: '%d分鐘'
        }
      })
      this.logoutFromNow = moment(this.expireAt).fromNow(true)
    }
  }
}
</script>
