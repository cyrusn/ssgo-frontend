<template>
  <div class="row mb-4">
    <div class="col-6 row">
      <div v-for="g in groups" :key="g.id" class="list-group col-6">
        <h4 class="text-center">選修{{g}}組</h4>
        <div v-for="s in subjects[g]" :key='s.id' class="list-group-item">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">{{s.slug}} </span>
            </div>
            <input-capacity :code="s.code"/>
          </div>
        </div>
        <hr>
      </div>
    </div>
    <div class="col-6">
      <allocation-result />
    </div>
  </div>
</template>

<script>
import InputCapacity from '@/components/InputCapacity'
import AllocationResult from '@/components/AllocationResult'
import _ from 'lodash'

import {mapState, mapActions} from 'vuex'
import subjects from '@/data/subject'

export default {
  mounted () {
    this.list()
  },
  data () {
    return {
      groups: ['1', '2']
    }
  },
  components: {
    InputCapacity, AllocationResult
  },
  computed: {
    ...mapState('subject', ['capacities']),
    subjects () {
      return _.groupBy(subjects, 'group')
    }
  },
  methods: {
    ...mapActions('subject', ['list'])
  }
}
</script>
