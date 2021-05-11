<template>
  <div v-if="includes(role)">
    <router-view />
  </div>
  <div v-else>
    <forbidden />
  </div>
</template>

<script>
import _ from 'lodash'
import Forbidden from '@/components/Forbidden.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Forbidden
  },
  computed: {
    ...mapGetters(['role'])
  },
  methods: {
    includes (role) {
      return _.includes(['TEACHER', 'ADMIN'], role)
    }
  }
}
</script>
