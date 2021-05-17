<template>
  <div>
    <instruction v-if="!isConfirmed" />
    <confirm-priorities />
    <highlight-button-group />
    <div class="card" v-if="!isConfirmed">
      <h5 class="card-header bg-light">可供選擇的科目組合</h5>
      <div class="card-body">
        <draggable
          :list="availableCombinations"
          itemKey="id"
          ghost-class="ghost"
          class="row"
          group="subject"
        >
          <template #item="{element, index}">
            <div class="col-xl-2 col-md-4 col-6 my-1 px-1">
              <subject-group
                :element="element"
                :index="index"
                :movable="!isConfirmed"
                name="available"
              />
            </div>
          </template>
        </draggable>
      </div>
    </div>

    <div class="card my-4">
      <h5 class="card-header">
        {{ isConfirmed ? '已確定的選科次序' : '已選擇的選科次序' }}
        <small v-if="isConfirmed">
          （同學已於<formatted-datetime
            :datetime="timestamp.Time"
            format="llll"
          />確定選科次序）
        </small>
        <small v-else>
          （請將以上選科項目拖到以下方格內，並按優次將選科意願排序。）
        </small>
      </h5>
      <div class="card-body">
        <div class="row">
          <draggable
            :list="prioritisedCombinations"
            itemKey="id"
            class="row"
            group="subject"
            @change="onChange"
            @start="dragging = !isConfirmed"
          >
            <template #item="{element, index}">
              <div class="col-xl-2 col-md-4 col-6 my-1 px-1">
                <subject-group
                  :element="element"
                  :index="index"
                  :movable="!isConfirmed"
                  name="prioritised"
                />
              </div>
            </template>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SubjectGroup from '@/components/SubjectGroup'
import ConfirmPriorities from '@/components/ConfirmPriorities'
import Instruction from '@/components/Instruction'
import HighlightButtonGroup from '@/components/HighlightButtonGroup'
import FormattedDatetime from '@/components/FormattedDatetime'
import combinations from '@/data/combination'
import Draggable from 'vuedraggable'

import _ from 'lodash'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    SubjectGroup,
    Draggable,
    ConfirmPriorities,
    Instruction,
    HighlightButtonGroup,
    FormattedDatetime
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

<style scoped>
.sortable-ghost,
.ghost {
  opacity: 0.5;
}
</style>
