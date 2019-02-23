<template>
  <div class="alert alert-danger">
    同學必須完成網上{{isMock ? '模擬' : null}}選科。列印選科意向表並交家長簽署，並於{{formatDate(deadline)}}或之前交予班主任。{{isMock ? null: '是次為正式選科，選科回條一經繳交，將不能更改志願。'}}如有疑問，可向{{committeeInCharge}}{{pics[0]}}老師或{{pics[1]}}老師查詢。
    <ul>
      <li>將所有選科組合排好優次</li>
      <li>確定選科意向</li>
      <li>列印選科意向表</li>
      <li>家長簽署</li>
      <li>{{formatDate(deadline)}}或之前交予班主任</li>
    </ul>
  </div>
</template>

<script>
import Formatter from '@/chineseDateFormatter'
import { isMock, committeeInCharge, pics, deadline } from '@/config.js'

export default {
  data () {
    return {
      isMock,
      deadline,
      pics,
      committeeInCharge
    }
  },
  methods: {
    formatDate (date) {
      return new Formatter(date)['simple']
    }
  }
}
</script>
