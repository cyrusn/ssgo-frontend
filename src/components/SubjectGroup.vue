<template>
  <div class="btn-group btn-group-sm w-100">
    <button
      type="button"
      class="btn"
      :class="color"
      style="max-width: 30%"
      :disabled="!movable"
    >
      <font-awesome-icon icon="arrows-alt" v-if="name === 'available'" />
      <span v-else class="badge bg-light text-dark rounded-pill">{{
        index + 1
      }}</span>
    </button>
    <button
      type="button"
      class="btn"
      :disabled="!movable"
      v-for="s in element.subjects"
      :class="highlightedSubjects[s] ? 'btn-warning' : color"
      :key="s.id"
      @click="toggleHighlightedSubject(s)"
      style="max-width: 45%"
      :title="getSubject(s).cname"
    >
      {{ getSubject(s).slug }}
    </button>
  </div>
</template>

<script>
import subjects from '@/data/subject'

import { mapState, mapMutations } from 'vuex'
import _ from 'lodash'

export default {
  props: ['name', 'element', 'index', 'movable'],

  computed: {
    ...mapState('subject', ['highlightedSubjects']),
    color () {
      const { movable, name } = this
      if (!movable && name === 'prioritised') {
        return 'btn-danger'
      }

      if (name === 'available') {
        return 'btn-info'
      }

      if (name === 'notice') {
        return 'btn-lg btn-light'
      }

      return 'btn-success'
    }
  },
  methods: {
    ...mapMutations('subject', ['toggleHighlightedSubject']),

    getSubject (code) {
      return _.find(subjects, { code })
    }
  }
}
</script>

<style>
.dragArea {
  min-height: 50px;
}
</style>
