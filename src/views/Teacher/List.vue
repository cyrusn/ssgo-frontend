<template>
  <div>
    <form>
      <div class="row g-1 align-items-center">
        <div class="col-auto">
          <select class="form-select" v-model="classcodeFilter">
            <option value="">篩選班別</option>
            <option v-for="c in clazzes" :key="c.id" :value="c">{{ c }}</option>
          </select>
        </div>

        <div class="col-auto">
          <select class="form-select" v-model="isConfirmedFilter">
            <option value="">篩選確定</option>
            <option value="confirmed">已確定</option>
            <option value="unconfirmed">尚未確定</option>
          </select>
        </div>
        <div class="col-auto">
          <select class="form-select" v-model="isX3Filter">
            <option value="">篩選3X</option>
            <option value="x3">收讀</option>
            <option value="notX3">不適用</option>
          </select>
        </div>
        <download-list-button-group
          :list="filteredStudents"
          :filename="filename"
          :role="role"
        />
      </div>
    </form>
    <student-table :list="filteredStudents" :signatures="signatures" />
  </div>
</template>

<script>
import StudentTable from '@/components/StudentTable'
import DownloadListButtonGroup from '@/components/DownloadListButtonGroup'

import _ from 'lodash'
import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    StudentTable,
    DownloadListButtonGroup
  },
  data () {
    return {
      clazzes: ['3A', '3B', '3C', '3D', '3E'],
      filterType: 0,
      classcodeFilter: '',
      isConfirmedFilter: '',
      isX3Filter: ''
    }
  },
  computed: {
    filename () {
      const { classcodeFilter, isConfirmedFilter } = this
      const names = ['student', classcodeFilter, isConfirmedFilter]
      return _.compact(names).join('-')
    },
    ...mapState('students', ['students', 'signatures']),
    ...mapGetters(['role']),
    filteredStudents () {
      const { students, classcodeFilter, isConfirmedFilter, isX3Filter } = this
      return _(students)
        .filter(s => {
          if (classcodeFilter) {
            return s.classcode === classcodeFilter
          }
          return true
        })
        .filter(s => {
          switch (isConfirmedFilter) {
            case 'confirmed':
              return s.isConfirmed
            case 'unconfirmed':
              return !s.isConfirmed
            default:
              return true
          }
        })
        .filter(s => {
          switch (isX3Filter) {
            case 'x3':
              return s.isX3
            case 'notX3':
              return !s.isX3
            default:
              return true
          }
        })
        .orderBy(['classcode', 'classno'])
        .value()
    }
  }
}
</script>
