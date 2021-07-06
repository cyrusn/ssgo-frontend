<template>
  <input type="number" class="form-control" v-model.number="capacity" />
</template>

<script>
import { mapState, mapActions } from 'vuex'

import _ from 'lodash'

export default {
  created () {
    this.updateCapacity = _.debounce(this.updateCapacity, 500)
  },
  props: ['code'],
  data () {
    return {
      value: this.capacity
    }
  },
  computed: {
    ...mapState('subject', ['capacities']),
    capacity: {
      get () {
        const { capacities, code } = this
        return capacities[code]
      },
      set (newValue) {
        const { code, updateCapacity } = this
        updateCapacity({
          code,
          capacity: newValue
        })
      }
    }
  },
  methods: {
    ...mapActions('subject', ['updateCapacity'])
  }
}
</script>
