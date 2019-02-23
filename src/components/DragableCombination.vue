<template>
  <div class="card-body">
    <draggable
      v-model="listContents"
      class="dragArea row py-1"
      :options="{group:'subject'}"
      :move="() => movable"
    >
      <div v-for="(e, n) in list" :key="e.id" class="draggable col-xl-2 col-md-4 col-6 my-1 px-1">
        <div class="btn-group btn-group-sm w-100">
          <button
            type="button"
            class="btn"
            :class="color"
            style="max-width: 30%"
            :disabled="!movable"
          >
            <font-awesome-icon icon="arrows-alt" v-if="name === 'available'"/>
            <span v-else class="badge badge-light badge-pill">{{n+1}}</span>
          </button>
          <button
            type="button"
            class="btn"
            :disabled="!movable"
            v-for="s in e.subjects"
            :class="highlightedSubjects[s] ? 'btn-warning' : color"
            :key="s.id"
            @click="toggleHighlightedSubject(s)"
            style="max-width: 45%"
            data-toggle="tooltip"
            data-placement="top"
            :title="getSubject(s).cname"
          >{{getSubject(s).slug}}</button>
        </div>
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import subjects from '@/data/subject'

import { mapActions, mapState, mapMutations } from 'vuex'
import _ from 'lodash'

export default {
  props: ['list', 'color', 'name', 'movable'],
  computed: {
    ...mapState('subject', ['highlightedSubjects']),
    listContents: {
      get () {
        return this.list
      },
      set (val) {
        if (this.name === 'prioritised') {
          this.updatePriorities(val.map(s => s.id))
        }
      }
    }
  },
  components: {
    draggable
  },
  methods: {
    ...mapMutations('subject', ['toggleHighlightedSubject']),
    ...mapActions('student', ['updatePriorities']),
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
