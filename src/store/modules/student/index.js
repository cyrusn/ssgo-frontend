// modules student only handle events for a specific student

import _ from 'lodash'
import { checkError, alertMessage } from '@/store/helpers'

export default {
  namespaced: true,
  state: {
    priorities: [],
    olePriorities: [],
    isConfirmed: false,
    timestamp: null
  },
  mutations: {
    updatePriorities (state, priorities) {
      state.priorities = priorities
    },
    updateOlePriorities (state, olePriorities) {
      state.olePriorities = olePriorities
    },
    updateIsConfirmed (state, isConfirmed) {
      state.isConfirmed = isConfirmed
    },
    updateTimestamp (state, timestamp) {
      state.timestamp = timestamp
    }
  },
  actions: {
    get ({ commit, rootGetters, rootState }) {
      fetch(`./api/student/${rootGetters.userAlias}`, {
        method: 'GET',
        headers: { jwt: rootState.jwt }
      })
        .then(checkError)
        .then(res => res.json())
        .then(json => {
          commit('updatePriorities', json.priorities)
          commit('updateIsConfirmed', json.isConfirmed)
          commit('updateTimestamp', json.timestamp)
        })
        .catch(alertMessage)
    },
    updatePriorities (
      { commit, rootState, rootGetters, dispatch },
      priorities
    ) {
      commit('updatePriorities', priorities)
      fetch(`./api/student/${rootGetters.userAlias}/priorities`, {
        method: 'PUT',
        headers: { jwt: rootState.jwt },
        body: JSON.stringify({ priorities })
      })
        .then(checkError)
        .then(() => {
          dispatch('get')
        })
        .catch(alertMessage)
    },
    updateOlePriorities (
      { commit, rootState, rootGetters, dispatch },
      olePriorities
    ) {
      commit('updateOlePriorities', olePriorities)
      fetch(`./api/student/${rootGetters.userAlias}/ole_priorities`, {
        method: 'PUT',
        headers: { jwt: rootState.jwt },
        body: JSON.stringify({ olePriorities })
      })
        .then(checkError)
        .then(() => {
          dispatch('get')
        })
        .catch(alertMessage)
    },
    setIsConfirmed (
      { dispatch, rootState, rootGetters },
      { userAlias, isconfirmed }
    ) {
      fetch(`./api/student/${userAlias}/isconfirmed/${isconfirmed}`, {
        method: 'PUT',
        headers: { jwt: rootState.jwt }
      })
        .then(checkError)
        .then(() => {
          const { role } = rootGetters
          switch (true) {
            case role === 'STUDENT':
              dispatch('get')
              break
            case _.includes(['TEACHER', 'ADMIN'], role):
              dispatch('students/get', null, { root: true })
              break
          }
        })
        .catch(alertMessage)
    }
  }
}
