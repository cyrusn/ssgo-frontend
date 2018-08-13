<template>
  <div class="btn-group col-auto">
    <button type="button" class="btn btn-info"
      @click="onDownloadCSV(list, filename, 'csv')">
      下載 CSV
    </button>

    <button type="button" class="btn btn-warning"
      @click="onDownloadJSON(list, filename, 'json')">
      下載 JSON
    </button>
  </div>
</template>

<script>
import Papa from 'papaparse'
import combination from '@/data/combination'
import _ from 'lodash'
import {createDownloadFile, onDownloadJSON} from '@/components/helpers'

export default {
  props: ['list', 'filename'],
  methods: {
    createDownloadFile,
    onDownloadJSON,
    onDownloadCSV (jsonData, filename, extname) {
      // create headers fields
      let fields = _(jsonData[0])
        .keys()
        .pull('priorities')
        .value()

      combination.forEach(comb => {
        fields.push(comb.subjects.join('+'))
      })

      let result = _(jsonData).map(student => {
        return _(combination)
          .map(comb => {
            comb.priorities = student.priorities.indexOf(comb.id)
            return comb
          })
          .keyBy(obj => obj.subjects.join('+'))
          .mapValues('priorities')
          .assign(student)
          .omit('priorities')
          .value()
      }).value()

      let csv = Papa.unparse({
        data: result,
        fields
      })
      this.createDownloadFile(csv, filename, extname)
    }
  }
}
</script>
