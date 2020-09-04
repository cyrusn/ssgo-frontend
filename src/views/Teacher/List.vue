<template>
  <div>
    <form>
      <div class="form-row align-items-center">
        <div class="col-auto">
          <select class="custom-select" v-model='classcodeFilter'>
            <option value=''>篩選班別</option>
            <option v-for="c in clazzes" :key="c.id" :value='c'>{{c}}</option>
          </select>
        </div>

        <div class="col-auto">
          <select class="custom-select" v-model='isConfirmedFilter'>
            <option value=''>篩選確定</option>
            <option value='confirmed'>已確定</option>
            <option value='unconfirmed'>尚未確定</option>
          </select>
        </div>
        <download-list-button-group
          :list="filteredStudents"
          :filename="filename"
          :role='role'
        />
      </div>
    </form>
    <student-table :list="filteredStudents"/>
  </div>
</template>

<script>
import StudentTable from '@/components/StudentTable'
import DownloadListButtonGroup from '@/components/DownloadListButtonGroup'

import _ from 'lodash'
import {mapState, mapGetters} from 'vuex'

export default {
  components: {
    StudentTable, DownloadListButtonGroup
  },
  data () {
    return {
      clazzes: ['3A', '3B', '3C', '3D', '3E'],
      filterType: 0,
      classcodeFilter: '',
      isConfirmedFilter: ''
    }
  },
  computed: {
    filename () {
      const {classcodeFilter, isConfirmedFilter} = this
      const names = ['student', classcodeFilter, isConfirmedFilter]
      return _.compact(names).join('-')
    },
    ...mapState('students', ['students']),
    ...mapGetters(['role']),
    filteredStudents () {
      const {students, classcodeFilter, isConfirmedFilter} = this
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
        .orderBy(['classcode', 'classno'])
        .value()
    }
  }
}
</script>
