<template>
  <h5 class="mb-4">獲分發學位人數: {{ noOfAllocation.length }}</h5>
  <table class="caption-top text-center">
    <caption>
      首三志願的人次統計
    </caption>
    <tr class="border">
      <th class="px-4 py-1 border">科目</th>
      <th class="px-4 py-1 border">人次</th>
    </tr>
    <tr class="border" v-for="stat in statistics" :key="stat.code">
      <td class="px-4 py-1 border">{{ stat.cname }}</td>
      <td class="px-4 py-1 border">{{ stat.count }}</td>
    </tr>
  </table>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'
import combinations from '@/data/combination.json'
import subjects from '@/data/subject.json'

function getCombinationPreferences (combinations, students) {
  return _.flatten(
    students
      .map(s => s.priorities.slice(0, 3))
      .map(combIds => {
        return _(combIds)
          .map(id => _.find(combinations, { id }))
          .map(comb => {
            return _.flatten(comb.subjects)
          })
          .flatten()
          .uniq()
          .value()
      })
  ).sort()
}

export default {
  data () {
    return {
      combinations
    }
  },
  computed: {
    ...mapState('students', ['students']),
    noOfAllocation () {
      return this.students.filter(s => s.isConfirmed && s.rank > 0)
    },
    statistics () {
      const preferences = getCombinationPreferences(
        combinations,
        this.noOfAllocation
      )

      return Object.assign([], subjects).map(subject => {
        subject.count = preferences.filter(p => subject.code === p).length
        return subject
      })
    }
  }
}
</script>
