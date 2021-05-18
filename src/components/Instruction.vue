<template>
  <div class="alert alert-danger">
    同學必須完成網上{{
      isMock ? '模擬' : null
    }}選科。列印選科意向表並交家長簽署，並於<formatted-datetime
      :datetime="deadline"
      format="l"
    />或之前交予班主任。{{
      isMock ? null : '是次為正式選科，選科意願一經繳交，將不能更改。'
    }}如有疑問，可向{{ committeeInCharge }}{{ pics[0] }}老師或{{
      pics[1]
    }}老師查詢。
    <ul class="mt-2">
      <li>排好所有選科組合優次</li>
      <li>確定選科意向</li>
      <li>列印選科意向表</li>
      <li>家長簽署</li>
      <li>
        <formatted-datetime :datetime="deadline" format="l" />或之前交予班主任
      </li>
    </ul>
  </div>
</template>

<script>
import { isMock, committeeInCharge, pics, deadline } from '@/config.js'
import FormattedDatetime from '@/components/FormattedDatetime'

export default {
  components: { FormattedDatetime },
  data () {
    return {
      isMock,
      deadline,
      pics,
      committeeInCharge
    }
  }
}
</script>
