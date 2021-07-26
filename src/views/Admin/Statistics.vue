<template>
  <div class="d-flex justify-content-center">
    <div>
      <form>
        <div class="row mb-3 g-1 align-items-center form-group">
          <div class="col-auto">
            <div
              class="form-check form-check-inline"
              v-for="c in clazzes"
              :key="c"
            >
              <label class="form-check-label">{{ c }}</label>
              <input
                type="checkbox"
                class="form-check-input"
                :key="c.id"
                v-model="selectClazzes[c]"
              />
            </div>
          </div>
          <div class="col-auto form-group">
            <select class="form-select" v-model="filterByHasRank">
              <option :value="false">統計所有完成選科程序的學生</option>
              <option :value="true">只統計有排名的學生</option>
            </select>
          </div>
          <label for="">統計人數：{{ noOfAllocation.length }}</label>
        </div>
      </form>
      <table class="table caption-top text-center">
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
    </div>
  </div>
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
      filterByHasRank: false,
      selectClazzes: {
        '3A': true,
        '3B': true,
        '3C': true,
        '3D': true,
        '3E': false
      },
      clazzes: ['3A', '3B', '3C', '3D'],
      combinations
    }
  },
  computed: {
    ...mapState('students', ['students']),
    noOfAllocation () {
      const { students, filterByHasRank, selectClazzes } = this
      return students
        .filter(s => {
          if (!s.isConfirmed) {
            return false
          }

          if (filterByHasRank) {
            return s.rank > 0
          }

          return true
        })
        .filter(s => {
          return Object.keys(selectClazzes)
            .filter(clz => selectClazzes[clz])
            .includes(s.classcode)
        })
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
