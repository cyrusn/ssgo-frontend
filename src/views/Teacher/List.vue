<template>
  <div>
    <form>
      <div class="form-row align-items-center">
        <div class="col-auto">
          <select class="custom-select" v-model='classcode'>
            <option value=''>篩選班別</option>
            <option v-for="c in clazzes" :key="c.id" :value='c'>{{c}}</option>
          </select>
        </div>

        <div class="col-auto">
          <select class="custom-select" v-model='isConfirmed'>
            <option value=''>篩選確認</option>
            <option value='true'>已確認</option>
            <option value='false'>尚未確認</option>
          </select>
        </div>
        <download-list-button-group :list="filteredStudents" />
      </div>
    </form>
    <student-table :list="filteredStudents"/>
  </div>
</template>

<script>
import StudentTable from '@/components/StudentTable'
import DownloadListButtonGroup from '@/components/DownloadListButtonGroup'

import _ from 'lodash'
import {mapState} from 'vuex'

export default {
  components: {
    StudentTable, DownloadListButtonGroup
  },
  data () {
    return {
      clazzes: ['3A', '3B', '3C', '3D', '3E'],
      filterType: 0,
      classcode: '',
      isConfirmed: ''
    }
  },
  computed: {
    ...mapState('students', ['students']),
    filteredStudents () {
      const {students, classcode, isConfirmed} = this
      return _(students)
        .filter(s => {
          if (classcode) {
            return s.classcode === classcode
          }
          return true
        })
        .filter(s => {
          switch (isConfirmed) {
            case 'true':
              return s.isConfirmed
            case 'false':
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
