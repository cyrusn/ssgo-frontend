// subject modules handle all events about subject / subjects
import { checkError, alertMessage } from '@/store/helpers'
import _ from 'lodash'

export default {
  namespaced: true,
  state: {
    'capacities': {
      phy: 0,
      bio: 0,
      bafs: 0,
      chist: 0,
      ths: 0,
      va: 0,
      chem: 0,
      cscb: 0,
      econ: 0,
      hsmc: 0,
      hist: 0,
      geog: 0,
      ict: 0
    }
  },
  mutations: {
    updateCapacities (state, capacities) {
      state.capacities = Object.assign({}, capacities)
    },
    updateCapacity (state, { code, capacity }) {
      state.capacities[code] = capacity
    }
  },
  actions: {
    list ({ commit, rootState }) {
      fetch('./api/subjects', {
        method: 'GET',
        headers: { jwt: rootState.jwt }
      })
        .then(checkError)
        .then(res => res.json())
        .then(json => {
          return _(json).groupBy('code')
            .mapValues(v => {
              return v[0].capacity
            })
            .value()
        })
        .then(capacities => commit('updateCapacities', capacities))
        .catch(alertMessage)
    },
    updateCapacity ({ commit, rootState, dispatch }, { code, capacity }) {
      if (_.isInteger(capacity)) {
        fetch(`./api/subject/${code}/capacity/${capacity}`, {
          method: 'PUT',
          headers: { jwt: rootState.jwt }
        })
          .then(checkError)
          .then(() => {
            dispatch('list')
          })
          .catch(alertMessage)
      }
    }
  }
}
