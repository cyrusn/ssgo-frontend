<template>
  <div>
    <div v-if="!confirmable" class="alert alert-primary">尚未完成，同學必須將所有選科組合排序。</div>
    <div v-else-if="!isConfirmed" class="alert alert-danger">尚未完成，請確定選科次序</div>

    <button
      v-if="!disabled"
      type="button"
      class="btn mr-2 mb-2"
      :class="disabled ? 'btn-secondary' :'btn-danger'"
      :disabled="disabled"
      @click="onClickConfirmButton"
    >{{ isConfirmed ? '已確定選科次序' : '確定選科次序' }}</button>

    <div
      class="modal fade"
      id="confirmPrioritiesModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="confirmPrioritiesModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="confirmPrioritiesModalLabel">確定選科次序</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div v-html="warningMessage"></div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button
              type="button"
              class="btn btn-danger"
              @click="onConfirm"
              :disabled="disabled"
            >確定遞交</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import combinations from '@/data/combination'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  created () {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
  },
  data () {
    return {
      warningMessage: `<p>
          是否確定？確定遞交後，同學一概<u><b>不得</b></u>更改選科排序。
        </p>`
    }
  },
  computed: {
    ...mapState('student', ['priorities', 'isConfirmed']),
    ...mapGetters(['userAlias']),
    disabled () {
      const { isConfirmed, confirmable } = this
      return isConfirmed || !confirmable
    },
    confirmable () {
      return this.priorities.length === combinations.length
    }
  },
  methods: {
    ...mapActions('student', ['setIsConfirmed']),
    onConfirm () {
      const { userAlias } = this
      const isconfirmed = true
      this.setIsConfirmed({ userAlias, isconfirmed })
      $('#confirmPrioritiesModal').modal('hide')
    },
    onClickConfirmButton () {
      $('#confirmPrioritiesModal').modal('show')
    }
  }
}
</script>
