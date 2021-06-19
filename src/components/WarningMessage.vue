<template>
  <div
    v-for="toast in toasts"
    :key="toast.id"
    class="position-fixed top-0 end-0 p-1"
    style="z-index: 5"
  >
    <div
      :ref="toast.name"
      class="toast my-1"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="toast-body text-danger">
        <span><font-awesome-icon icon="exclamation-triangle" />{{ ' ' }}</span>
        <span>{{ toast.message }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import combinations from '@/data/combination'
import { mapState } from 'vuex'
import { Toast } from 'bootstrap'
import _ from 'lodash'

export default {
  created () {
    this.handleWarning = _.debounce(this.handleWarning, 500)
  },
  data () {
    return {
      toasts: [
        {
          name: 'confirmedLiveToast',
          message: '請按「確認」，以確認選科組合次序。'
        },
        {
          name: 'prioritisedLiveToast',
          message: '尚未將所有選科組合排序。'
        },
        {
          name: 'signatureLiveToast',
          message: '家長必須簽署，以確認選科組合次。'
        }
      ]
    }
  },
  watch: {
    isPrioritised () {
      this.clearMessages()
      this.handleWarning()
    },
    isSigned () {
      this.clearMessages()
      this.handleWarning()
    }
  },
  computed: {
    ...mapState('student', ['priorities', 'isSigned', 'isConfirmed']),
    isPrioritised () {
      return this.priorities.length === combinations.length
    },
    prioritisedToast () {
      const { prioritisedLiveToast } = this.$refs
      return new Toast(prioritisedLiveToast)
    },
    signatureToast () {
      const { signatureLiveToast } = this.$refs
      return new Toast(signatureLiveToast)
    },
    confirmedToast () {
      const { confirmedLiveToast } = this.$refs
      return new Toast(confirmedLiveToast)
    }
  },
  methods: {
    handleWarning () {
      const { prioritisedToast, signatureToast, confirmedToast } = this
      if (!this.isPrioritised) {
        prioritisedToast.show()
        return
      }

      if (!this.isSigned) {
        signatureToast.show()
        return
      }

      if (!this.isConfirmed) {
        confirmedToast.show()
      }
    },
    clearMessages () {
      const { prioritisedToast, signatureToast, confirmedToast } = this
      const toasts = [prioritisedToast, signatureToast, confirmedToast]
      toasts.forEach(toast => {
        toast.hide()
      })
    }
  }
}
</script>
