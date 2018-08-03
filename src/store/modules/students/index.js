// modules students only handle event about list of students

import {checkError, alertMessage} from '@/store/helpers'
import _ from 'lodash'
import students from '@/data/student.json'

export default {
  namespaced: true,
  state: {
    'students': [
    /*
        'userAlias': String
        'name': String,
        'cname': String,
        'classcode': String,
        'classno': Number,
        'priorities': [Number],
        'isConfirmed': Boolean
      */
    ]
  },
  mutations: {
    update (state, students) {
      state.students = students
    }
  },
  actions: {
    get ({commit, rootState}) {
      fetch('./api/students', {
        method: 'GET',
        headers: {jwt: rootState.jwt}
      })
        .then(checkError)
        .then(res => res.json())
        .then(ss => {
          const list = _(ss).map(s => {
            const {userAlias} = s
            return Object.assign({}, _.find(students, {userAlias}), s)
          })
            .orderBy('classNo')
            .value()
          commit('update', list)
        })
        .catch(alertMessage)
    },
    updateRanks ({rootState, dispatch}, json) {
      fetch(`./api/students/rank`, {
        method: 'PUT',
        headers: { jwt: rootState.jwt },
        body: JSON.stringify(json)
      })
        .then(checkError)
        .then(() => {
          dispatch('get')
        })
        .catch(alertMessage)
    }
  }
}
