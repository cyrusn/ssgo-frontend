<template>
  <div class="card mb-2" ref="container">
    <div class="card-header"><h5>家長簽署</h5></div>
    <div class="card-body">
      <div v-if="isConfirmed">
        <p>家長已簽署確認次序</p>
        <img :src="signature" alt="" class="img-thumbnail" />
      </div>
      <div v-else>
        <vue-signature-pad
          class="border border-1 bg-light card-img-top mx-auto
        my-3"
          :width="width"
          :height="height"
          ref="signaturePad"
          :options="options"
        />
        <button class="btn text-light btn-primary me-2" @click="clear">
          重新簽署
        </button>
        <confirm-priorities v-if="isSigned && isPrioritised" />
      </div>
    </div>
  </div>
</template>

<script>
import ConfirmPriorities from '@/components/ConfirmPriorities'
import VueSignaturePad from 'vue3-signature-pad'
import { mapState, mapActions, mapMutations } from 'vuex'
import combinations from '@/data/combination'

export default {
  components: {
    ConfirmPriorities,
    VueSignaturePad
  },
  data () {
    return {
      width: 600,
      height: 300,
      options: {
        onEnd: this.save
      }
    }
  },
  mounted () {
    const { isConfirmed, signature, $refs, handleResize } = this
    window.addEventListener('resize', handleResize)
    handleResize()
    if (isConfirmed) {
      $refs.signaturePad.lockSignaturePad()
    }
    $refs.signaturePad.fromDataURL(signature)
  },
  unmounted () {
    window.removeEventListener('resize', this.handleResize)
  },
  watch: {
    signature () {
      const { signature, $refs } = this
      $refs.signaturePad.fromDataURL(signature)
    }
  },
  computed: {
    ...mapState('student', [
      'priorities',
      'signature',
      'isSigned',
      'isConfirmed'
    ]),
    isPrioritised () {
      return this.priorities.length === combinations.length
    }
  },
  methods: {
    ...mapMutations('student', ['updateIsSigned']),
    ...mapActions('student', ['setSignature']),
    handleResize () {
      const { $refs, signature } = this
      const width = $refs.container.clientWidth
      this.width = Math.min(width * 0.9, 600)
      this.height = this.width * 0.5
      this.$refs.signaturePad.resizeCanvas()
      $refs.signaturePad.clearSignature()
      $refs.signaturePad.fromDataURL(signature)
    },
    save () {
      const { setSignature } = this
      const { signaturePad } = this.$refs
      const { isEmpty, data } = signaturePad.saveSignature()
      const isSigned = !isEmpty
      setSignature({ isSigned, data })
    },
    clear () {
      const { setSignature, updateIsSigned } = this
      const { signaturePad } = this.$refs
      signaturePad.clearSignature()
      const data = ''
      updateIsSigned(false)
      setSignature({ isSigned: false, data })
    }
  }
}
</script>
