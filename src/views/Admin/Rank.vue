<template>
  <div class="my-4">
    <rank-example />
    <div v-if='successUpdate' class="fade show alert alert-primary" id='successUpdate'>
      上載成功
    </div>
    <div v-else-if="errorMessage" class="alert alert-danger" v-html="errorMessage">
    </div>
    <div v-else class="alert alert-success">
      數據正確，可以上載。
    </div>
    <form>
      <div class="form-group">
        <textarea rows=5 class="form-control" v-model='csvData'></textarea>
      </div>
      <button class="btn btn-info mr-2"
      data-toggle="collapse" data-target="#exampleRank"
      >顯示例子</button>
      <button
        type="button"
        class="btn
        btn-primary"
        @click="update"
        :disabled='errorMessage !== ""'
        >
        上載
      </button>
    </form>
  </div>
</template>

<script>
import Papa from 'papaparse'
import _ from 'lodash'
import {mapActions} from 'vuex'

import RankExample from '@/components/RankExample'

export default {
  components: {
    RankExample
  },
  data () {
    return {
      csvData: '',
      successUpdate: false
    }
  },
  computed: {
    jsonData () {
      const {csvData} = this
      if (csvData) {
        return Papa.parse(csvData, {
          header: true,
          encoding: 'UTF-8'
        })
      }
    },
    errorMessage () {
      const {jsonData} = this
      if (!jsonData) return '請複製試算表中的名次，並貼上到以下文字方框中，完成後並按上載。<br>注意：試算表中的標題列必須為 <code>userAlias</code> 及 <code>rank</code>。'

      if (jsonData.errors.length !== 0) {
        return `<li>${_(jsonData.errors).map(e => e.message).uniq().value().join('</li><li>')}</li>`
      }

      if (_.intersection(jsonData.meta.fields, ['userAlias', 'rank']).length !== 2) {
        return '格式不正確。請確定標題分別為 <code>userAlias</code> 及 <code>rank</code>'
      }

      if (_.includes(jsonData.data.map(s => parseInt(s.rank)), NaN)) {
        return '<code>rank</code> 必須為整數'
      }
    }
  },
  methods: {
    ...mapActions('students', ['updateRanks']),
    update () {
      const vm = this
      const {jsonData, updateRanks} = this

      if (jsonData.errors.length === 0) {
        const postJSON = jsonData.data.map(o => {
          const {userAlias, rank} = o
          return {userAlias, rank: parseInt(rank)}
        })
        updateRanks(postJSON)
        this.successUpdate = true
        setTimeout(function () {
          vm.successUpdate = false
          vm.csvData = ''
        }, 3000)
      }
    }
  }
}

</script>
