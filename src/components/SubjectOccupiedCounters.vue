<template>
  <div class="row">
    <div v-for="g in groups" :key="g.id" class="col-6">
      <h4>選修{{ g }}組</h4>
      <ul class="list-group">
        <li v-for="s in subjects[g]" :key="s.id" class="list-group-item py-1">
          <span>{{ s.slug }}</span>
          <span class="ms-2 badge bg-secondary rounded-pill"
            >{{ counters[s.code] }} / {{ capacities[s.code] }}</span
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import subjects from '@/data/subject'
import _ from 'lodash'

export default {
  data () {
    return {
      groups: [1, 2]
    }
  },
  computed: {
    ...mapState('subject', ['capacities']),
    subjects () {
      return _.groupBy(subjects, 'group')
    }
  },
  props: ['counters']
}
</script>
