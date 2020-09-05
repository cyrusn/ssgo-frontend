<template>
  <nav :class="navbarClass">
    <a :class="navbarBrandClass" href="https://liping.edu.hk">聖公會李炳中學</a>
    <button class="navbar-toggler" type="button" @click="onToggle">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbar" v-if="userAlias">
      <ul class="navbar-nav mr-auto">
        <router-list-link v-for="n in Navs" :name="n.name" :key="n.id">
          <font-awesome-icon :icon="n.icon" /> {{n.content}}
        </router-list-link>
        <li class="nav-item nav-link" @click="onLogout">
          <font-awesome-icon icon="sign-out-alt" /> 登出
        </li>
      </ul>
      <div>
        <span class="navbar-text mr-2">
          <font-awesome-icon icon="user" />
          {{cname}}
        </span>
        <span class="navbar-text">
          <font-awesome-icon icon="hourglass" />&nbsp;<formatted-datetime :datetime='expireAtString' format='llll' />
        </span>
      </div>
    </div>
    <logout-alert/>
  </nav>
</template>

<script>
import $ from 'jquery'
import _ from 'lodash'

import teachers from '@/data/teacher'
import students from '@/data/student'

import RouterListLink from '@/components/RouterListLink.vue'
import LogoutAlert from '@/components/LogoutAlert'
import FormattedDatetime from '@/components/FormattedDatetime'

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
    FormattedDatetime,
    RouterListLink,
    LogoutAlert
  },
  computed: {
    ...mapGetters(['role', 'userAlias', 'expireAt']),
    expireAtString () {
      return this.expireAt
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
