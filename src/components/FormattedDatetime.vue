<template>
  <span>{{formattedDatetime}}<span>
</template>

<script>
import moment from 'moment'

moment.locale('zh-hk', {
  longDateFormat: {
    LLL: 'YYYY年M月D日Ah時m分',
    LLLL: 'YYYY年M月D日Ah時m分s秒'
  },
  meridiem: function (hour, minute, isLower) {
    const hm = hour * 100 + minute
    if (hm < 600) {
      return '凌晨'
    } else if (hm < 900) {
      return '早上'
    } else if (hm < 1130) {
      return '上午'
    } else if (hm === 1200) {
      return '正午'
    } else if (hm < 1230) {
      return '中午'
    } else if (hm < 1800) {
      return '下午'
    } else {
      return '晚上'
    }
  }
})

export default {
  props: ['datetime', 'format'],
  computed: {
    formattedDatetime () {
      const {datetime, format} = this
      return moment(datetime).format(format)
    }
  }
}
</script>
