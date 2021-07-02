<template>
  <div class="card" v-if="!isConfirmed">
    <h5 class="card-header bg-light">尚未編排的選科組合</h5>
    <div class="card-body">
      <draggable
        :list="availableCombinations"
        itemKey="id"
        ghost-class="ghost"
        class="row"
        group="subject"
        delay="100"
        delayOnTouchOnly="true"
      >
        <template #item="{element, index}">
          <ul class="list-group list-group-horizontal col-md-4 col-6 mb-1 px-1">
            <subject-group
              :element="element"
              :index="index"
              :movable="!isConfirmed"
              name="available"
            />
          </ul>
        </template>
      </draggable>
    </div>
  </div>
  <div class="card my-4">
    <h5 class="card-header">
      已{{ isConfirmed ? '確定' : '編排' }}的選科組合次序
    </h5>
    <div class="card-body">
      <draggable
        :list="prioritisedCombinations"
        itemKey="id"
        class="row"
        group="subject"
        delay="100"
        delayOnTouchOnly="true"
        @change="onChange"
        @start="dragging = !isConfirmed"
      >
        <template #item="{element, index}">
          <div
            class="list-group list-group-horizontal col-md-4 col-6 mb-1 px-1"
          >
            <subject-group
              :element="element"
              :index="index"
              :movable="!isConfirmed"
              :isConfirmed="isConfirmed"
              name="prioritised"
            />
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script>
import SubjectGroup from '@/components/SubjectGroup'
import combinations from '@/data/combination'
import Draggable from 'vuedraggable'

import _ from 'lodash'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    SubjectGroup,
    Draggable
  },
  computed: {
    ...mapState('student', ['priorities', 'isConfirmed', 'timestamp']),
    availableCombinations () {
      const { priorities } = this
      return _.filter(combinations, comb => !_.includes(priorities, comb.id))
    },
    prioritisedCombinations () {
      const { priorities } = this
      return _.map(priorities, id => _.find(combinations, { id }))
    }
  },
  methods: {
    ...mapActions('student', ['updatePriorities']),
    onChange () {
      const { prioritisedCombinations, updatePriorities } = this
      const ids = prioritisedCombinations.map(e => e.id)
      updatePriorities(_.uniq(ids))
    }
  }
}
</script>

<style>
.sortable-ghost,
.ghost {
  opacity: 0.2;
}
</style>
