<template>
  <div class="card my-4">
    <div class="card-header">
      <h5>
        選修組
      </h5>
    </div>
    <div class="card-body">
      <h5>
        <a
          class="badge badge-warning"
          href="https://careers.liping.edu.hk/subject-selection/"
          target="_blank"
        >
          <font-awesome-icon icon="link" /> 科目簡介
        </a>
      </h5>
      <div class="btn-toolbar mb-2 mr-2" v-for="gp in groups" :key="gp.id">
        <div class="btn-group btn-group-sm">
          <button class="btn text-nowrap btn-outline-secondary">
            選修{{ gp.name }}
          </button>

          <button
            v-for="subj in subjects[gp.id]"
            class="btn text-nowrap"
            :class="
              highlightedSubjects[subj.code] ? 'btn-warning' : 'btn-primary'
            "
            :key="subj.id"
            @click="toggleHighlightedSubject(subj.code)"
            data-toggle="tooltip"
            :data-placement="gp.id === 1 ? 'top' : 'bottom'"
            :title="subj.cname"
          >
            {{ subj.slug }}
          </button>
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
      groups: [
        { id: 1, name: '一' },
        { id: 2, name: '二' }
      ],
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
