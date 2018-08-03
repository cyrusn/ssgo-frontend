<template>
  <div class="row">
    <div v-for="g in groups" :key="g.id" class="list-group col-6">
      <h4 class="text-center">選修{{g}}組</h4>
      <div v-for="s in subjects[g]" :key='s.id' class="list-group-item">
        {{s.slug}} <span class="float-right badge badge-secondary badge-pill">{{counters[s.code]}} / {{capacities[s.code]}}</span>
      </div>
      <hr>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
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
