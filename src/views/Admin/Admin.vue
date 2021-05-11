<template>
  <div v-if="role === 'ADMIN'">
    <router-view />
  </div>
  <div v-else>
    <forbidden />
  </div>
</template>

<script>
import Forbidden from '@/components/Forbidden.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Forbidden
  },
  computed: {
    ...mapGetters(['role'])
  }
}
</script>
