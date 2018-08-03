<template>
  <div class="modal fade" id="logoutAlert" tabindex="-1" role="dialog" aria-labelledby="logoutAlertLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="logoutAlertLabel">登出提示</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>{{modalContent}}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
        <button type="button" class="btn btn-primary" @click="onRefreshJWT()">確定</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
/* global $ */
import {mapState, mapGetters, mapActions} from 'vuex'
import {warningTime} from '@/config'

export default {
  data () {
    return {
      logoutTimers: [],
      refresh: false
    }
  },
  watch: {
    jwt () {
      this.showModalWarning()
    }
  },
  computed: {
    ...mapState(['jwt']),
    ...mapGetters(['expireAt']),
    modalContent () {
      const {expireAt} = this
      return `系統將於${new Date(expireAt).toLocaleTimeString()}登出，請按確定取消登出。`
    }
  },
  methods: {
    ...mapActions(['refreshJWT']),
    getCurrentDateTime () {
      return Date.now()
    },
    showModalWarning () {
      const {logoutTimers, expireAt, logout, getCurrentDateTime} = this
      const countdown = expireAt - getCurrentDateTime()

      logoutTimers.forEach(clearTimeout)

      setTimeout(function () {
        $('#logoutAlert').modal('show')
      }, countdown - warningTime * 1000)

      logoutTimers.push(logout(countdown))
    },
    onRefreshJWT () {
      this.refreshJWT()
      $('#logoutAlert').modal('hide')
    },
    logout (countdown) {
      return setTimeout(function () {
        window.location.reload(true)
      }, countdown)
    }
  }
}
</script>
