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
          class="badge bg-light text-dark text-decoration-none"
          href="https://careers.liping.edu.hk/subject-selection/"
          target="_blank"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="前往本校選科簡介網頁"
        >
          <font-awesome-icon icon="link" /> 科目簡介
        </a>
      </h5>
      <ul class="list-group mb-1" v-for="gp in groups" :key="gp.id">
        <li
          class="list-group-item text-nowrap"
          :class="gp.id == 1 ? 'bg-warning' : 'bg-info'"
        >
          選修{{ gp.name }}
        </li>
        <li class="list-group-item flex-fill text-nowrap text-center">
          <span
            v-for="subj in subjects[gp.id]"
            :key="subj.id"
            @click="toggleHighlightedSubject(subj.code)"
            class="mx-2 p-1 rounded text-dark font-weight-bolder"
            :class="
              highlightedSubjects[subj.code]
                ? gp.id == 1
                  ? 'bg-warning'
                  : 'bg-info'
                : ''
            "
            data-bs-toggle="tooltip"
            :data-bs-placement="gp.id === 1 ? 'top' : 'bottom'"
            :title="subj.cname"
          >
            {{ subj.slug }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import subjects from '@/data/subject.json'
import { mapState, mapMutations } from 'vuex'
import _ from 'lodash'
import { Tooltip } from 'bootstrap'

export default {
  mounted () {
    Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]')).forEach(
      tooltipNode => new Tooltip(tooltipNode)
    )
  },
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
