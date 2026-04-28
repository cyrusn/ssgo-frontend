<template>
  <div v-if="isAcceptResponses">
    <div v-if="role === 'STUDENT'">
      <router-view />
    </div>
    <div v-else>
      <forbidden />
    </div>
  </div>

  <div v-else>
    <not-accept-response />
  </div>
</template>

<script>
import Forbidden from '@/components/Forbidden.vue'
import NotAcceptResponse from '@/components/NotAcceptResponse.vue'
import { mapGetters } from 'vuex'
import { isAcceptResponses} from '@/config.js'

export default {
  components: {
    Forbidden, NotAcceptResponse
  },
  data() {
    return {
      isAcceptResponses
    }
  },
  computed: {
    ...mapGetters(['role'])
  }
}
</script>
