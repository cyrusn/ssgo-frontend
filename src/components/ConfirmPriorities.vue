<template>
  <div v-if="!confirmable" class="alert alert-primary">
    <span><font-awesome-icon icon="exclamation-triangle"/></span>
    {{ ' ' }}尚未完成，同學必須將所有選科組合排序。
  </div>

  <div v-else-if="!isConfirmed" class="alert alert-danger">
    <h4>確定選科次序</h4>
    <p>
      <span><font-awesome-icon icon="exclamation-triangle"/></span>
      {{ ' ' }}尚未完成，同學必須確定選科次序。
    </p>
    <button
      type="button"
      class="btn me-2 mb-2"
      :class="isConfirmed ? 'btn-secondary' : 'btn-danger'"
      :disabled="isConfirmed"
      @click="onClickConfirmButton"
    >
      確定選科次序
    </button>
  </div>

  <div v-else class="alert alert-danger">
    <span><font-awesome-icon icon="exclamation-triangle"/></span>
    {{ ' ' }}
    同學必須列印選科意向表列印並交家長簽署，並於<formatted-datetime
      :datetime="deadline"
      format="l"
    />或之前交回予班主任或校務處收集箱。
  </div>

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
          <h5 class="modal-title" id="confirmPrioritiesModalLabel">
            確定選科次序
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div v-html="warningMessage"></div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="onConfirm"
            :disabled="isConfirmed || !confirmable"
          >
            確定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap'
import combinations from '@/data/combination'
import { mapState, mapGetters, mapActions } from 'vuex'
import FormattedDatetime from '@/components/FormattedDatetime'
import { deadline } from '@/config.js'

export default {
  components: {
    FormattedDatetime
  },
  data () {
    return {
      deadline,
      warningMessage: `<p>
          是否確定選科次序？一經確定後，同學一概<u><b>不得</b></u>更改選科次序。
        </p>`
    }
  },
  computed: {
    modal () {
      const modalElement = document.getElementById('confirmPrioritiesModal')
      return new Modal(modalElement)
    },
    ...mapState('student', ['priorities', 'isConfirmed']),
    ...mapGetters(['userAlias']),
    confirmable () {
      return this.priorities.length === combinations.length
    }
  },
  methods: {
    ...mapActions('student', ['setIsConfirmed']),
    onConfirm () {
      const { userAlias } = this
      this.setIsConfirmed({ userAlias, isconfirmed: true })
      this.modal.hide()
    },
    onClickConfirmButton () {
      this.modal.show()
    }
  }
}
</script>
