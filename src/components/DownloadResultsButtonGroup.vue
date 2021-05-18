<template>
  <div class="btn-group">
    <button
      type="button"
      class="btn btn-info"
      @click="onDownloadCSV(results, 'result', 'csv')"
    >
      下載 CSV
    </button>

    <button
      type="button"
      class="btn btn-warning"
      @click="onDownloadJSON(results, 'result', 'json')"
    >
      下載 JSON
    </button>
  </div>
</template>

<script>
import Papa from 'papaparse'
import _ from 'lodash'
import combination from '@/data/combination'
import {
  createDownloadFile,
  downloadJSON as onDownloadJSON
} from '@/components/helpers'

export default {
  props: ['results'],
  methods: {
    onDownloadJSON,
    onDownloadCSV (jsonData, filename, extname) {
      // create headers fields
      const deepCloneData = _.cloneDeep(jsonData)
      const fields = _(deepCloneData[0])
        .keys()
        .pull('priorities')
        .pull('offers')
        .pull('orders')
        .value()

      combination.forEach(comb => {
        fields.push(comb.subjects.join('+'))
      })

      fields.push('subject1', 'subject2', 'orderInSubject1', 'orderInSubject2')
      const result = _(deepCloneData)
        .map(student => {
          student.timestamp = student.timestamp.Time // change the timestamp format
          student.subject1 = student.offers.subject1
          student.subject2 = student.offers.subject2
          student.orderInSubject1 = student.orders.subject1
          student.orderInSubject2 = student.orders.subject2

          return _(combination)
            .map(comb => {
              comb.priorities = student.priorities.indexOf(comb.id)
              return comb
            })
            .keyBy(obj => obj.subjects.join('+'))
            .mapValues('priorities')
            .assign(student)
            .omit('priorities')
            .omit('offers')
            .omit('orders')
            .value()
        })
        .value()

      const csv = Papa.unparse({
        data: result,
        fields
      })
      createDownloadFile(csv, filename, extname)
    }
  }
}
</script>
