<template>
  <div>
    <instruction v-if="!isConfirmed"/>
    <confirm-priorities/>
    <highlight-button-group/>
    <div class="card" v-if="!isConfirmed">
      <h5 class="card-header bg-light">可供選擇的科目組合</h5>
      <dragable-combination
        :list="availableCombinations"
        :movable="!isConfirmed"
        name="available"
        color="btn-info"
      />
    </div>

    <div class="card my-4">
      <h5 class="card-header">
        {{isConfirmed ? "已確定的選科次序" : "已選擇的選科次序" }}
        <small v-if="isConfirmed">
          （同學已於<formatted-datetime :datetime='timestamp.Time' format='llll' />確定選科次序）
        </small>
        <small v-else>
          （請將以上選科項目拖到以下方格內，並按優次將選科意願排序。）
        </small>
      </h5>
      <dragable-combination
        :list="prioritisedCombinations"
        :movable="!isConfirmed"
        name="prioritised"
        :color="isConfirmed? 'btn-success' : 'btn-danger' "
      />
    </div>
  </div>
</template>

<script>
import DragableCombination from '@/components/DragableCombination'
import ConfirmPriorities from '@/components/ConfirmPriorities'
import Instruction from '@/components/Instruction'
import HighlightButtonGroup from '@/components/HighlightButtonGroup'
import FormattedDatetime from '@/components/FormattedDatetime'
import combinations from '@/data/combination'

import _ from 'lodash'
import { mapState } from 'vuex'

export default {
  components: {
    DragableCombination,
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
  }
}
</script>
