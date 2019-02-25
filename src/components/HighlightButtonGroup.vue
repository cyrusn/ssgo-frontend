<template>
  <div class="card my-4">
    <div class="card-header">
      <h5>選修組</h5>
    </div>

    <div class="card-body">
      <div class="mb-2 mr-2 scroll" v-for="gp in groups" :key="gp.id">
        <div class="btn-toolbar">
          <div class="btn-group btn-group-sm">
            <button class="btn text-nowrap btn-outline-secondary">選修{{gp.name}}</button>
            <button
              class="btn text-nowrap"
              :class="highlightedSubjects[subj.code] ? 'btn-warning': 'btn-primary'"
              v-for="subj in subjects[gp.id]"
              :key="subj.id"
              @click="toggleHighlightedSubject(subj.code)"
            >{{subj.slug}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import subjects from '@/data/subject.json'
import { mapState, mapMutations } from 'vuex'
import _ from 'lodash'

export default {
  data () {
    return {
      groups: [{ id: 1, name: '一' }, { id: 2, name: '二' }],
      subjects: _.groupBy(subjects, 'group')
    }
  },
  computed: {
    ...mapState('subject', ['highlightedSubjects'])
  },
  methods: {
    ...mapMutations('subject', ['toggleHighlightedSubject'])
  }
}
</script>

<style>
.scroll {
  overflow-x: auto;
}
</style>
