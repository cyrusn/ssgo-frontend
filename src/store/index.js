// root state handle event for auth and user information

import Vue from 'vue'
import Vuex from 'vuex'
import student from '@/store/modules/student'
import students from '@/store/modules/students'
import subject from '@/store/modules/subject'

import { checkError, alertMessage } from '@/store/helpers'
import _ from 'lodash'

Vue.use(Vuex)

function parseJWT (jwt) {
  const base64Url = jwt.split('.')[1]
  const base64 = base64Url.replace('-', '+').replace('_', '/')
  return JSON.parse(atob(base64))
}

export default new Vuex.Store({
  modules: {
    student,
    students,
    subject
  },
  state: {
    jwt: '',
    message: ''
  },
  getters: {
    role: state => (state.jwt ? parseJWT(state.jwt).Role : ''),
    userAlias: state => (state.jwt ? parseJWT(state.jwt).UserAlias : ''),
    expireAt: state =>
      state.jwt ? new Date(parseJWT(state.jwt).exp * 1000) : new Date()
  },
  mutations: {
    updateJWT (state, jwt) {
      state.jwt = jwt
    },
    updateMessage (state, message) {
      state.message = message
    }
  },
  actions: {
    login ({ commit, dispatch, getters }, { userAlias, password }) {
      fetch('./api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ userAlias, password })
      })
        .then(checkError)
        .then(res => res.text())
        .then(text => {
          return text
        })
        .then(text => commit('updateJWT', text))
        .then(() => {
          const { role } = getters
          switch (true) {
            case role === 'STUDENT':
              dispatch('student/get')
              break
            case _.includes(['TEACHER', 'ADMIN'], role):
              dispatch('students/get')
              break
          }
        })
        .catch(alertMessage)
    },
    refreshJWT ({ state, commit }) {
      fetch('./api/auth/refresh/jwt', {
        method: 'GET',
        headers: { jwt: state.jwt }
      })
        .then(checkError)
        .then(res => res.text())
        .then(text => {
          return text
        })
        .then(text => commit('updateJWT', text))
        .catch(alertMessage)
    }
  }
})
