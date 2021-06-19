<template>
  <div style="max-width: 720px" class="mx-auto">
    <introduction />
    <instruction />
    <highlight-button-group />
    <prioritise-combination />
    <signature-pad v-if="isPrioritised" />
    <warning-message />
  </div>
</template>

<script>
import PrioritiseCombination from '@/components/PrioritiseCombination'
import SignaturePad from '@/components/SignaturePad'

import Introduction from '@/components/Introduction'
import Instruction from '@/components/Instruction'
import HighlightButtonGroup from '@/components/HighlightButtonGroup'
import WarningMessage from '@/components/WarningMessage'

import combinations from '@/data/combination'
import { mapState } from 'vuex'

export default {
  components: {
    Introduction,
    Instruction,
    HighlightButtonGroup,
    SignaturePad,
    PrioritiseCombination,
    WarningMessage
  },
  computed: {
    ...mapState('student', ['priorities', 'isSigned']),
    isPrioritised () {
      return this.priorities.length === combinations.length
    }
  }
}
</script>
