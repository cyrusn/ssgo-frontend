<template>
  <nav :class="navbarClass">
    <a :class="navbarBrandClass" href="https://liping.edu.hk">聖公會李炳中學</a>
    <button class="navbar-toggler" type="button" @click="onToggle">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbar" v-if="userAlias">
      <ul class="navbar-nav mr-auto">
        <router-list-link v-for="n in Navs" :key="n.id" :name="n.name">
          <span v-html="n.content"></span>
        </router-list-link>

        <li class="nav-item nav-link" @click="onLogout">
          <i class="fas fa-sign-out-alt"></i> 登出
        </li>
      </ul>
      <div>
        <span class="navbar-text mr-2">
          <i class="fas fa-user"></i>
          {{cname}}
        </span>
        <span class="navbar-text">
          <i class="fas fa-hourglass"></i>
          {{expireAtString}}
        </span>
      </div>
    </div>
    <logout-alert/>
  </nav>
</template>

<script>
/* global $ */
import _ from 'lodash'

import teachers from '@/data/teacher'
import students from '@/data/student'

import RouterListLink from '@/components/RouterListLink.vue'
import LogoutAlert from '@/components/LogoutAlert'

import { mapGetters } from 'vuex'

const navbarClass = [
  'navbar',
  'navbar-expand-lg',
  'navbar-light',
  'bg-light',
  'px-lg-5',
  'text-secondary',
  'd-flex',
  'justify-content-between',
  'd-print-none'
]
const navbarBrandClass = ['navbar-brand', 'text-secondary']

export default {
  data () {
    return {
      navbarClass,
      navbarBrandClass
    }
  },
  components: {
    RouterListLink,
    LogoutAlert
  },
  computed: {
    ...mapGetters(['role', 'userAlias', 'expireAt']),
    expireAtString () {
      return this.expireAt.toLocaleString('zh-HK', { hour12: false })
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
          content: '<i class="fas fa-heart"></i> 選科'
        },
        {
          roles: ['STUDENT'],
          name: 'notice',
          content: '<i class="fas fa-print"></i> 列印'
        },
        {
          roles: ['TEACHER', 'ADMIN'],
          name: 'list',
          content: '<i class="fas fa-list-alt"></i> 列表'
        },
        {
          roles: ['ADMIN'],
          name: 'rank',
          content: '<i class="fas fa-trophy"></i> 名次'
        },
        {
          roles: ['ADMIN'],
          name: 'allocation',
          content: '<i class="fas fa-sitemap"></i> 分科'
        }
      ]
      return navs.filter(n => _.includes(n.roles, role))
    }
  },
  methods: {
    onLogout () {
      // when a page reloaded, it will load component 'Forbidden.vue'
      // where the page will be redirected to '/'
      window.location.reload(true)
    },
    onToggle () {
      $('#navbar').collapse('toggle')
    }
  }
}
</script>
