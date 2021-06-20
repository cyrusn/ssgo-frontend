<template>
  <li class="list-group-item flex-fill">
    <span
      class="me-2 badge bg-primary text-light rounded-pill"
      :class="color"
      v-if="name === 'available'"
    >
      <font-awesome-icon icon="arrows-alt" />
    </span>
    <span
      v-else
      class="badge text-light rounded-pill rounded-pill"
      :class="isConfirmed ? 'bg-success ' : 'bg-danger'"
      >{{ index + 1 }}</span
    >
    <span
      v-for="(s, n) in element.subjects"
      class="ms-2 p-1 rounded font-weight-bolder"
      :class="
        highlightedSubjects[s]
          ? n == 0
            ? 'bg-warning'
            : 'bg-info'
          : 'text-dark '
      "
      :key="s.id"
      @click="toggleHighlightedSubject(s)"
      :title="getSubject(s).cname"
    >
      {{ getSubject(s).slug }}
    </span>
  </li>
</template>

<script>
import subjects from '@/data/subject'

import { mapState, mapMutations } from 'vuex'
import _ from 'lodash'

export default {
  props: ['name', 'element', 'index', 'movable'],

  computed: {
    ...mapState('subject', ['highlightedSubjects'])
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
