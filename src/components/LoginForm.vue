<template>
  <div>
    <h1 class="text-center">{{ isMock ? '高中模擬選科系統': '高中選科系統'}}</h1>
    <hr>
    <form class="col-lg-8 mx-auto justify-content-center" @keyup.enter='onLogin'>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">登入編號</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" v-model='userAlias' autofocus>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">密碼</label>
        <div class="col-sm-10">
          <input type="password" class="form-control" v-model='password'>
        </div>
      </div>
      <div class="form-group row justify-content-end">
        <div class="col-sm-10">
          <button type='button' class="btn btn-primary" @click='onLogin'>
            <i class="fas fa-sign-in-alt"></i> 登入
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import _ from 'lodash'
import {mapState, mapActions, mapGetters} from 'vuex'
import {isMock} from '@/config.js'

export default {
  mounted () {
    this.goto()
  },
  data () {
    return {
      userAlias: '',
      password: '',
      isMock
    }
  },
  watch: {
    role () {
      this.goto()
    }
  },
  computed: {
    ...mapGetters(['role'])
  },
  methods: {
    ...mapState(['router']),
    ...mapActions(['login']),
    onLogin () {
      const {userAlias, password, login} = this
      if (userAlias && password) {
        login({userAlias, password})
      }
    },
    goto () {
      const {role, $router} = this
      switch (true) {
        case role === 'STUDENT':
          $router.push({'name': 'selection'})
          break
        case _.includes(['TEACHER', 'ADMIN'], role):
          $router.push({'name': 'list'})
          break
        default:
          break
      }
    }
  }
}
</script>
