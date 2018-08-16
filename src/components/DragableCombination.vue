<template>
  <div class="card-body">
    <draggable v-model='listContents'
      class='dragArea row py-1' :options="{group:'subject'}" :move='() => movable'>
      <div v-for="(e, n) in list" :key='e.id'
        class="draggable col-xl-2 col-md-4 col-6 my-1">
        <div class='btn-group btn-group-sm w-100'>
          <button type="button" class="btn" :class='color' style='width: 25%' :disabled="!movable">
            <span v-if="name === 'available'">
              <i class="fas fa-arrows-alt mr-2"></i>
            </span>
            <span v-else class="badge badge-light badge-pill">{{n+1}}</span>
          </button>
          <button type="button" class="btn" :class='color' :disabled="!movable"
            v-for="s in e.subjects" :key='s.id' style='width: 37.5%'>
            {{getName(s)}}
          </button>
        </div>
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import subjects from '@/data/subject'

import {mapActions} from 'vuex'
import _ from 'lodash'

export default {
  props: ['list', 'color', 'name', 'movable'],
  computed: {
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
    ...mapActions('student', ['updatePriorities']),
    getName (code) {
      return _.find(subjects, {code}).slug
    }
  }
}
</script>

<style>
.dragArea {
  min-height: 50px;
}
</style>
